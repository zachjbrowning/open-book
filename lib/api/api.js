import axios from "axios";


let instance = axios.create({
  baseURL: `http://localhost:8000`,
  header: {
    "content-type": "application/json",
  },
});

export default instance;