import react from "react";
import HomeCarousel from "../components/HomePage/HomeCarousel";
import WhyUs from "../components/HomePage/WhyUs";
import Services from "../components/HomePage/Services";
import Message from "../components/HomePage/Message";
import Navbar  from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

function Home() {
  return (
    <div>
      
      <HomeCarousel />
      <WhyUs />
      <Services />
      <Message />
      <Footer />
    </div>
  );
}

export default Home;
