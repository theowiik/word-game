import { PresentAnswerTile } from "components";

export function VotingScreen() {
  return (
    <div className="h-screen w-full bg-white dark:bg-gray-800 dark:text-white">
      <div className="flex flex-col align-center">
        <h1 className="text-center text-1xl font-semibold">Rappakalja</h1>
      </div>
      <div>
        <h1 className="text-center mt-14 text-4xl font-semibold">Resonabel</h1>
      </div>
      <div>
        <PresentAnswerTile answer="Hej hej hej hej hej"></PresentAnswerTile>
      </div>
    </div>
  );
}
