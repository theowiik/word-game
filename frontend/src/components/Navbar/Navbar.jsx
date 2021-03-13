export function Navbar({ label, onBackClickPath }) {
  return (
    <div className='relative w-full flex justify-center items-center pt-11'>
      <h1 className='text-gray-50 text-4xl font-bold'>{label}</h1>
    </div>
  );
}
