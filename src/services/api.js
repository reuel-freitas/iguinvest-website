import axios from "axios";

const api = axios.create({
  baseURL: "https://sleepy-bayou-22688.herokuapp.com/api",
});

export default api;