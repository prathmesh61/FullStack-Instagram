import axios from "axios";

export const useApi = axios.create({
  baseURL: "http://localhost:7000/api",
});
