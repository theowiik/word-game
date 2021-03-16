/**
 * The tile to display users in Lobby view as well as on the side of every round page
 * @param name name of the user
 * @param color the color to indicate the user
 * @param isCurrentUser a check ot see if you are the user, to then change it to indicate that you are that person
 * @returns {JSX.Element}
 * @constructor
 */
export function UserTile({ name, color, isCurrentUser }) {
  return (
    <div
      className={`pl-2 pr-4 py-2 max-w-max  min-w-max ${
        isCurrentUser ? 'bg-indigo-200' : 'bg-gray-200'
      } flex items-center m-4 rounded-full `}
    >
      <div className={`${color} rounded-full h-5 w-5 mr-4`}></div>
      <span className="truncate text-gray-900 font-bold">{`${
        isCurrentUser ? 'Me the' : ''
      } ${name}`}</span>
    </div>
  );
}
