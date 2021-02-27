import Axios from "axios";

export const gameExists = async (pin) => {
  try {
    const res = await Axios.get(
      `http://localhost:8080/socialgame/ws/games/${pin}`
    );
    console.log("res: ----------------------------------------")
    console.log(res);
    console.log("GAME EXISTS!!")
    return true;
  } catch (err) {
    console.log("GAME DOES NOT EXIST")
    return false;
  }
};
