import { Mail, Phone, MapPin } from 'lucide-react';
import { Button, FormLabel, SnackBar } from '@components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '../../validation/contactSchema';
import { useContactMutation, useSnackbar } from '@hooks';

const InfoBlock = ({ icon, title, value }) => (
  <div className="flex items-start space-x-3">
    <div className="w-11 h-11 sub-card rounded-lg flex items-center justify-center">{icon}</div>
    <div>
      <p className="font-medium ">{title}</p>
      <p className=" text-opacity-50 text-sm ">{value}</p>
    </div>
  </div>
);

const FAQItem = ({ title, description }) => (
  <div className="pb-3 border-b border-b-[var(--sub-card)]">
    <p className="font-medium  text-sm">{title}</p>
    <p className="text-opacity-50  text-sm mt-1">{description}</p>
  </div>
);

const ContactHeader = () => (
  <div className="text-center mb-16">
    <h1 className="text-4xl md:text-5xl font-bold  mb-4">Contact Us</h1>
    <p className="text-lg  font-serif max-w-2xl mx-auto">Have questions about courses, admissions, or our programs? We’re here to help!</p>
  </div>
);

const ContactForm = () => {
  const { message: snackMessage, type: snackType, trigger: snackTrigger, showSnack } = useSnackbar();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(contactSchema) });

  const mutation = useContactMutation();
  const onSubmit = async (data) => {
    try {
      const res = await mutation.mutateAsync(data);
      if (res?.status) {
        showSnack('Sent Message successfully', 'success');
        reset();
      }
    } catch (err) {
      showSnack(`Failed to send message: ${err}`, 'error');
    }
  };
  return (
    <div className="lg:col-span-2">
      <SnackBar message={snackMessage} type={snackType} trigger={snackTrigger} />
      <form onSubmit={handleSubmit(onSubmit)} className="card border border-[var(--card)] p-8 rounded-2xl shadow-lg space-y-4">
        <h2 className="text-2xl font-semibold text-center mb-6">Get in Touch with Our Team</h2>

        <FormLabel register={register} name="name" type="text" label="Full Name" placeholder="" />
        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}

        <FormLabel register={register} name="email" type="email" label="Email" placeholder="mei@example.edu" />
        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}

        <div className="mb-5">
          <label htmlFor="message" className="block text-md font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            rows="4"
            className="w-full p-3  placeholder:sub-card sub-card  focus:outline-none rounded-lg focus:ring-0 "
            placeholder="Write your message here..."
            {...register('message')}
          ></textarea>
          {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
        </div>

        <Button disabled={isSubmitting} type="submit" name="submit" label="Send Message" />
      </form>
    </div>
  );
};

const ContactInfo = () => (
  <div className="p-6 rounded-2xl card   shadow-md">
    <h3 className="text-xl font-semibold  mb-6">Contact Information</h3>
    <div className="space-y-4">
      <InfoBlock icon={<Mail className="w-5 h-5 " />} title="Email" value="mei.org.mm@gmail.com" />
      <InfoBlock icon={<Phone className="w-5 h-5 " />} title="Phone" value="+95 9942256236" />
      <InfoBlock icon={<MapPin className="w-5 h-5 " />} title="Address" value="Global Education Hub, Online" />
    </div>
  </div>
);

const ContactFAQ = () => (
  <div className="p-6 rounded-2xl card   shadow-md">
    <h3 className="text-xl font-semibold mb-4">Academic Support</h3>
    <div className="space-y-4">
      <FAQItem title="Admissions Process" description="Learn about eligibility, applications, and important dates." />
      <FAQItem title="Course Recommendations" description="Need help selecting the right course? We’ve got you covered." />
    </div>
  </div>
);

export const Contact = () => (
  <div className="min-h-screen bg-gradient-to-br  py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <ContactHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <ContactForm />

        <div className="space-y-8">
          <ContactInfo />
          <ContactFAQ />
        </div>
      </div>
    </div>
  </div>
);
