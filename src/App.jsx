import { useFetch } from "./hooks/useFetch";
import { customFetch } from "./shared";

function App() {
  const [user = {}, error, loading] = useFetch("/user", customFetch);

  return (
    <div>
      {loading && <span>loading...</span>}
      {error && <span>something went wrong</span>}
      {!loading && !error && <span>welcome {user.name}!</span>}
    </div>
  );
}

export default App;
