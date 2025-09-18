import { useParams, useNavigate } from 'react-router-dom';
import { useEventQuery } from '@hooks';
import { Loading } from '@components';
import { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

const BackToRoute = () => {
  const navigate = useNavigate();
  const location = window.location.pathname;
  const isAdmin = location.includes('/admin');

  return (
    <div className="flex justify-between items-center">
      <button onClick={() => navigate(isAdmin ? '/admin/events' : '/events')} className="text-sm flex items-center gap-1 ">
        <ArrowLeft className="w-4 h-4" />
        Back To Events
      </button>
    </div>
  );
};

const EventHeader = ({ event }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () => setCurrentIndex((prev) => (prev === event?.images.length - 1 ? 0 : prev + 1));
  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? event?.images.length - 1 : prev - 1));

  return (
    <div>
      <div className="flex items-center text-lg  py-2 justify-between">
        <p>{event.title}</p>
        <p className="font-serif">{event.start_date}</p>
      </div>

      {event.images && (
        <div className="p-4 mb-8 rounded-2xl">
          <div className="relative w-full h-[40vh] md:h-[70vh] mb-4">
            <img src={event?.images[currentIndex].image_path} alt={event?.images[currentIndex].alt} className="object-cover w-full h-full shadow-lg rounded-xl" />
          </div>
          <div className="relative">
            <div className="flex items-center justify-center pb-2 space-x-3 overflow-x-auto scrollbar-hide">
              {event?.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`flex-shrink-0 w-28 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                    currentIndex === index ? 'border-4  ring-2 ' : 'border-4 border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={image.image_path} alt={image.alt} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-4">
            <button onClick={handlePrev} className="p-3 card transition-transform rounded-full shadow-lg  focus:outline-none focus:ring-2  hover:scale-110">
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center gap-2">
              {event?.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 mx-auto text-center rounded-full transition-all duration-300 ${currentIndex === index ? ' w-6' : ' card w-2 hover:opacity-80'}`}
                />
              ))}
            </div>
            <button onClick={handleNext} className="p-3 card transition-transform rounded-full shadow-lg  focus:outline-none focus:ring-2  hover:scale-110">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const EventDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useEventQuery(id);
  const event = data?.data;

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <BackToRoute />
      <EventHeader event={event} />
      <div className="mt-8 space-y-6">
        {/* Text Content Section */}
        <div className="bg-black/10 dark:bg-white/10 shadow-md rounded-2xl p-8 border border-white/20 shadow-">
          <div 
            className="prose prose-lg max-w-none text-left leading-relaxed "
            style={{ fontFamily: 'Myanmar Text, Padauk, Noto Sans Myanmar, sans-serif' }}
            dangerouslySetInnerHTML={{ __html: event.description }} 
          />
        </div>


      </div>
    </div>
  );
};
