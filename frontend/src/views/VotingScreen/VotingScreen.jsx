import { PresentAnswerTile } from "components";

export function VotingScreen() {
  const answers = [
    { answer: "Theo e king" },
    { answer: "Sudo e king" },
    { answer: "Jopsidop e king" },
  ];

  return (
    <div className="h-screen w-full bg-white dark:bg-gray-800 dark:text-white">
      <div className="flex flex-col align-center">
        <h1 className="text-center text-1xl font-semibold">Rappakalja</h1>
      </div>
      <div>
        <h1 className="text-center mt-14 text-6xl font-semibold">Resonabel</h1>
      </div>
      <div>
        <div className="flex justify-center mt-10">
          <div className="flex flex-wrap content-start">
            {answers.map((answer) => {
              return (
                <PresentAnswerTile answer={answer.answer}></PresentAnswerTile>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
