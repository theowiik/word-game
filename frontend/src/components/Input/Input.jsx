import { useState } from "react";

/**
 * Design for the input fields in the app.
 * @param placeholder the input hint
 * @param type what type it should be
 * @param id an id for the input field to extract info
 * @param name name for the input field to extract info
 * @param regex control for string input
 * @returns {JSX.Element}
 * @constructor
 */
export function Input({ placeholder, type, id, name, regex }) {
  const [value, setValue] = useState('');

  const handlePinInputChange = (e) => {
    if (regex == null) {
      setValue(e.target.value);
      return;
    }

    if (e.target.value === '' || regex.test(e.target.value)) {
      setValue(e.target.value);
    }
  };

  return (
    <input
      id={id}
      name={name}
      type={type ?? "text"}
      required
      className="appearance-none rounded-none rounded-lg mb-4 font-bold bg-gray-700 border-none relative block w-full px-5 py-4 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-elva-1-600 focus:border-elva-1-600 focus:z-10 sm:text-xl"
      placeholder={placeholder}
      onChange={handlePinInputChange}
      value={value}
    />
  );
}
