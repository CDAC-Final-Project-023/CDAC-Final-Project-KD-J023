import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Register from './components/Register';


function App() {
  return (
    <BrowserRouter>
    <Register/>
    </BrowserRouter>
  );
}

export default App;
