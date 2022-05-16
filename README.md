# PRACTICE: REACT WHIT TYPESCRIPT FETCHING OF DATA 03 - AXIOS

## Project description

Practice react with typescript using axios for requests to the JSON Placeholder and JSON Server.
Axios is a promise-based HTTP Client for node.js and the browser. It is a simple project where we will implement a CRUD, the most important thing is to practice the tools and options available when using axios.

## Used technology

- Html 5
- CSS
- JavaScript
- TypeScript
- React
- Axios
- Stiled Components
- ESLint
- Prettier
- Vite

## Resources used

JSON Server: https://github.com/typicode/json-server

API JSON Placeholder: https://jsonplaceholder.typicode.com/

API REQRES: https://reqres.in

## Developers: Requirements

- Nodejs
- Web Browser
- Code editor

## Developers: Installtion

1. Clone the repository: https://github.com/newmanferrer/practice-300422-react-ts-fetching-03.git
2. Another option is to download the repository using ZIP format.
3. Install the dependencies using the command "yarn add", from the terminal console.
4. From the terminal console, execute the “yarn dev” command, to run the development server.
5. From the terminal console, execute the “yarn run fake-api” command, to run the json server.

## Important Notes, Suggestions and Recommendations

1. If we need to handle very basic states using useState would suffice, as in most of our examples.
2. We could use useReducer hook instead of useState: It will allow us to centralize all state modification, making them easier to used, track and reason about. This in case of having to handle several state variables such as loading, error, data, etc. Recommended reading: https://www.sumologic.com/blog/react-hook-typescript.
3. For more complex state management it would be advisable to use solutions with Redux to mention some.

# AXIOS

## Axios Features

- Make XMLHttpRequests from the browser
- Make http requests from node.js
- Supports the Promise API
- Intercept request and response
- Transform request and response data
- Cancel requests
- Automatic transforms for JSON data
- Client side support for protecting against XSRF

## Axios HTTP request methods

- Get: axios.get(url[, config])
- Post: axios.post(url[, data[, config]])
- Put: axios.put(url[, data[, config]])
- Patch: axios.patch(url[, data[, config]])
- Delete: axios.delete(url[, config])
- Request: axios.request(config)
- Head: axios.head(url[, config])
- Options: axios.options(url[, config])

# Examples

## GET Request

### In App

```js
useEffect(() => {
  setError(null);
  setIsLoading(true);

  axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then(response => setUsers(response.data))
    .catch(error => setError(error.message))
    .finally(() => setIsLoading(false));
}, []);
```

## GET Request with Async/Await and Try/Catch

### In App

```js
const getAllusers = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    setUsers(response.data);
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  setError(null);
  setIsLoading(true);
  getAllusers();
}, []);
```

## GET multiple concurrent requests

```js
const getAllUsers = async () => {
  return axios.get('https://jsonplaceholder.typicode.com/users');
};

const getAllPosts = async () => {
  return axios.get('https://jsonplaceholder.typicode.com/posts');
};

useEffect(() => {
  setIsLoading(true);
  setError(null);

  Promise.all([getAllUsers(), getAllPosts()])
    .then(response => {
      setUsers(response[0].data);
      setPosts(response[1].data);
    })
    .catch(error => setError(error.message))
    .finally(() => setIsLoading(false));
}, []);
```

## POST Request

```js
const createUser = () => {
  axios
    .post('http://localhost:5000/users', {
      name: 'Tony Stark',
      username: 'starkt',
      email: 'tony.stark@avengers.com'
    })
    .then(response => console.log(response))
    .catch(error => console.error(error));
};
```

## POST Request with Async/Await and Try/Catch

```js
const createUser = async () => {
  try {
    const response = await axios.post('http://localhost:5000/users', {
      name: 'Tony Stark',
      username: 'starkt',
      email: 'tony.stark@avengers.com'
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
```

## axios(config)

```js
useEffect(() => {
  setIsLoading(true);
  setError(null);

  axios({
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/users',
    responseType: 'json'
  })
    .then(response => setUsers(response.data))
    .catch(error => setError(error.message))
    .finally(() => setIsLoading(false));
}, []);
```

```js
const createUser = () => {
  axios({
    method: 'post',
    url: 'http://localhost:5000/users',
    data: {
      name: 'Papa Noel',
      username: 'papanoel',
      email: 'papanoel@elpolo.com'
    }
  })
    .then(response => console.log(response))
    .catch(error => console.error(error));
};
```

## The Axios Instance (Creating an instance)

### In axios file. For example src/utilities/axios/index.ts

```js
import axios from 'axios';

const baseURL = 'https://jsonplaceholder.typicode.com';
let headers = { 'Content-Type': 'application/json' };

export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: headers,
  timeout: 1000
});
```

### In App

```js
import { axiosInstance } from './utilities';

useEffect(() => {
  setIsLoading(true);
  setError(null);

  axiosInstance
    .get('/users')
    .then(response => setPosts(response.data))
    .catch(error => setError(error.message))
    .finally(() => setIsLoading(false));
}, []);
```

## Handling Errors

Errors are handled with the catch, either chained to the promise or through the use of try/catch.

### if error.response

The request was made and the server responded with a status code that falls out of the range of 2xx. For example the baseURL is fine but endpoint is bad. Code: "ERR_BAD_REQUEST". (error.response.status: 404 / error.request.status: 404).

https://jsonplaceholder.typicode.com/users :heavy_check_mark:

https://jsonplaceholder.typicode.com/sresu :x:

### if error.request

The request was made but no response was received. For example the baseURL is bad, server is off or services out. Code: "ERR_NETWORK". (error.request.status: 0 / error.response.status: 0)

https://jsonplaceholder.typicode.com/users :heavy_check_mark:

https://redlohecalpnosj.typicode.com/users :x:

### Note

Network Errors take priority over Bad Request Errors, in case both occur.

```js
useEffect(() => {
  setIsLoading(true);
  setError(null);

  axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then(response => setUsers(response.data))
    .catch(error => {
      console.error('error: ', error);
      console.error('error.code: ', error.code);
      console.error('error.name: ', error.name);
      console.error('error.message: ', error.message);
      console.error('error.request: ', error.request);
      console.error('error.response: ', error.response);
      console.error('error.config: ', error.config);

      if (error.response) {
        console.error('error.response.data: ', error.response.data);
        console.error('error.response.status: ', error.response.status);
        console.error('error.response.statusText: ', error.response.statusText);
        console.error('error.response.headers: ', error.response.headers);
        console.error('error.response.request: ', error.response.request);
        console.error('error.response.config: ', error.response.config);
      }

      setError(error.message);
    })
    .finally(() => setIsLoading(false));
}, []);
```

## Cancellation (AbortController)

### Basic Example

```js
const controller = new AbortController();
const signal = controller.signal;

const getAllUsers = () => {
  axios
    .get('https://jsonplaceholder.typicode.com/users', { signal })
    .then(response => setUsers(response.data))
    .catch(error => setError(error.message))
    .finally(() => setIsLoading(false));
};

useEffect(() => {
  const timeoutId = setTimeout(() => {
    getAllUsers();
  }, 2000);

  return () => {
    clearTimeout(timeoutId);
  };
}, []);

const cancelRequest = () => controller.abort();
```

### Component Example

```js
import { useState, useEffect } from 'react';
import axios from 'axios';

export const App = () => {
  interface AxiosDataCancelProps {
    url: string;
  }

  const AxiosDataCancel = ({ url }: AxiosDataCancelProps) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      let controller = new AbortController();
      const { signal } = controller;

      const loadData = async () => {
        try {
          const response = await axios.get(url, { signal });
          setData(response.data);
        } catch (error: any) {
          console.error(error.message);
          if (error.name === 'AxiosError') setError(error.message);
        }
      };
      loadData();
      return () => controller.abort();
    }, [url]);

    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (!data) return <div style={{ color: 'green' }}>Loading data from {url}</div>;
    return <div style={{ color: 'green' }}>{JSON.stringify(data, ['id', 'name'], 2)}</div>;
  };

  return (
    <>
      <h1>Users</h1>
      <AxiosDataCancel url='https://jsonplaceholder.typicode.com/users/4' />
    </>
  );
};
```

### Component Example (using fetch api to compare)

```js
import { useState, useEffect } from 'react';

export const App = () => {
  interface FetchDataProps {
    url: string;
  }

  const FetchDataCancel = ({ url }: FetchDataProps) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      let controller = new AbortController();
      const { signal } = controller;

      const loadData = async () => {
        try {
          const response = await fetch(url, { signal });
          if (!response.ok) throw response;
          const data = await response.json();
          setData(data);
        } catch (error: any) {
          if (error.name === 'TypeError') {
            setError(error.message);
          } else if (error.status === 404) {
            const errorMessage = `Error Code: ${error.status} ${error.statusText || 'Not Found'} ${error.url}`;
            setError(errorMessage);
          }
        }
      };
      loadData();
      return () => controller.abort();
    }, [url]);

    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (!data) return <div style={{ color: 'green' }}>Loading data from {url}</div>;
    return <div style={{ color: 'green' }}>{JSON.stringify(data, ['id', 'name'], 2)}</div>;
  };

  return (
    <>
      <h1>Users</h1>
      <FetchDataCancel url='https://jsonplaceholder.typicode.com/users/4' />
    </>
  );
};
```

## Custom Hook Fetch Data Example

### Basic

```js
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchData = (url: string) => {
  const [data, setData] = useState < any > null;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(url)
      .then(response => {
        setData(response.data);
      })
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [url]);

  return { data, isLoading, error };
};
```

### Basic with useReducer (Api Endpoint used => https://reqres.in/api/users?per_page=6&delay=3)

```js
import { useEffect, useReducer } from 'react';
import axios from 'axios';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UserList {
  data: User[];
}

interface State {
  isLoading: boolean;
  data: User[] | null;
  error: string | null;
}

interface initialState {
  isLoading: boolean;
  data: null;
  error: null;
}

const enum ACTIONS_TYPES {
  API_REQUEST = '@USEFECTC/API_REQUEST',
  FETCH_DATA = '@USEFECTC/FETCH_DATA',
  ERROR = '@USEFETCH/ERROR'
}

type Action =
  | { type: ACTIONS_TYPES.API_REQUEST }
  | { type: ACTIONS_TYPES.FETCH_DATA; payload: UserList }
  | { type: ACTIONS_TYPES.ERROR; payload: string };

const initialState: initialState = {
  isLoading: false,
  data: null,
  error: null
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTIONS_TYPES.API_REQUEST:
      return { ...state, isLoading: true, data: null, error: null };
    case ACTIONS_TYPES.FETCH_DATA:
      return { ...state, isLoading: false, data: action.payload.data, error: null };
    case ACTIONS_TYPES.ERROR:
      return { ...state, isLoading: false, data: null, error: action.payload };
    default:
      return state;
  }
};

export const useFetchData = (url: string) => {
  // const [{ isLoading, data, error }, dispatch] = useReducer(reducer, initialState);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let cancel = false;
    const controller = new AbortController();
    const { signal } = controller;

    dispatch({ type: ACTIONS_TYPES.API_REQUEST });
    axios
      .get(url, { signal })
      .then(response => {
        if (!cancel) dispatch({ type: ACTIONS_TYPES.FETCH_DATA, payload: response.data });
      })
      .catch(error => {
        if (error.name === 'CanceledError') console.warn('Error: request canceled for the user (AbortController)');
        else if (error.name === 'AxiosError') dispatch({ type: ACTIONS_TYPES.ERROR, payload: error.message });
      });

    return () => {
      cancel = true;
      controller.abort();
    };
  }, [url]);

  return state;
};
```

---

## Author: Newman Ferrer

newmanferrer@gmail.com

:sun_with_face: Maracaibo - Venezuela :venezuela:

Practice date: 19/04/2022
