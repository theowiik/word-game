package teamsocial.wordgame.websocket;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import teamsocial.wordgame.model.game.Game;
import teamsocial.wordgame.model.game.Player;

@Data
public class GameResponse {

  private enum State {
    LOBBY,
    PRESENT_WORD_INPUT_EXPLANATION,
    SELECT_EXPLANATION,
    PRESENT_ANSWER,
    PRESENT_SCORE,
    END
  }

  private List<Player> players;
  private State state;

  public GameResponse(Game game) {
    setPlayers(new ArrayList<>(game.getPlayers()));
    state = getResponseState(game);
  }

  private State getResponseState(Game game) {
    var output = State.LOBBY;
    var gameIsActive = game.getState() != Game.State.PLAYING;

    if (gameIsActive) {
      switch (game.getState()) {
        case LOBBY -> output = State.LOBBY;
        case END -> output = State.END;
      }
    } else {
      switch (game.getCurrentRound().getState()) {
        case PRESENT_SCORE -> output = State.PRESENT_SCORE;
        case PRESENT_ANSWER -> output = State.PRESENT_ANSWER;
        case PRESENT_WORD_INPUT_EXPLANATION -> output = State.PRESENT_WORD_INPUT_EXPLANATION;
        case SELECT_EXPLANATION -> output = State.SELECT_EXPLANATION;
      }
    }

    return output;
  }
}
