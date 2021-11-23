import { useState, useEffect } from "react";
import { prefixUrl } from "../shared";

export const useFetch = url => {
  const [state, setState] = useState(undefined);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const resp = await fetch(`${prefixUrl}${url}`);
        const data = await resp.json();
        setState(data.result);
      } catch (err) {
        setError(true);
      }

      setLoading(false);
    };
    fetchData();
  }, []);

  return [state, error, loading];
};
