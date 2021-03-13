package teamsocial.wordgame.websocket;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;
import teamsocial.wordgame.model.game.Game;
import teamsocial.wordgame.model.game.Player;

@Getter
@Setter
public class GameResponse {

  private String word;
  private State state;
  private Long currentStateEndTime;
  private List<Player> players;
  private String correctAnswer;
  private List<String> explanations;
  private List<PickedAnswerResponse> pickedAnswers;

  public GameResponse(Game game) {
    // Word
    word = game.getCurrentRound().getWord().getWord();

    // State
    state = getResponseState(game);

    // CurrentStateEndTime
    var round = game.getCurrentRound();
    var roundState = round.getState();

    if (roundState != null) {
      long roundSectionDurationSeconds = round.getState().getDurationSeconds();
      currentStateEndTime = round.getCurrentStateStartedAt() + roundSectionDurationSeconds * 1000;
    } else {
      currentStateEndTime = null;
    }

    // Players
    setPlayers(new ArrayList<>(game.getPlayers()));

    // CorrectAnswer
    var shouldShowAnswer = state == State.PRESENT_ANSWER;
    correctAnswer = shouldShowAnswer
      ? game.getCurrentRound().getWord().getDescription() : "Naughty naughty trying to cheat ;)";

    // Explanations
    game.getCurrentRound().getExplanations().forEach((key, value) -> explanations.add(value));

    // PickedAnswers
    pickedAnswers = new ArrayList<>();
    if (state == State.PRESENT_ANSWER) {
      var map = game.getCurrentRound().getChosenExplanations();
      for (var entry : inverse(map).entrySet()) {
        var pickedAnswer = new PickedAnswerResponse(entry.getValue(), entry.getKey());
        pickedAnswers.add(pickedAnswer);
      }
    }
  }

  /**
   * Turns a map like: {"key1": "my_value", "key2": "my_value"} to {"my_value": ["key1", "key2"]}
   *
   * @param map the map to "inverse".
   * @return the "inversed" map.
   */
  private Map<String, List<Player>> inverse(Map<Player, String> map) {
    var inverseMap = new HashMap<String, List<Player>>();

    map.forEach((player, explanation) -> {
      if (!inverseMap.containsKey(explanation)) {
        inverseMap.put(explanation, new ArrayList<>());
      }

      inverseMap.get(explanation).add(player);
    });

    return inverseMap;
  }

  private final class PickedAnswerResponse {

    private final List<Player> players;
    private final String explanation;

    public PickedAnswerResponse(List<Player> players, String explanation) {
      this.players = players;
      this.explanation = explanation;
    }
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
