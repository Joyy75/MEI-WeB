export const FormLabel = ({ name, type, label, placeholder = '', register, required = false, error = null }) => {
  return (
    <div className="w-full space-y-3 mb-4">
      <label className="mt-4 xs:text-sm text-md tracking-wide" htmlFor={name}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        className="sub-card  placeholder:sub-card focus:outline-none focus:ring-0 w-full  p-2 rounded-lg mb-0 focus:border-0"
        type={type}
        id={name}
        placeholder={placeholder}
        {...register(name)}
      />

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
