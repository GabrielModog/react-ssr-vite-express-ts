import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadTodos() {
    try {
      setLoading(true);
      const data = await fetch("http://localhost:5173/api/todos");
      const json = await data.json();
      console.log(json);
      setTodos(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Express</h1>
      {loading && (
        <div>
          <p>Loading...</p>
        </div>
      )}
      {!loading && (
        <div className="card-list">
          {todos.length > 0 &&
            todos.map((item: any) => (
              <div key={item.id} className="card">
                <div className="card__content">
                  <h3>{item.title}</h3>
                </div>
                <div className="card__status">
                  <p>{item.completed ? "Completed" : "Unfinished"}</p>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
}

export default App;
