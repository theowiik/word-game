/**
 * A component to display info about lobby in the Lobby view
 * @param lobbyPin the pin of the lobby
 * @param max info for max players
 * @param current info for how many current players are in the lobby
 * @returns {JSX.Element}
 * @constructor
 */

export function LobbyInfo({ lobbyPin, max, current }) {
  return (
    <div className="w-full flex justify-center items-end font-bold pt-10 pb-10">
      <span className="text-7xl text-gray-400 mr-5">
        {lobbyPin}
      </span>
      <span className="text-2xl">{`${current}/${max}`}</span>
    </div>
  );
}
