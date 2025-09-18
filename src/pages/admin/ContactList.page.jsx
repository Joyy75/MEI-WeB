import React, { useState } from 'react';
import { Loading, Pagination, Search } from '@components';
import { useContactsQuery } from '@hooks';

export const ContactList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [triggerSearch, setTriggerSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useContactsQuery(currentPage, triggerSearch);
  const contacts = data?.data || [];
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

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-semibold">Contact List</h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearchClick={onSearchClick} onSearchKeyDown={onSearchKeyDown} />
      </div>

      {isLoading ? (
        <Loading />
      ) : error ? (
        <p className="text-red-500">Failed to load contacts</p>
      ) : (
        <>
          <div className="overflow-x-auto shadow-sm rounded-lg">
            <table className="min-w-full table-auto text-left border-collapse">
              <thead className="card">
                <tr>
                  <th className="p-4 font-semibold">No</th>
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold">Message</th>
                </tr>
              </thead>
              <tbody>
                {contacts?.map((contact, index) => (
                  <tr key={contact.id} className="border-t border-t-[var(--card)]">
                    <td className="p-4">{(currentPage - 1) * meta.per_page + index + 1}</td>
                    <td className="p-4">{contact.name}</td>
                    <td className="p-4">{contact.email}</td>
                    <td className="p-4">{contact.message}</td>
                  </tr>
                ))}
                {contacts?.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-4 text-center">
                      No contacts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Pagination currentPage={meta.current_page} totalPages={meta.last_page} setCurrentPage={setCurrentPage} from={meta.from} to={meta.to} total={meta.total} />
        </>
      )}
    </div>
  );
};
