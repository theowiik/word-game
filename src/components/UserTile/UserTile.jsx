export function UserTile({ name, color }) {
  return (
    <div className="pl-2 pr-4 py-2 max-w-max bg-gray-200 flex items-center m-4 rounded-full ">
      <div className={`bg-${color} rounded-full h-5 w-5 mr-4`}></div>
      <span className="truncate text-gray-900 font-bold">{name}</span>
    </div>
  );
}
