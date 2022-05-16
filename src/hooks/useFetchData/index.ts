import { useEffect, useReducer } from 'react';
import axios from 'axios';

interface State {
  isLoading: boolean;
  data: any;
  error: string;
}

interface initialState {
  isLoading: boolean;
  data: any;
  error: string;
}

const enum ACTIONS_TYPES {
  API_REQUEST = '@USEFECTC/API_REQUEST',
  FETCH_DATA = '@USEFECTC/FETCH_DATA',
  ERROR = '@USEFETCH/ERROR'
}

type Action =
  | { type: ACTIONS_TYPES.API_REQUEST }
  | { type: ACTIONS_TYPES.FETCH_DATA; payload: any }
  | { type: ACTIONS_TYPES.ERROR; payload: string };

const initialState: initialState = {
  isLoading: false,
  data: [],
  error: ''
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTIONS_TYPES.API_REQUEST:
      return { ...state, isLoading: true };
    case ACTIONS_TYPES.FETCH_DATA:
      return { ...state, isLoading: false, data: action.payload, error: '' };
    case ACTIONS_TYPES.ERROR:
      return { ...state, isLoading: false, data: [], error: action.payload };
    default:
      return state;
  }
};

export const useFetchData = (url: string) => {
  const [{ isLoading, data, error }, dispatch] = useReducer(reducer, initialState);

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
        if (error.name === 'CanceledError')
          console.warn('Error: request canceled for the user (AbortController)');
        else if (error.name === 'AxiosError')
          dispatch({ type: ACTIONS_TYPES.ERROR, payload: error.message });
      });

    return () => {
      cancel = true;
      controller.abort();
    };
  }, [url]);

  return { isLoading, data, error };
};
