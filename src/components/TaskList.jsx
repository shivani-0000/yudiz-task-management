import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from "../redux/tasksSlice";
import "../styles/TaskList.css";

const TaskList = ({ tasks }) => {
  const dispatch = useDispatch();
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState("");
  const [newStatus, setNewStatus] = useState("todo");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 100); 
  }, []);

  const toggleComplete = (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    dispatch(updateTask(updatedTask));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(id));
    }
  };

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setNewTitle(task.title);
    setNewPriority(task.priority);
    setNewStatus(task.status || "todo");
  };

  const handleSave = () => {
    if (newTitle.trim()) {
      if (window.confirm("Save changes?")) {
        dispatch(
          updateTask({
            id: editingTaskId,
            title: newTitle,
            priority: newPriority || "Medium",
            status: newStatus,
          })
        );
        setEditingTaskId(null);
      }
    }
  };

  return (
    <div>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
      />

      {/* Display loading spinner while loading */}
      {loading ? (
        <div className="spinner">
          <div className="loading"></div>
        </div>
      ) : (
        <div className="task-list">
          {tasks.length === 0 ? (
            <div className="no-tasks-message">
              No tasks match the filter criteria.
            </div>
          ) : (
            tasks
              .filter((task) => task.title.toLowerCase().includes(searchQuery))
              .map((task) => (
                <div
                  key={task.id}
                  className={`task-card ${
                    task.completed ? "completed" : "incomplete"
                  }`}
                >
                  {editingTaskId === task.id ? (
                    <div>
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                      />
                      <select
                        value={newPriority}
                        onChange={(e) => setNewPriority(e.target.value)}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                      >
                        <option value="todo">Todo</option>
                        <option value="in progress">In Progress</option>
                        <option value="done">Done</option>
                      </select>
                      <button onClick={handleSave}>Save</button>
                      <button onClick={() => setEditingTaskId(null)}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3>{task.title}</h3>
                      <p>Priority: {task.priority || "Medium"}</p>
                      <p>Status: {task.status || "Todo"}</p>
                      <button onClick={() => toggleComplete(task)}>
                        {task.completed ? "Mark Incomplete" : "Mark Complete"}
                      </button>
                      <button onClick={() => startEditing(task)}>Edit</button>
                      <button onClick={() => handleDelete(task.id)}>
                        Delete
                      </button>
                    </>
                  )}
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      priority: PropTypes.string,
      status: PropTypes.string,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default TaskList;
