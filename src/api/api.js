import axios from 'axios';
export default axios.create({
  baseURL: process.env.REACT_APP_JAVA_SERVER,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
    }
});
