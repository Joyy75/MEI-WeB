import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../../store/authStore';
import { Button, FormLabel, SnackBar } from '@components';
import { useRegisterMutation, useSnackbar } from '@hooks';
import { registerSchema } from '../../validation/registerSchema';
import Cookies from 'js-cookie';

export const Register = () => {
  const { message: snackMessage, type: snackType, trigger: snackTrigger, showSnack } = useSnackbar();

  const nav = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const mutation = useRegisterMutation();

  const onSubmit = async (data) => {
    try {
      const res = await mutation.mutateAsync(data);
      if (res?.data?.token) {
        showSnack('Registered successfully', 'success');
        const token = res.data.token;
        Cookies.set('token', token, {
          expires: 1,
          secure: true,
          sameSite: 'strict',
          path: '/',
        });

        login(token);
        nav('/admin/dashboard');
      }
    } catch (err) {
      showSnack(`Failed to register: ${err?.response?.data?.message || err?.message || err}`, 'error');
    }
  };

  return (
    <div className=" overflow-hidden flex flex-col justify-center gap-5 items-start h-screen m-auto p-5">
      <SnackBar message={snackMessage} type={snackType} trigger={snackTrigger} />

      <h1 className="text-2xl mx-auto font-medium text-center ">Merdian Education Institute</h1>
      <form onSubmit={handleSubmit(onSubmit)} className=" card border border-[var(--card)]   w-full sm:w-[50%] lg:w-[40%]   p-5 rounded-xl  mx-auto shadow-md">
        <h1 className="text-xl font-medium text-center mb-5">Create Admin Account</h1>

        <FormLabel required={true} error={errors.name?.message} register={register} name="name" type="text" label="Full Name" placeholder="John Doe" />
        <FormLabel required={true} error={errors.email?.message} register={register} name="email" type="email" label="Email" placeholder="example@mei.com" />
        <FormLabel required={true} error={errors.password?.message} register={register} name="password" type="password" label="Password" />

        <Button disabled={isSubmitting} type="submit" name="Register" label="Register" />

        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <Link to="/admin/login" className="text-cyan-700 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};


