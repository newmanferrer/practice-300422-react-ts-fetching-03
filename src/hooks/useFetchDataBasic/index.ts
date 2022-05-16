import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchDataBasic = (url: string) => {
  const [data, setData] = useState<any>(null);
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
