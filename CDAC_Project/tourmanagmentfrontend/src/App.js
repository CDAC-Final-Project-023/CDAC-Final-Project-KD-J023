import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./screens/Login";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./screens/Home";

function App() {
  return (
    <div className="container-fluid">
      <Routes>
        <Route path='/' element={<Login />} /> {/* Corrected component name */}
        <Route path='/login' element={<Login />} /> {/* Corrected component name */}
        <Route path="/home" element={<Home />}></Route>
      </Routes>

      <ToastContainer />  {/* Render ToastContainer */}
    </div>
  );
}

export default App;

