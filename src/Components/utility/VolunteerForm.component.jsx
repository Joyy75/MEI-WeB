import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { volunteerSchema } from '../../validation/volunteerSchema';
import { CircleX } from 'lucide-react';
import { Button, Select } from '@components';
import { FormLabel } from './FormLabel.component';
import { departmentList, batchList } from '@data';

export const VolunteerForm = ({ open, onClose, onSubmit, initialData = {}, isEdit = false, loading = false }) => {
  const fileInputRef = useRef();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      position: '',
      dob: '',
      batch: '',
      team: '',
      department: '',
    },
  });

  useEffect(() => {
    if (isEdit && initialData) {
      console.log('initial', initialData);

      const formData = {
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        position: initialData.position || '',
        image: initialData.image || '',
        dob: initialData.dob || '',
        batch: initialData.batch || '',
        team: initialData.team || '',
        department: initialData.department || '',
      };

      reset(formData);
      if (initialData.department) {
        setValue('department', initialData.department);
      }
      if (initialData.batch) {
        setValue('batch', initialData.batch);
      }
    } else {
      reset({ name: '', email: '', phone: '', position: '', image: '', dob: '', batch: '', team: '', department: '' });
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
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('position', data.position);
    formData.append('image', data.image);
    formData.append('batch', data.batch);
    formData.append('dob', data.dob);
    formData.append('team', data.team);
    formData.append('department', data.department);

    if (isEdit) {
      formData.append('_method', 'PUT');
    }

    onSubmit(formData);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="card rounded-lg shadow-lg p-8 w-full max-w-2xl relative max-h-[100vh] overflow-y-auto py-2">
        <button className="absolute top-4 right-4 text-gray-500" onClick={onClose}>
          <CircleX className="w-7 h-7 card" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">{isEdit ? 'Edit Volunteer' : 'Create Volunteer'}</h2>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="flex flex-col items-center mb-4">
            {initialData?.image && <img src={initialData?.image} alt="volunteer" className="w-28 h-28 rounded-full object-cover" />}
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
            <FormLabel error={errors.name?.message} required={true} name="name" type="text" label="Name" placeholder="Enter name" register={register} />
            <FormLabel error={errors.email?.message} required={true} name="email" type="email" label="Email" placeholder="Enter email" register={register} />
            <FormLabel error={errors.phone?.message} name="phone" type="text" label="Phone" placeholder="Enter phone" register={register} />
            <FormLabel error={errors.position?.message} required={true} name="position" type="text" label="Position" placeholder="Enter position" register={register} />
            <FormLabel error={errors.team?.message} name="team" type="text" label="Team" placeholder="Enter Team" register={register} />
            <FormLabel error={errors.dob?.message} required={true} name="dob" type="date" label="Date of Birth" register={register} />

            <Select
              label="Department"
              name="department"
              onChange={(e) => handleSelectChange('department', e.target.value)}
              options={departmentList}
              placeholder="Select Department"
              required={true}
              error={errors.department?.message}
              register={register('department')}
            />

            <Select
              label="Batch"
              name="batch"
              onChange={(e) => handleSelectChange('batch', e.target.value)}
              options={batchList}
              placeholder="Select Batch"
              required={true}
              error={errors.batch?.message}
              register={register('batch')}
            />
          </div>

          <Button disabled={loading} type="submit" name="submit" label={isEdit ? 'Update' : 'Create'} />
        </form>
      </div>
    </div>
  );
};
