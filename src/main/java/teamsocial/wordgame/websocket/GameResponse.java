package teamsocial.wordgame.websocket;

import lombok.Data;
import teamsocial.wordgame.model.game.Game;
import teamsocial.wordgame.model.game.Player;

import java.util.ArrayList;
import java.util.List;

@Data
public class GameResponse {

  private List<Player> players;
  private State state;
  private String word;
  private String correctAnswer;
  public GameResponse(Game game) {
    setPlayers(new ArrayList<>(game.getPlayers()));
    state = getResponseState(game);
    word = game.getCurrentRound().getWord().getWord();
    var description = "Hidden";
    if (state == State.PRESENT_ANSWER) {
      description = game.getCurrentRound().getWord().getDescription();
    }
    correctAnswer = description;

  }

  private State getResponseState(Game game) {
    var output = State.LOBBY;
    var gameIsActive = game.getState() == Game.State.PLAYING;

    if (gameIsActive) {
      switch (game.getCurrentRound().getState()) {
        case PRESENT_SCORE -> output = State.PRESENT_SCORE;
        case PRESENT_ANSWER -> output = State.PRESENT_ANSWER;
        case PRESENT_WORD_INPUT_EXPLANATION -> output = State.PRESENT_WORD_INPUT_EXPLANATION;
        case SELECT_EXPLANATION -> output = State.SELECT_EXPLANATION;
      }
    } else {
      switch (game.getState()) {
        case LOBBY -> output = State.LOBBY;
        case END -> output = State.END;
      }
    }

    return output;
  }

  private enum State {
    LOBBY,
    PRESENT_WORD_INPUT_EXPLANATION,
    SELECT_EXPLANATION,
    PRESENT_ANSWER,
    PRESENT_SCORE,
    END
  }
}
