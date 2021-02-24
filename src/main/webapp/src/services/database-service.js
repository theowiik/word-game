
export const gameExists = async (pin) => {
    try {
      const res = await Axios.get(
        `http://localhost:8080/socialgame/ws/games/${pin}`
      );
      return true;
    } catch (err) {
      return false;
    }
  };