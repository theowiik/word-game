const names = ["Koala", "Mouse", "Frasse", "Cat", "Alligator", "Unicorn", "Corgi", "Tiger", "Alpaca", "Dolphin", "Shark", "Chalmerist", "Badger", "Fox", "Crab", "Hentoo", "Elephant", "Seal", "Lion", "Pig", "Wasp", "Penguin", "Cobra", "Moose", "Eel", "Pug", "Puma", "Squirrel", "Panda", "Raccon", "Turtle", "Spider", "Monkey", "Kitten", "Rat", "Horse", "Lizard", "Goose", "Frog", "Giraffe", "Ostrich", "Snail"];

const prefix = ["Supersmart", "Wise", "Cool", "Sofisticated", "Happy", "Intelligent", "Great", "Silly", "Confused", "Fast", "King", "Queen"];

export const getRandomName = () => {
  const randPrefix = prefix[Math.floor(Math.random() * prefix.length)];
  const randName = names[Math.floor(Math.random() * names.length)];
  return `${randPrefix} ${randName}`;
};
