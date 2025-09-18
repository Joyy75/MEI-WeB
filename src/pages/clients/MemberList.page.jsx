import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, BadgeCheck, User, Eye, Calendar } from 'lucide-react';
import { Pagination, Search, Loading } from '@components';
import { useVolunteersQuery } from '@hooks';

const MemberHeader = ({ searchTerm, setSearchTerm, onSearchClick, onSearchKeyDown }) => {
  return (
    <div className="flex  flex-col md:flex-row md:items-center md:justify-between">
      <div className="mb-6 md:mb-0">
        <h1 className="text-4xl font-bold mb-2">Our Team Members</h1>
        <p className="font-serif text-lg">Meet the dedicated individuals who make our organization thrive.</p>
      </div>

      <div className="relative">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearchClick={onSearchClick} onSearchKeyDown={onSearchKeyDown} />
      </div>
    </div>
  );
};

const MemberCard = ({ member, onClick }) => {
  return (
    <div
      onClick={() => onClick(member.id)}
      className="group relative overflow-hidden card rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 "
    >
      <div className="relative p-6">
        <div className="flex relative items-start justify-between mb-4">
          <div className="flex  items-center gap-3">
            <img
              src={member?.image || '/default-avatar.png'}
              alt={member?.name}
              className="w-20 rounded-full h-20 object-cover"
              onError={(e) => {
                e.target.src = '/default-avatar.png';
              }}
            />

            {/* Contact Information */}
            <div className="space-y-3 ">
              <div className="flex font-serif items-center gap-2   rounded-xl  transition-colors duration-200">
                <User className="w-4 h-4   " />
                <p className="text-sm  truncate font-medium">{member.name}</p>
              </div>
              <div className="flex font-serif items-center gap-2   rounded-xl  transition-colors duration-200">
                <BadgeCheck className="w-4 h-4   " />
                <p className="text-sm  truncate font-medium">{member.position}</p>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex absolute -top-3 -right-4  flex-col items-end gap-2">
            <span className="inline-flex sub-card items-center px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ">
              <div className="w-2 h-2 font-serif card rounded-full mr-2 animate-pulse"></div>
              Active
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-4 border-t border-t-[var(--card)]">
          <div className="flex font-serif  items-center gap-2 text-sm ">
            <Mail className="w-4 h-4" />
            <span>{member?.email}</span>
          </div>

          <div className="flex font-serif items-center gap-2 font-medium text-sm  transition-colors duration-200">
            <span>View Detail</span>
            <Eye className="w-4 h-4 transform  transition-transform duration-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const MemberList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [triggerSearch, setTriggerSearch] = useState('');
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useVolunteersQuery(currentPage, triggerSearch);
  const volunteers = data?.data || [];
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

  const handleMemberClick = (volunteerId) => {
    navigate(`/members/${volunteerId}`);
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
      {/* Header */}
      <div className="">
        <div className="container mx-auto px-6 py-8">
          <MemberHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearchClick={onSearchClick} onSearchKeyDown={onSearchKeyDown} />
        </div>
      </div>

      <div className="container  mx-auto px-6  pb-8 ">
        {/* Member Cards */}
        {volunteers.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4  rounded-full flex items-center justify-center">
              <User className="w-12 h-12 " />
            </div>
            <h3 className="text-xl font-semibold  mb-2">No Members Found</h3>
            <p className="">Try adjusting your search criteria or add new members.</p>
          </div>
        ) : (
          <div className="grid border-t border-[var(--card)] pt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {volunteers.map((volunteer) => (
              <div key={volunteer.id} className="relative">
                <MemberCard member={volunteer} onClick={handleMemberClick} />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {volunteers.length > 0 && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} from={from} to={to} total={total} />}
      </div>
    </div>
  );
};
