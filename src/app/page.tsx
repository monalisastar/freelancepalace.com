import Hero from '../components/Hero';
import Services from '../components/Services';
import StartEscrow from '../components/StartEscrow';
import FAQ from '../components/FAQ';
import WhoWeAre from '../components/WhoWeAre';
import WhyChooseUs from '../components/WhyChooseUs';

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <WhyChooseUs />
      <Services />
      <StartEscrow />
      <FAQ />
    </>
  );
}
