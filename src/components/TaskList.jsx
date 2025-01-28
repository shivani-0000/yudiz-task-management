import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { updateTask, deleteTask } from "../redux/tasksSlice";
import "../styles/TaskList.css";

const TaskList = ({ tasks }) => {
  const dispatch = useDispatch();
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleComplete = (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    dispatch(updateTask(updatedTask));
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setNewTitle(task.title);
    setNewPriority(task.priority);
  };

  const handleSave = () => {
    if (newTitle.trim()) {
      dispatch(
        updateTask({
          id: editingTaskId,
          title: newTitle,
          priority: newPriority || "Medium",
        })
      );
      setEditingTaskId(null);
    }
  };

  const handleCancel = () => {
    setEditingTaskId(null);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter tasks on search query
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery)
  );

  return (
    <div>
      {/* Search Bar */}
      <div className="task-search-container">
        <input
          type="text"
          className="task-search-bar"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* Task List */}
      <div className="task-list">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`task-card ${
              task.completed ?? false ? "completed" : "incomplete"
            }`}
          >
            <div className="task-info">
              {editingTaskId === task.id ? (
                <div className="task-edit-form">
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
                  <button onClick={handleSave}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              ) : (
                <>
                  <h3>{task.title}</h3>
                  <p>Priority: {task.priority || "Medium"}</p>{" "}
                </>
              )}
            </div>

            <div className="task-actions">
              {editingTaskId !== task.id && (
                <>
                  <button onClick={() => toggleComplete(task)}>
                    {task.completed ? "Mark Incomplete" : "Mark Complete"}
                  </button>
                  <button onClick={() => startEditing(task)}>Edit</button>
                  <button onClick={() => handleDelete(task.id)}>Delete</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      priority: PropTypes.string,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default TaskList;
