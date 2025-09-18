import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading, Pagination, Search, SnackBar, CourseForm } from '@components';
import { useSnackbar, useCoursesQuery, useCourseCreateMutation, useCourseUpdateMutation, useCourseDeleteMutation } from '@hooks';

export const CourseList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { message: snackMessage, type: snackType, trigger: snackTrigger, showSnack } = useSnackbar();
  const [triggerSearch, setTriggerSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const { data, isLoading, error, refetch } = useCoursesQuery(currentPage, triggerSearch);
  const courses = data?.data || [];
  const meta = data?.meta || {};

  const createMutation = useCourseCreateMutation();
  const updateMutation = useCourseUpdateMutation();
  const deleteMutation = useCourseDeleteMutation();

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

  const handleEdit = (course) => {
    setEditData(course);
    setIsEdit(true);
    setFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setDeleteId(id);
      deleteMutation.mutate(id, {
        onSuccess: () => {
          showSnack('Course deleted successfully', 'success');
          setDeleteId(null);
          refetch();
        },
        onError: (error) => {
          showSnack(`Failed to delete course: ${error}`, 'error');
        },
        onSettled: () => setDeleteId(null),
      });
    }
  };

  const handleCourseClick = (courseId) => {
    navigate(`/admin/courses/${courseId}`);
  };

  const handleFormSubmit = (formData) => {
    if (isEdit && editData) {
      updateMutation.mutate(
        { id: editData.id, data: formData },
        {
          onSuccess: () => {
            showSnack('Course updated successfully', 'success');
            setFormOpen(false);
            setEditData(null);
            setIsEdit(false);
            refetch();
          },
          onError: (error) => {
            showSnack(`Failed to update course: ${error}`, 'error');
          },
        }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => {
          showSnack('Course created successfully', 'success');
          setFormOpen(false);
          refetch();
        },
        onError: (error) => {
          showSnack(`Failed to create course: ${error}`, 'error');
        },
      });
    }
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditData(null);
    setIsEdit(false);
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800',
      draft: 'bg-yellow-100 text-yellow-800',
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const getLevelBadge = (level) => {
    const levelColors = {
      beginner: 'bg-blue-100 text-blue-800',
      intermediate: 'bg-orange-100 text-orange-800',
      advanced: 'bg-purple-100 text-purple-800',
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${levelColors[level] || 'bg-gray-100 text-gray-800'}`}>
        {level}
      </span>
    );
  };

  return (
    <div className="p-6">
      <SnackBar message={snackMessage} type={snackType} trigger={snackTrigger} />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-semibold">Course List</h1>

        <Search
          isCreate={true}
          handleCreate={handleCreate}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearchClick={onSearchClick}
          onSearchKeyDown={onSearchKeyDown}
        />
      </div>

      <CourseForm open={formOpen} onClose={handleCloseForm} onSubmit={handleFormSubmit} initialData={editData} isEdit={isEdit} loading={createMutation.isPending || updateMutation.isPending} />

      {isLoading ? (
        <Loading />
      ) : error ? (
        <p className="text-red-500">Failed to load courses</p>
      ) : (
        <>
          <div className="overflow-x-auto shadow-sm rounded-lg">
            <table className="min-w-full table-auto text-left border-collapse">
              <thead className="card">
                <tr>
                  <th className="p-4 font-semibold">No</th>
                  <th className="p-4 font-semibold">Image</th>
                  <th className="p-4 font-semibold">Title</th>
                  <th className="p-4 font-semibold">Instructor</th>
                  <th className="p-4 font-semibold">Level</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Duration</th>
                  <th className="p-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses?.map((course, index) => (
                  <tr key={course.id} className="border-t border-t-[var(--card)]">
                    <td className="p-4">{(currentPage - 1) * meta.per_page + index + 1}</td>
                    <td className="p-4 text-center mx-auto">
                      <img src={course.image} alt={course.title} className="w-14 h-14 rounded-lg object-cover" />
                    </td>
                    <td className="p-4">
                      <button onClick={() => handleCourseClick(course.id)} className="duration-300 font-medium hover:underline transition-colors">
                        {course?.title}
                      </button>
                    </td>
                    <td className="p-4">{course?.volunteer?.name}</td>
                    <td className="p-4">{getLevelBadge(course?.level)}</td>
                    <td className="p-4">{getStatusBadge(course?.status)}</td>
                    <td className="p-4">{course?.duration}</td>
                    <td className="p-4 flex gap-3 items-center justify-end">
                      <button onClick={() => handleEdit(course)} className="flex items-center text-cyan-200 gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(course.id)} 
                        disabled={deleteId === course.id}
                        className="flex items-center text-cyan-200 gap-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                      >
                        {deleteId === course.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
                {courses?.length === 0 && (
                  <tr>
                    <td colSpan="9" className="p-4 text-center">
                      No courses found.
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