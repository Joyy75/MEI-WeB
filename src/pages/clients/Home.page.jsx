import React, { useContext } from 'react';
import { ContactBanner, FeedBackBanner, HistoryBanner, HomeBanner, ServicesBanner, VisionBanner } from '@components';
import 'aos/dist/aos.css';
import { AllContext } from '../../context/AllContext';

const About = ({ darkMode }) => (
  <section id="about-us" data-aos="fade-up" className={`px-6 py-16  bg-gradient-to-br ${darkMode ? 'from-[#64edf6] to-[#8bcbd0] text-[#0a0b3b]' : 'from-[#0a0b3b] to-[#1f224d] text-[#64edf6]'}`}>
    <div className="max-w-4xl mx-auto text-center ">
      <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16">About US</h2>{' '}
      <p className=" font-serif text-lg lg:text-xl leading-relaxed">
        Meridian Education Institute (MEI) is a nonprofit, youth-led educational organization based in Myanmar. MEI operates entirely online to eliminate barriers to learning. We provide free,
        high-quality education to underserved students across the country. MEI is founded on the values of equity, innovation, and community-driven growth.
      </p>
    </div>
  </section>
);

export const Home = () => {
  const { darkMode } = useContext(AllContext);

  return (
    <div className="min-h-screen" sx={{ transition: 'background-color 0.3s, color 0.3s' }}>
      <HomeBanner />
      <About darkMode={darkMode} />

      {/* Vision  */}
      <section id="vision">
        <VisionBanner />
      </section>

      {/* History */}
      <section data-aos="fade-right" className="py-20 px-4 md:px-20 max-w-4xl mx-auto">
        <HistoryBanner />
      </section>

      {/* Services */}
      <section data-aos="fade-left" className="px-6 py-20">
        <ServicesBanner />
      </section>

      {/* feedbacks */}
      <section data-aos="fade-right" className="px-6 py-20">
        <FeedBackBanner />
      </section>

      {/* Final CTA */}
      <section data-aos="fade-up" className={`px-6 py-20 text-center bg-gradient-to-br ${darkMode ? 'from-[#64edf6] to-[#8bcbd0] text-[#0a0b3b]' : 'from-[#0a0b3b] to-[#1f224d] text-[#64edf6]'} `}>
        <ContactBanner />
      </section>
    </div>
  );
};
