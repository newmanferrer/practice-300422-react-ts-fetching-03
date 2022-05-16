import axios from 'axios';
import { useState, useEffect } from 'react';

interface AxiosDataCancelProps {
  url: string;
}

export const AxiosDataCancel = ({ url }: AxiosDataCancelProps) => {
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
