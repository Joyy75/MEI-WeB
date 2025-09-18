import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseSchema } from '../../validation/courseSchema';
import { CircleX } from 'lucide-react';
import { Button, Select, FormLabel } from '@components';
import { levelOptions, statusOptions } from '@data';
import { useVolunteersQuery } from '@hooks';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const CourseForm = ({ open, onClose, onSubmit, initialData = {}, isEdit = false, loading = false }) => {
  const fileInputRef = useRef();
  const { data, isLoading } = useVolunteersQuery(null, '', true);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: '',
      description: '',
      duration: '',
      status: 'active',
      level: '',
      volunteer_id: null,
    },
  });

  useEffect(() => {
    if (isEdit && initialData) {
      const formData = {
        title: initialData.title || '',
        description: initialData.description || '',
        image: initialData.image || '',
        volunteer_id: initialData?.volunteer?.id || '',
        duration: initialData.duration || '',
        status: initialData.status || 'active',
        level: initialData.level || '',
      };

      reset(formData);
    } else {
      reset({
        title: '',
        description: '',
        image: '',
        duration: '',
        status: 'active',
        level: '',
        volunteer_id: null,
      });
    }
  }, [isEdit, initialData, open, reset, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('image', file);
    }
  };

  const handleSelectChange = (fieldName, value) => {
    setValue(fieldName, value);
  };

  const onFormSubmit = (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('duration', data.duration);
    formData.append('status', data.status);
    formData.append('level', data.level);
    formData.append('volunteer_id', data.volunteer_id);
    formData.append('image', data.image);

    if (isEdit) {
      formData.append('_method', 'PUT');
    }

    onSubmit(formData);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="card rounded-lg shadow-lg p-8 w-full max-w-4xl relative max-h-[90vh] overflow-y-auto py-2">
        <button className="absolute top-4 right-4 text-gray-500" onClick={onClose}>
          <CircleX className="w-7 h-7 card" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">{isEdit ? 'Edit Course' : 'Create Course'}</h2>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="flex flex-col items-center mb-4">
            {initialData?.image && <img src={initialData?.image} alt="course" className="w-28 h-28 rounded-lg object-cover" />}
            <input
              type="file"
              name="image"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="block w-full text-sm file:sub-card file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold"
            />
            {errors.image && <p className="text-xs text-red-500 mt-1">{errors.image.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormLabel error={errors.title?.message} required={true} name="title" type="text" label="Title" placeholder="Enter course title" register={register} />
            <FormLabel error={errors.duration?.message} name="duration" type="text" label="Duration" placeholder="e.g., 8 weeks, 40 hours" register={register} />

            <Select
              label="Status"
              name="status"
              onChange={(e) => handleSelectChange('status', e.target.value)}
              options={statusOptions}
              placeholder="Select Status"
              error={errors.status?.message}
              register={register('status')}
            />

            <Select
              label="Level"
              name="level"
              onChange={(e) => handleSelectChange('level', e.target.value)}
              options={levelOptions}
              placeholder="Select Level"
              error={errors.level?.message}
              register={register('level')}
            />
          </div>

          <Select
            label="Instructor"
            name="Instructor"
            onChange={(e) => handleSelectChange('volunteer_id', e.target.value)}
            options={data?.data}
            placeholder="Select Instructor"
            error={errors.volunteer_id?.message}
            register={register('volunteer_id')}
          />

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <CKEditor
              editor={ClassicEditor}
              data={initialData?.description || ''}
              onChange={(_, editor) => {
                const data = editor.getData();
                setValue('description', data, { shouldValidate: true });
              }}
            />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
          </div>

          <Button disabled={loading} type="submit" name="submit" label={isEdit ? 'Update' : 'Create'} />
        </form>
      </div>
    </div>
  );
};
