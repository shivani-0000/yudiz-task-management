import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasksAsync = createAsyncThunk(
  "tasks/fetchTasks",
  async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );

      const combinations = [
        { status: "done", priority: "Low" },
        { status: "done", priority: "Medium" },
        { status: "done", priority: "High" },
        { status: "in progress", priority: "Low" },
        { status: "in progress", priority: "Medium" },
        { status: "in progress", priority: "High" },
        { status: "todo", priority: "Low" },
        { status: "todo", priority: "Medium" },
        { status: "todo", priority: "High" },
      ];

      const tasks = response.data.map((task, index) => {
        const combination = combinations[index % combinations.length];

        return {
          ...task,
          completed: task.completed ?? false,
          status: combination.status,
          priority: combination.priority,
        };
      });

      return tasks;
    } catch (error) {
      throw Error(error.message);
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.unshift(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasksAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
