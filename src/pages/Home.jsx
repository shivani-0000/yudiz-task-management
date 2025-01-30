import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksAsync } from "../redux/tasksSlice";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import FilterBar from "../components/FilterBar";
import "../styles/Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [filter, setFilter] = useState({
    completion: "all",
    status: "all",
    priority: "all",
  });

  useEffect(() => {
    dispatch(fetchTasksAsync());
  }, [dispatch]);

  const filteredTasks = tasks
    .map((task) => ({
      ...task,
      completed: task.completed ?? false,
    }))
    .filter((task) => {
      // Filter by completion (Complete/Incomplete)
      const completionMatch =
        filter.completion === "all" ||
        (filter.completion === "complete" && task.completed) ||
        (filter.completion === "incomplete" && !task.completed);

      // Filter by status (Todo/In Progress/Done)
      const statusMatch =
        filter.status === "all" || task.status === filter.status;

      // Filter by priority (Low/Medium/High)
      const priorityMatch =
        filter.priority === "all" || task.priority === filter.priority;

      return completionMatch && statusMatch && priorityMatch;
    });

  return (
    <div className="home">
      <TaskForm />
      <FilterBar setFilter={setFilter} />
      <TaskList tasks={filteredTasks} />
    </div>
  );
};

export default Home;
