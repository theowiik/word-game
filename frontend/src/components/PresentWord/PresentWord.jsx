import { Button, UserTile, Timer } from 'components';
import React, { useState } from 'react';

export const PresentWord = () => {
  const [word, setWord] = useState('DEFAULTWORD');

  const [hasPosted, setHasPosted] = useState(false);

  const players = [
    { name: 'Jesper', color: 'peach' },
    { name: 'Hentoo', color: 'beach' },
    { name: 'Sudo', color: 'grass' },
    { name: 'Theo', color: 'ocean' },
    { name: 'Jesper', color: 'peach' },
    { name: 'Hentoo', color: 'beach' },
    { name: 'Sudo', color: 'grass' },
    { name: 'Theo', color: 'ocean' },
  ];

  function onMessageReceived(event) {
    console.log('Present word got a message');

    //Update player status from msg

    let eventPayload;
    try {
      console.log('Attempting to parse: ');
      console.log(event.data);
      eventPayload = JSON.parse(event.data.players);
    } catch (error) {
      console.log('Could not parse JSON');
    }
    console.log(eventPayload);
  }

  function getRandomWord() {
    const words = [
      'February',
      'May',
      'pneumonoultramicroscopicsilicovolcanoconiosis',
    ];

    const random = Math.floor(Math.random() * words.length);
    return words[random];
  }

  const changeWord = () => {
    setWord(getRandomWord().toUpperCase());
  };

  const handleAnswerSubmit = (event) => {
    event.preventDefault();
    console.log('Post ' + event.target.answer.value + ' to Server');
    //postAnswer(answer);
  };
  return (
    
      <div className="h-full flex flex-col sm:flex-row">
     
        {/* WORD */}
        <div className="h-screen w-full px-5 sm:px-20">
          <h1
            className="text-5xl sm:text-7xl lg:text-8xl font-bold text-center justify-center mb-10 "
            onClick={changeWord}
          >
            {word}
          </h1>{' '}
          <Timer duration={200} />
          {!hasPosted ? (
            <form
              onSubmit={handleAnswerSubmit}
              className="flex flex-col w-full"
            >
              <textarea
                name="answer"
                className="p-5 rounded-lg text-white dark:bg-gray-600  border-none h-72 my-10"
                placeholder="Write your explanation.."
              ></textarea>

              <Button primary label="Submit your answer" />
            </form>
          ) : (
            <div className="w-full p-10 rounded-lg bg-gray-600 text-center text-bold">
              Your answer is submitted
            </div>
          )}
        </div>
      </div>
  
  );
};
