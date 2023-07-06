import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

interface Task {
  id: number;
  title: string;
  dueDate: string; // dueDate is now a string
  category: string;
}

const App = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = window.localStorage.getItem("tasks");
    if (storedTasks) {
      return JSON.parse(storedTasks);
    }
    return [];
  });

  useEffect(() => {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (task: Omit<Task, "id">) => {
    setTasks([...tasks, { id: Date.now(), ...task }]);
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <TaskForm onSubmit={handleAddTask} />
      <TaskList tasks={tasks} onDelete={handleDeleteTask} />
    </div>
  );
};

export default App;
