export function LobbyInfo({ lobbyPin, max, current }) {
  return (
    <div className="w-full flex justify-center items-end font-bold pt-10 pb-10">
      <span className="text-7xl  text-gray-500 dark:text-gray-400 mr-5">
        {lobbyPin}
      </span>
      <span className="text-2xl">{`${current}/${max}`}</span>
    </div>
  );
}
