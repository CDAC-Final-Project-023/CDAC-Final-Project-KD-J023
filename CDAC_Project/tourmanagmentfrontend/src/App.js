
import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from './screens/Home';

function App() {
  return (
    <div className="container-fluid">
      <Routes>
        
        <Route path="/home" element={<Home />}>
          
        </Route>
      </Routes>

      
    </div>
  );
}

export default App;
