import axios, { Method } from 'axios';
import { useEffect, useRef, useState } from 'react';

const MAIN_API_DOMAIN = '//localhost:8080';

export const useAxios = <D = never[]>(
  url: string,
  method: Method,
  opts?: {
    payload?: Record<string, any>;
    skip?: boolean;
  },
) => {
  const [data, setData] = useState<D | null>(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);
  const controllerRef = useRef(new AbortController());

  const cancel = () => {
    controllerRef.current.abort();
  };

  useEffect(() => {
    if (opts?.skip) {
      return;
    }

    (async () => {
      try {
        const response = await axios.request({
          ...(method !== 'GET'
            ? { ...(opts?.payload && { data: opts.payload }) }
            : { ...(opts?.payload && { params: new URLSearchParams(opts.payload) }) }),
          signal: controllerRef.current.signal,
          method,
          url: `${MAIN_API_DOMAIN}/${url}`,
        });

        // Fake delay
        setTimeout(() => {
          setData(response.data);
        }, 250);
      } catch (error: any) {
        setError(error.message);
      } finally {
        // Fake delay
        setTimeout(() => {
          setLoaded(true);
        }, 250);
      }
    })();
  }, [url, opts?.skip]);

  return { cancel, data, error, loaded, setLoaded };
};
