import Axios from "axios";

export const gameExists = async (pin) => {
  try {
    const res = await Axios.get(
      `/ws/games/${pin}`
    );
    return true;
  } catch (err) {
    return false;
  }
};
