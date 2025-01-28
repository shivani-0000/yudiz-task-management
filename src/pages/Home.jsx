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
  const [filter, setFilter] = useState({ status: "all", priority: "all" });

  useEffect(() => {
    dispatch(fetchTasksAsync());
  }, [dispatch]);

  const filteredTasks = tasks
    .map((task) => ({
      ...task,
      completed: task.completed ?? false, // Ensure that completed is always set
    }))
    .filter((task) => {
      const taskPriority = task.priority || "Medium";

      // Filter by status (Complete/Incomplete)
      const statusMatch =
        filter.status === "all" ||
        (filter.status === "complete" && task.completed) ||
        (filter.status === "incomplete" && !task.completed);

      // Filter by priority (Low/Medium/High)
      const priorityMatch =
        filter.priority === "all" || taskPriority === filter.priority;

      return statusMatch && priorityMatch;
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
