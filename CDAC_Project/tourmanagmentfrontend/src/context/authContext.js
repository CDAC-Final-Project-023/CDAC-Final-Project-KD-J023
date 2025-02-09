import { createContext, useEffect, useReducer } from "react";
import Logout from "./Logout"; // Import the Logout function

// Initial state, checking for user in sessionStorage
const INITIAL_STATE = {
  user: JSON.parse(sessionStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);
console.log(AuthContext);
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload, // Store user data after successful login
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    if (state.user) {
      sessionStorage.setItem("user", JSON.stringify(state.user)); // Save user to sessionStorage
    }
  }, [state.user]);

  const logout = () => {
    Logout(dispatch); // Call the Logout function with dispatch
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
