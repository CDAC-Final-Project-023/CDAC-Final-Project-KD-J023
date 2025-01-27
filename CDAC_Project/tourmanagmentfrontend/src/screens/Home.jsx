import react from "react";
import HomeCarousel from "../components/HomePage/HomeCarousel";
import WhyUs from "../components/HomePage/WhyUs";
import Services from "../components/HomePage/Services";
import Message from "../components/HomePage/Message";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/BetaNav";

function Home() {
  return (
    <div>
      <Navbar />
      <HomeCarousel />
      <WhyUs />
      <Services />
      <Message />
      <Footer />
    </div>
  );
}

export default Home;
