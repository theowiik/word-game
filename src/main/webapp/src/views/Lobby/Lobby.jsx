import { Button, Container, LobbyInfo, UserTile, Navbar } from "components";
import { Link } from "react-router-dom";

export function Lobby() {
  const lobbyPin = "123456";
  const max = 10;

  const users = [
    { name: "Jesper", color: "peach" },
    { name: "Hentoo", color: "beach" },
    { name: "Sudo", color: "grass" },
    { name: "Theo", color: "ocean" },
    { name: "Jesper", color: "peach" },
    { name: "Hentoo", color: "beach" },
    { name: "Sudo", color: "grass" },
    { name: "Theo", color: "ocean" },
  ];
  const current = users.length;

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-800 dark:text-white">
    <Navbar label='Lobby' onBackClickPath='/' />
      <Container>
      
        <LobbyInfo lobbyPin={lobbyPin} max={max} current={current} />

        <div className="flex flex-wrap">
          {users.map((user) => {
            return <UserTile name={user.name} color={user.color} />;
          })}
        </div>

        <div className="fixed bottom-0 left-0 right-0 w-full flex justify-center mb-16 sm:mb-20 md:mb-32">
          <Link to="/present-word">
            <Button label="Start game" primary />
          </Link>
        </div>
      </Container>
    </div>
  );
}
