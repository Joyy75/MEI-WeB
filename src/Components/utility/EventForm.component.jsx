import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventSchema } from '../../validation/eventSchema';
import { CircleX } from 'lucide-react';
import { Button, FormLabel } from '@components';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const EventForm = ({ open, onClose, onSubmit, initialData = {}, isEdit = false, loading = false }) => {
  const fileInputRef = useRef();
  const [images, setImages] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      description: '',
      start_date: '',
    },
  });

  useEffect(() => {
    if (isEdit && initialData) {
      console.log('intital', initialData);
      const formData = {
        title: initialData.title || '',
        description: initialData.description || '',
        start_date: initialData.start_date || '',
      };

      reset(formData);
    } else {
      reset({
        title: '',
        description: '',
        start_date: '',
      });
    }
  }, [isEdit, initialData, open, reset, setValue]);

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      setImages((prev) => [...prev, ...files]);
    }
  };

  const onFormSubmit = (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('start_date', data.start_date);

    images.forEach((file) => {
      formData.append('images[]', file);
    });

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
        <h2 className="text-2xl font-bold mb-6 text-center">{isEdit ? 'Edit Event' : 'Create Event'}</h2>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="flex flex-col items-center mb-4">
            <div className='flex items-center justify-center'>
              {initialData?.images?.map((img, idx) => (
                <img key={idx} src={img?.image_path} alt="event" className="w-28 h-28 rounded-lg object-cover mr-2" />
              ))}
            </div>

            <input
              type="file"
              name="images"
              multiple
              ref={fileInputRef}
              onChange={handleImagesChange}
              className="block w-full text-sm file:sub-card file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold"
            />
            {errors.images && <p className="text-xs text-red-500 mt-1">{errors.images.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormLabel error={errors.title?.message} required={true} name="title" type="text" label="Title" placeholder="Enter event title" register={register} />
            <FormLabel error={errors.start_date?.message} required={true} name="start_date" type="date" label="Event Date" register={register} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-10">Description</label>
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
