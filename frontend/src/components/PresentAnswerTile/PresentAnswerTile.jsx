export function PresentAnswerTile({ answer }) {
  return (
    <div className="pl-2 pr-4 py-2 max-w-max bg-gray-300 flex m-4 rounded-md ">
      <span className="text-gray-700 font-bold">"{answer}"</span>
    </div>
  );
}
