import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading, Pagination, Search, SnackBar, VolunteerForm } from '@components';
import { useSnackbar, useVolunteersQuery, useVolunteerCreateMutation, useVolunteerUpdateMutation, useVolunteerDeleteMutation } from '@hooks';

export const VolunteerList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { message: snackMessage, type: snackType, trigger: snackTrigger, showSnack } = useSnackbar();
  const [triggerSearch, setTriggerSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const { data, isLoading, error, refetch } = useVolunteersQuery(currentPage, triggerSearch);
  const volunteers = data?.data || [];
  const meta = data?.meta || {};

  const createMutation = useVolunteerCreateMutation();
  const updateMutation = useVolunteerUpdateMutation();
  const deleteMutation = useVolunteerDeleteMutation();

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

  const handleEdit = (volunteer) => {
    setEditData(volunteer);
    setIsEdit(true);
    setFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this volunteer?')) {
      setDeleteId(id);
      deleteMutation.mutate(id, {
        onSuccess: () => {
          showSnack('Volunteer deleted successfully', 'error');
          setDeleteId(null);
          refetch();
        },
        onSettled: () => setDeleteId(null),
      });
    }
  };

  const handleVolunteerClick = (volunteerId) => {
    navigate(`/admin/volunteers/${volunteerId}`);
  };

  const handleFormSubmit = (formData) => {
    if (isEdit && editData) {
      updateMutation.mutate(
        { id: editData.id, data: formData },
        {
          onSuccess: () => {
            showSnack('Volunteer updated successfully', 'success');
            setFormOpen(false);
            setEditData(null);
            setIsEdit(false);
            refetch();
          },
          onError: (error) => {
            showSnack(`Failed to update volunteer: ${error}`, 'error');
          },
        }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => {
          showSnack('Volunteer created successfully', 'success');
          setFormOpen(false);
          refetch();
        },
        onError: (error) => {
          showSnack(`Failed to create volunteer: ${error}`, 'error');
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
        <h1 className="text-3xl font-semibold">Volunteer List</h1>

        <Search
          isCreate={true}
          handleCreate={handleCreate}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearchClick={onSearchClick}
          onSearchKeyDown={onSearchKeyDown}
        />
      </div>

      <VolunteerForm open={formOpen} onClose={handleCloseForm} onSubmit={handleFormSubmit} initialData={editData} isEdit={isEdit} loading={createMutation.isPending || updateMutation.isPending} />

      {isLoading ? (
        <Loading />
      ) : error ? (
        <p className="text-red-500">Failed to load volunteers</p>
      ) : (
        <>
          <div className="overflow-x-auto shadow-sm rounded-lg">
            <table className="min-w-full table-auto text-left border-collapse">
              <thead className="card">
                <tr>
                  <th className="p-4 font-semibold">No</th>
                  <th className="p-4 font-semibold">Profile</th>
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold">Position</th>
                  <th className="p-4 font-semibold">Team</th>
                  <th className="p-4 font-semibold">Phone</th>
                  <th className="p-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {volunteers?.map((volunteer, index) => (
                  <tr key={volunteer.id} className="border-t border-t-[var(--card)]">
                    <td className="p-4">{(currentPage - 1) * meta.per_page + index + 1}</td>
                    <td className="p-4 text-center mx-auto">
                      <img src={volunteer.image} alt={volunteer.name} className="w-14 h-14 rounded-full object-cover" />
                    </td>
                    <td className="p-4">
                      <button onClick={() => handleVolunteerClick(volunteer.id)} className=" duration-300 font-medium hover:underline transition-colors">
                        {volunteer?.name}
                      </button>
                    </td>
                    <td className="p-4">{volunteer?.email}</td>
                    <td className="p-4">{volunteer?.position}</td>
                    <td className="p-4">{volunteer?.team}</td>
                    <td className="p-4">{volunteer?.phone}</td>
                    <td className="p-4 flex gap-3 items-center justify-end ">
                      <button onClick={() => handleEdit(volunteer)} className="flex items-center text-cyan-200 gap-2 px-4 py-2 bg-blue-600  rounded-lg hover:bg-blue-700 transition-colors">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(volunteer.id)} className="flex items-center  text-cyan-200  gap-2 px-4 py-2 bg-red-600  rounded-lg hover:bg-red-700 transition-colors">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {volunteers?.length === 0 && (
                  <tr>
                    <td colSpan="7" className="p-4 text-center">
                      No volunteers found.
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
