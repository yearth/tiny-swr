import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { useFetchConfig as UseFetchConfig } from "./hooks/useFetch";
import { customFetch } from "./shared";

ReactDOM.render(
  <UseFetchConfig value={{ fetcher: customFetch }}>
    <App />
  </UseFetchConfig>,
  document.getElementById("root")
);
