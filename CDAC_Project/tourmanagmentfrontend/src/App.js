import logo from './logo.svg';
import './App.css';
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import AdminNavbar from './components/navbar/AdminNavbar';
import NavigatedMenu from './components/navbar/NavigatedMenu';
import TourNav from './components/navbar/TourNav';
import Footer from './components/footer/Footer';
import AdminDashboard from './components/Admin/admin';

function App() {
  return (
    <BrowserRouter>
    {/* <Footer/> */}
    <Navbar/>
    {/* <AdminNavbar/> */}
    {/* <NavigatedMenu/> */}
    {/* <MantineProvider theme={{ colorScheme: 'light' }}>
    <TourNav/>
    </MantineProvider> */}
    <AdminDashboard/>
    </BrowserRouter>
    
  );
}

export default App;
