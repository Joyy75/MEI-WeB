import { services } from '@data';

export const ServicesBanner = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16">What We Offer</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map(({ Icon, title, description }) => (
          <div key={title} className="service-card card cardStyle" >
            <div className="p-3 sub-card rounded-full mx-auto mb-6 transition-transform duration-300">
              <Icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-center">{title}</h3>
            <p className="font-serif leading-relaxed text-center flex-grow">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
