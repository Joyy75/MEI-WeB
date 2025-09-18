import { useState } from 'react';
import { Pagination, Loading, Search } from '@components';
import { useNavigate } from 'react-router-dom';
import { useEventsQuery } from '@hooks';
import { User } from 'lucide-react';

const EventHeader = ({ searchTerm, setSearchTerm, onSearchClick, onSearchKeyDown }) => {
  return (
    <div className="flex  flex-col md:flex-row md:items-center md:justify-between">
      <div className="mb-6 md:mb-0">
        <h1 className="text-4xl font-bold mb-2">Our MEI Organization Events</h1>
        <p className="font-serif text-lg">Find out what our organization is up to.</p>
      </div>

      <div className="relative">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearchClick={onSearchClick} onSearchKeyDown={onSearchKeyDown} />
      </div>
    </div>
  );
};

const EventCard = ({ event, onClick }) => (
  <div onClick={() => onClick(event.id)} className="card rounded-2xl shadow-lg shadow-[var(--card)]  overflow-hidden  hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
    <img src={event.images[0].image_path} alt={event?.title} className={`  h-72 w-full object-cover bg-gradient-to-br   overflow-hidden`} />

    <div className="p-6 space-y-3">
      <h3 className="text-lg font-bold text-gray-800 line-clamp-2 leading-tight">{event?.title}</h3>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600 font-medium">{event?.start_date}</span>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Event</span>
      </div>
    </div>
  </div>
);

export const Events = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [triggerSearch, setTriggerSearch] = useState('');
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useEventsQuery(currentPage, triggerSearch);

  const events = data?.data || [];
  console.log('eve', events);
  const meta = data?.meta || {};

  const onSearchClick = () => {
    setTriggerSearch(searchTerm.trim());
    setCurrentPage(1);
  };

  const onSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearchClick();
    }
  };

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const totalPages = meta?.last_page || 1;
  const from = meta?.from || 0;
  const to = meta?.to || 0;
  const total = meta?.total || 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Members</h2>
          <p className="">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" ">
      <div className="container mx-auto px-6 py-8">
        <EventHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearchClick={onSearchClick} onSearchKeyDown={onSearchKeyDown} />
      </div>


      <div className="container mx-auto px-6 pb-8">
        {/* Events Card */}
        {events.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4  rounded-full flex items-center justify-center">
              <User className="w-12 h-12 " />
            </div>
            <h3 className="text-xl font-semibold  mb-2">No Events Found</h3>
            <p className="">Try adjusting your search criteria .</p>
          </div>
        ) : (
          <div className="grid border-t border-[var(--card)] pt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {events.map((event) => (
              <div key={event.id} className="relative">
                <EventCard event={event} onClick={handleEventClick} />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {events.length > 0 && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} from={from} to={to} total={total} />}
      </div>
    </div>
  );
};
