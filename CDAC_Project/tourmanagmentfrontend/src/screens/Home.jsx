import react from "react";
import HomeCarousel from "../components/HomePage/HomeCarousel";
import WhyUs from "../components/HomePage/WhyUs";
import Services from "../components/HomePage/Services";
import Message from "../components/HomePage/Message";

function Home() {
  return (
    <div>
      <HomeCarousel/>
      <WhyUs />
      <Services />
      <Message />
    </div>
  );
}

export default Home;
