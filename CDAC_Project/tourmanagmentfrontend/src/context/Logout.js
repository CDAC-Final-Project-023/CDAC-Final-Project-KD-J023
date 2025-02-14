import axios from "axios";

function Logout(dispatch) {
  sessionStorage.removeItem("user"); // Remove user from sessionStorage

  // Make a request to your backend for logout
  axios.get("/api/logout").then(() => {
    dispatch({ type: "LOGOUT" }); // Dispatch logout action to clear user state
    window.location.href = "/home"; // Redirect to home page
  });
}

export default Logout;
