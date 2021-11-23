import { useFetch } from "./hooks/useFetch";

function App() {
  const [user] = useFetch("/user");
  const [articles] = useFetch(() => `/articles/${user?.userId}`);

  return (
    <div>
      {<span>welcome {user?.name}!</span>}
      {articles?.map((v, i) => (
        <div key={i}>{v.title}</div>
      ))}
    </div>
  );
}

export default App;
