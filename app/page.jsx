import Hero from "@/components/home/hero";
import Feature from "@/components/home/feature";
import Tutorial from "@/components/home/tutorial";
import Divider from "@/components/ui/divider";
import Closing from "@/components/home/closing";
import Footer from "@/components/ui/footer-comp";

const HomePage = async () => {
  return (
    <>
      <Hero />
      <Feature />
      <Tutorial />
      <Divider />
      <Closing />
      <Footer />
    </>
  );
};

export default HomePage;
