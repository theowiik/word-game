const names = ["Adams", "Gerdes", "Von Hacht"];

const prefix = ["Supersmart", "Wise", "Cool", "Sofisticated", "Happy", "Intelligent"];

export const getRandomName = () => {
  const randPrefix = prefix[Math.floor(Math.random() * prefix.length)];
  const randName = names[Math.floor(Math.random() * names.length)];
  return `${randPrefix}${randName}`;
};
