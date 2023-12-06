import Hero from "@/components/homepage/Hero";
import Features from "@/components/homepage/Features";
import Explore from "@/components/homepage/Explore";
import Create from "@/components/homepage/Create";

const Home = () => {
  return (
    <div className="flex flex-col ">
      <Hero imageUrl="/images/hero-home.jpg" />
      <Features />
      <Explore />
      <Create />
    </div>
  );
};

export default Home;
