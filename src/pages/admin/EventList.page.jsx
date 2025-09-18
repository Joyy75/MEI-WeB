import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading, Pagination, Search, SnackBar, EventForm } from '@components';
import { useSnackbar, useEventCreateMutation, useEventDeleteMutation, useEventsQuery, useEventUpdateMutation } from '@hooks';

export const EventList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { message: snackMessage, type: snackType, trigger: snackTrigger, showSnack } = useSnackbar();
  const [triggerSearch, setTriggerSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const { data, isLoading, error, refetch } = useEventsQuery(currentPage, triggerSearch);
  const events = data?.data || [];
  const meta = data?.meta || {};

  const createMutation = useEventCreateMutation();
  const updateMutation = useEventUpdateMutation();
  const deleteMutation = useEventDeleteMutation();

  const onSearchClick = () => {
    setTriggerSearch(searchTerm.trim());
    setCurrentPage(1);
  };

  const onSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearchClick();
    }
  };

  const handleCreate = () => {
    setEditData(null);
    setIsEdit(false);
    setFormOpen(true);
  };

  const handleEdit = (event) => {
    setEditData(event);
    setIsEdit(true);
    setFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setDeleteId(id);
      deleteMutation.mutate(id, {
        onSuccess: () => {
          showSnack('Event deleted successfully', 'success');
          setDeleteId(null);
          refetch();
        },
        onError: (error) => {
          showSnack(`Failed to delete event: ${error}`, 'error');
        },
        onSettled: () => setDeleteId(null),
      });
    }
  };

  const handleCourseClick = (eventId) => {
    navigate(`/admin/events/${eventId}`);
  };

  const handleFormSubmit = (formData) => {
    if (isEdit && editData) {
      updateMutation.mutate(
        { id: editData.id, data: formData },
        {
          onSuccess: () => {
            showSnack('Event updated successfully', 'success');
            setFormOpen(false);
            setEditData(null);
            setIsEdit(false);
            refetch();
          },
          onError: (error) => {
            showSnack(`Failed to update event: ${error}`, 'error');
          },
        }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => {
          showSnack('Event created successfully', 'success');
          setFormOpen(false);
          refetch();
        },
        onError: (error) => {
          showSnack(`Failed to create event: ${error}`, 'error');
        },
      });
    }
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditData(null);
    setIsEdit(false);
  };

  return (
    <div className="p-6">
      <SnackBar message={snackMessage} type={snackType} trigger={snackTrigger} />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-semibold">Event List</h1>

        <Search isCreate={true} handleCreate={handleCreate} searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearchClick={onSearchClick} onSearchKeyDown={onSearchKeyDown} />
      </div>

      <EventForm open={formOpen} onClose={handleCloseForm} onSubmit={handleFormSubmit} initialData={editData} isEdit={isEdit} loading={createMutation.isPending || updateMutation.isPending} />

      {isLoading ? (
        <Loading />
      ) : error ? (
        <p className="text-red-500">Failed to load events</p>
      ) : (
        <>
          <div className="overflow-x-auto shadow-sm rounded-lg">
            <table className="min-w-full table-auto text-left border-collapse">
              <thead className="card">
                <tr>
                  <th className="p-4 font-semibold">No</th>
                  <th className="p-4 font-semibold">Title</th>
                  <th className="p-4 font-semibold">Start Date</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events?.map((event, index) => (
                  <tr key={event.id} className="border-t border-t-[var(--card)]">
                    <td className="p-4">{(currentPage - 1) * meta.per_page + index + 1}</td>

                    <td className="p-4">
                      <button onClick={() => handleCourseClick(event.id)} className="duration-300 font-medium hover:underline transition-colors">
                        {event?.title}
                      </button>
                    </td>

                    <td className="p-4">{event?.start_date}</td>
                    <td className="p-4 flex gap-3 items-center justify-end">
                      <button onClick={() => handleEdit(event)} className="flex items-center text-cyan-200 gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        disabled={deleteId === event.id}
                        className="flex items-center text-cyan-200 gap-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                      >
                        {deleteId === event.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
                {events?.length === 0 && (
                  <tr>
                    <td colSpan="9" className="p-4 text-center">
                      No events found.
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
