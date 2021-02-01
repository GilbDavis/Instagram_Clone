import axios from "../config/axios";

const authenticateToken = () => {
  if (localStorage.getItem('authToken')) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('authToken')}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export default authenticateToken;