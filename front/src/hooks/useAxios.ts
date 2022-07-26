import axios, { Method } from 'axios';
import { useEffect, useRef, useState } from 'react';

import { API_DOMAIN } from '../constants';

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
          url: `${API_DOMAIN}/${url}`,
        });

        setData(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoaded(true);
      }
    })();
  }, [url, opts?.skip]);

  return { cancel, data, error, loaded, setLoaded };
};
