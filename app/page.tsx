import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Carousel from "./components/Carousel";
import Pricing from "./components/Pricing";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <Carousel />
      <Pricing />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
