import { feedbacks } from '@data';
export const FeedBackBanner = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16">What Our Students & Volunteers Say</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {feedbacks?.map(({ quote, name, role }) => (
          <div key={name} className="card testimonial-card cardStyle">
            <p className="font-serif text-lg leading-relaxed mb-6 flex-grow italic">"{quote}"</p>
            <div className="border-t pt-4  border-[var(--card)] ">
              <h4 className="font-bold text-lg">{name}</h4>
              <p className="opacity-70 text-sm">{role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
