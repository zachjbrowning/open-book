import axios from "axios";


let instance = axios.create({
  baseURL: `http://localhost:3000`,
  header: {
    "content-type": "application/json",
  },
});

export default instance;