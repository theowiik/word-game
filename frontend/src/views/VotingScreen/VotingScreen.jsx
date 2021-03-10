import { PresentAnswerTile, Logo } from "components";
import { Timer } from "components/Timer/Timer";

export function VotingScreen() {
  const answers = [
    { answer: "Theo e king" },
    { answer: "Sudo e king" },
    { answer: "Jopsidop e king" },
    { answer: "Behöver ett långt svar så att dehär får bli ett långt svar" },
    { answer: "Behöver ett långt svar så att dehär får bli ett långt svar" },
  ];

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-800 dark:text-white flex flex-col items-center">
      <Logo width="250" height="80"></Logo>
      <div>
        <h1 className="text-center mt-14 text-6xl font-semibold">Resonabel</h1>
      </div>

      <div className="mt-14 w-150">
        <Timer duration={200} />
      </div>

      <div>
        <div className="flex items-center mt-10">
          <div className="grid grid-cols-3">
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
