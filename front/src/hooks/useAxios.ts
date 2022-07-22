import axios, { Method } from 'axios';
import { useEffect, useRef, useState } from 'react';

const MAIN_API_DOMAIN = '//localhost:8080';

export const useAxios = <D = never[]>(
  url: string,
  method: Method,
  payload: Record<string, any>,
) => {
  const [data, setData] = useState<D | null>(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);
  const controllerRef = useRef(new AbortController());

  const cancel = () => {
    controllerRef.current.abort();
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.request({
          data: payload,
          signal: controllerRef.current.signal,
          method,
          url: `${MAIN_API_DOMAIN}/${url}`,
        });
        setData(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  return { cancel, data, error, loaded };
};
