export const Select = ({ label, name, onChange, options, placeholder = 'Select an option', required = false, error = null, className = '', register }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        onChange={onChange}
        required={required}
        className="sub-card px-4 placeholder:sub-card focus:outline-none focus:ring-0 w-full p-2 rounded-lg mb-0 focus:border-0"
        {...register}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => {
          const idOrValue = option.id != null ? option.id : option.value;
          return (
            <option key={idOrValue} value={idOrValue}>
              {option.name || option.value}
            </option>
          );
        })}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
