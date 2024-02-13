import { useState } from "react";
import VirtualizedList from "./components/todoList";

function App() {
  let [userId, setUserId] = useState(null);
  return (
    <div style={{}}>
      <header style={style.header}>Todos</header>
      <div style={style.search}>
        <input
          type="search"
          onChange={(e) => {
            setUserId(e.target.value);
          }}
          placeholder="Enter your userId"
        />
      </div>
      <div style={style.todoList}>

      <VirtualizedList userId={ userId} />
      </div>
    </div>
  );
}

const style = {
  header: {
    backgroundColor: "#000000",
    textAlign: "center",
    color: "#FFFFFF",
    padding: "30px 0",
    fontWeight: "bold",
    fontSize:"24px"
  },
  search: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "50px 10px",
  },
  todoList: {
    padding:"0 50px"
  }
};

export default App;
