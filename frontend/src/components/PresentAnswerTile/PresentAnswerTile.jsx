export function PresentAnswerTile({ answer }) {
  //const [isChosen, setChosen] = useState(false);

  return (
    <div className="pl-2 pr-4 py-2 max-w-max bg-gray-300 flex m-4 rounded-md h-16 items-center transform hover:scale-125 ">
      <span className="text-blue-900 font-bold">"{answer}"</span>
    </div>
  );
}
