import Hero from "@/components/home/hero";
import Feature from "@/components/home/feature";
import Tutorial from "@/components/home/tutorial";
import Footer from "@/components/ui/footer-comp";

const HomePage = async () => {
  return (
    <>
      <Hero />
      <Feature />
      <Tutorial />
      <Footer />
    </>
  );
};

export default HomePage;
