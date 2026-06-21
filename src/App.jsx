import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState(() => {
    return JSON.parse(localStorage.getItem("todo")) || [
      "Learn React",
      "Build Project",
    ];
  });

  const [inProgress, setInProgress] = useState(() => {
    return JSON.parse(localStorage.getItem("inProgress")) || [];
  });

  const [done, setDone] = useState(() => {
    return JSON.parse(localStorage.getItem("done")) || [];
  });

  const [newTask, setNewTask] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const addTask = () => {
    if (newTask.trim() === "") return;

    setTodo([...todo, newTask]);
    setNewTask("");
  };

  const moveToProgress = (task) => {
    setTodo(todo.filter((t) => t !== task));
    setInProgress([...inProgress, task]);
  };

  const moveToDone = (task) => {
    setInProgress(inProgress.filter((t) => t !== task));
    setDone([...done, task]);
  };

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  useEffect(() => {
    localStorage.setItem(
      "inProgress",
      JSON.stringify(inProgress)
    );
  }, [inProgress]);

  useEffect(() => {
    localStorage.setItem("done", JSON.stringify(done));
  }, [done]);

  return (
    <div className={darkMode ? "container dark" : "container"}>
      <h1>📋 Project Management Tool</h1>

      <button
        className="dark-btn"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />

        <button onClick={addTask}>
          Add Task
        </button>
      </div>

      <div className="board">
        <div className="column">
          <h2>To Do</h2>

          {todo.map((task, index) => (
            <div key={index} className="task">
              <span>{task}</span>

              <button
                onClick={() =>
                  moveToProgress(task)
                }
              >
                Move →
              </button>
            </div>
          ))}
        </div>

        <div className="column">
          <h2>In Progress</h2>

          {inProgress.map((task, index) => (
            <div key={index} className="task">
              <span>{task}</span>

              <button
                onClick={() =>
                  moveToDone(task)
                }
              >
                Done →
              </button>
            </div>
          ))}
        </div>

        <div className="column">
          <h2>Done</h2>

          {done.map((task, index) => (
            <div key={index} className="task">
              {task}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      Hello World
    </div>
  );
}

export default App;
