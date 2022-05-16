import { useState, useEffect } from 'react';

interface FetchDataProps {
  url: string;
}

export const FetchDataCancel = ({ url }: FetchDataProps) => {
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
