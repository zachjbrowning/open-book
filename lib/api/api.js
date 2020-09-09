import axios from "axios";



//Defines the instance used by axios to interact with the backend
let instance = axios.create({
  baseURL: `http://localhost:8000/api`,
  header: {
    "content-type": "application/json",
  },
});

export default instance;