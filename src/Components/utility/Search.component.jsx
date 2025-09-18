import { UserPlus } from 'lucide-react';

export const Search = ({  searchTerm, setSearchTerm, onSearchClick, onSearchKeyDown, isCreate = false, handleCreate }) => (
  <div className="flex w-[50%] gap-2">
    <input
      className="sub-card  border border-[var(--card)] font-serif placeholder:sub-card focus:ring-[var(--card)] focus:outline-none focus:ring-1 flex-1 p-2 rounded-lg"
      type="text"
      value={searchTerm}
      onKeyDown={onSearchKeyDown}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search by name or email"
    />
    <button onClick={onSearchClick} className="px-4 py-2 font-serif border border-[var(--sub-card)] rounded-lg hover:card/80">
      Search
    </button>
    {isCreate && (
      <button onClick={handleCreate} className="px-4 py-2 font-serif border border-[var(--sub-card)]  rounded-lg hover:card/80">
        <UserPlus />
      </button>
    )}
  </div>
);
