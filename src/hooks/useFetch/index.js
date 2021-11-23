import { useState, useEffect, useContext } from "react";
import { useFetchConfigContext } from "./context";
import { prefixUrl } from "../../shared";

export const useFetch = (url, fetcher) => {
  const [state, setState] = useState(undefined);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const config = useContext(useFetchConfigContext);
  const _fetcher = typeof fetcher === "function" ? fetcher : config.fetcher;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const data = await _fetcher(`${prefixUrl}${url}`);
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

const useFetchConfig = useFetchConfigContext.Provider;
export { useFetchConfig };
