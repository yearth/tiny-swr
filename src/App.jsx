import { useState, useEffect } from "react";
import { prefixUrl } from "./shared";

function App() {
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const resp = await fetch(`${prefixUrl}/user`);
        const data = await resp.json();
        setUser(data.result);
      } catch (err) {
        setError(err);
      }

      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      {loading && <span>loading...</span>}
      {error && <span>something went wrong</span>}
      {!loading && !error && <span>welcome {user.name}!</span>}
    </div>
  );
}

export default App;
