import { useFetch } from "./hooks/useFetch";

function App() {
  const [user = {}, error, loading] = useFetch("/user");

  return (
    <div>
      {loading && <span>loading...</span>}
      {error && <span>something went wrong</span>}
      {!loading && !error && <span>welcome {user.name}!</span>}
    </div>
  );
}

export default App;
