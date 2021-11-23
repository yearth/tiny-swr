import { useState, useEffect, useContext } from "react";
import { useFetchConfigContext } from "./context";
import { prefixUrl } from "../../shared";

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

export const useFetch = (url, fetcher) => {
  const [state, setState] = useState(undefined);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const config = useContext(useFetchConfigContext);
  const _fetcher = typeof fetcher === "function" ? fetcher : config.fetcher;

  const key = getKeyArgs(url);

  const fetchData = async () => {
    setLoading(true);

    try {
      const data = await _fetcher(`${prefixUrl}${url}`);
      setState(data.result);
      setError(false);
    } catch (err) {
      setError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    console.log("entry", key);
    fetchData();
  }, [key]);

  return [state, error, loading];
};

const useFetchConfig = useFetchConfigContext.Provider;
export { useFetchConfig };
