import GetStarted from "../components/HomePage/GetStarted";
import react from "react";
import WhyUs from "../components/HomePage/WhyUs";
import Services from "../components/HomePage/Services";
import Message from "../components/HomePage/Message";
function Home() {
  return (
    <div>
      <GetStarted />
      <WhyUs />
      <Services />
      <Message />
    </div>
  );
}

export default Home;
