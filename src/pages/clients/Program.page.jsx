import { useState } from 'react';
import { Pagination, ProgramCard, Loading,Search } from '@components';
import { useNavigate } from 'react-router-dom';
import { useCoursesQuery } from '@hooks';
import { User } from "lucide-react";

const ProgramHeader = ({ searchTerm, setSearchTerm, onSearchClick, onSearchKeyDown }) => {
  return (
    <div className="flex  flex-col md:flex-row md:items-center md:justify-between">
      <div className="mb-6 md:mb-0">
        <h1 className="text-4xl font-bold mb-2">Join Our Free Programs</h1>
        <p className="font-serif text-lg">Discover how we're making an impact in the community.</p>
      </div>

      <div className="relative">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearchClick={onSearchClick} onSearchKeyDown={onSearchKeyDown} />
      </div>
    </div>
  );
};

export const Program = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [triggerSearch, setTriggerSearch] = useState('');
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useCoursesQuery(currentPage, triggerSearch);
  const programs = data?.data || [];
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

  const handleProgramClick = (prgramId) => {
    navigate(`/programs/${prgramId}`);
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
      <div className=" flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Members</h2>
          <p className="">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-6 py-8">
        <ProgramHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearchClick={onSearchClick} onSearchKeyDown={onSearchKeyDown} />
      </div>

      <div className="container mx-auto px-6 pb-8">
        {/* Programs Card */}
        {programs.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4  rounded-full flex items-center justify-center">
              <User className="w-12 h-12 " />
            </div>
            <h3 className="text-xl font-semibold  mb-2">No Programs Found</h3>
            <p className="">Try adjusting your search criteria .</p>
          </div>
        ) : (
          <div className="grid border-t border-[var(--card)] pt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {programs.map((program) => (
              <div key={program.id} className="relative">
                <ProgramCard program={program} onClick={handleProgramClick} />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {programs.length > 0 && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} from={from} to={to} total={total} />}
      </div>
    </div>
  );
};
