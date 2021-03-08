export function Input({ placeholder, type, id, name }) {
  return (
    <input
      id={id}
      name={name}
      type={type ?? "text"}
      required
      className="appearance-none rounded-none rounded-lg mb-4 font-bold bg-gray-50 dark:bg-gray-700 border-none relative block w-full px-5 py-4 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-elva-1-600 focus:border-elva-1-600 focus:z-10 sm:text-xl"
      placeholder={placeholder}
    />
  );
}
