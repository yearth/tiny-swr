import { useState, useEffect, useContext, useCallback } from "react";
import { useFetchConfigContext } from "./context";
import { prefixUrl } from "../../shared";
import { unstable_batchedUpdates } from "react-dom";

const getKeyArgs = key => {
  let _key;

  if (typeof key === "function") {
    try {
      _key = key();
    } catch (error) {
      _key = "";
    }
  } else {
    _key = String(key || "");
  }

  return _key;
};

export const useFetch = (url, fetcher, options = {}) => {
  const [state, setState] = useState(undefined);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const config = Object.assign({}, useContext(useFetchConfigContext), options);
  const _fetcher = typeof fetcher === "function" ? fetcher : config.fetcher;

  const key = getKeyArgs(url);

  const fetchData = useCallback(async () => {
    if (!key) return false;
    setLoading(true);

    try {
      const data = await _fetcher(`${prefixUrl}${key}`);
      unstable_batchedUpdates(() => {
        setState(data.result);
        setError(false);
        setIsLoading(false);
      });
    } catch (error) {
      unstable_batchedUpdates(() => {
        setError(true);
        setLoading(false);
      });
    }

    return true;
  }, [key]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [state, error, loading];
};

const useFetchConfig = useFetchConfigContext.Provider;
export { useFetchConfig };
