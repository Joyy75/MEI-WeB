import React, { useContext } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { AllContext } from '../../context/AllContext';
import { footerPrograms, quickLinks, socialLinks, volunteers } from '@data';
import { useLocation } from 'react-router-dom';

const Socialinks = () => (
  <div className="flex space-x-4">
    {socialLinks?.map(({ Icon, href, name }) => (
      <a target="_blank" key={name} href={href} className="social-icon social-icon-style " aria-label={name}>
        <Icon className="w-5 h-5" />
      </a>
    ))}
  </div>
);

const QuickLinks = () => {
  const { pathname } = useLocation();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isHomePage = pathname === '/';

  return (
    <div>
      <h4 className="text-lg font-bold mb-4">Quick Links</h4>
      <ul className="space-y-3">
        {quickLinks.map((link, index) => {
          const isAnchorLink = link.href.startsWith('#');
          const isHomeOnly = ['#about-us', '#vision'].includes(link.href);

          const shouldUseAnchor = isAnchorLink && isHomeOnly && isHomePage;

          return (
            <li key={index}>
              <a
                href={shouldUseAnchor ? link.href : `/${link.href}`}
                onClick={(e) => {
                  if (shouldUseAnchor) {
                    e.preventDefault();
                    scrollToSection(link.href.substring(1));
                  }
                }}
                className="footer-link link-style font-serif"
              >
                {link.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const ProgramLinks = () => (
  <div>
    <h4 className="text-lg font-bold mb-4">Program Links</h4>
    <ul className="space-y-3">
      {footerPrograms.map((link, index) => (
        <li key={index}>
          <a href={link.href} className="footer-link link-style font-serif">
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const VolunteerLinks = () => (
  <div>
    <h4 className="text-lg font-bold mb-4">Volunteer Links</h4>
    <ul className="space-y-3">
      {volunteers.map((link, index) => (
        <li key={index}>
          <a href={link.href} className="footer-link link-style font-serif">
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Subscribe = () => (
  <div>
    <h4 className="text-lg font-bold mb-4">Stay Connected</h4>
    <p className="font-serif text-sm mb-4 opacity-90">Get updates on new course, events, and educational resources.</p>

    <form className="mb-4">
      <input type="email" placeholder="Enter your email" className="newsletter-input" required />
      <button type="submit" className="card newsletter-button">
        Subscribe
      </button>
    </form>
  </div>
);

export const Footer = () => {
  const { darkMode } = useContext(AllContext);

  return (
    <footer style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)' }}>
      <div className="px-6 py-7">
        <div className="max-w-7xl mx-auto">
          <div className="grid  items-start sm:grid-cols-2 lg:grid-cols-5 gap-12">
            <div className="relative">
              <img src={`${darkMode ? 'assets/logo-dark.svg' : 'assets/logo-light.svg'}`} className="object-cover mr-auto cursor-pointer absolute  sm:-top-7  w-24 h-24" />

              <div className="space-y-3 mb-6 mt-28  sm:mt-16">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 opacity-70" />
                  <span className="text-sm">mei.org.mm@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 opacity-70" />
                  <span className="text-sm">+95 9942256236</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-3 opacity-70" />
                  <span className="text-sm">Global Education Hub, Online</span>
                </div>

                <Socialinks />
              </div>
            </div>

            <QuickLinks />

            <ProgramLinks />

            <VolunteerLinks />

            <Subscribe />
          </div>
        </div>
      </div>

      <div className={`px-6 py-3 border-t   shadow-md ${darkMode ? 'border-[#64edf6] ' : 'border-[#0a0b3b]'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-sm mx-auto text-center font-serif opacity-80 mb-4 md:mb-0">© {new Date().getFullYear()} Meridian Education Institute. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};
