import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const fetchTasks = () => {
  return axios.get(API_URL);
};
