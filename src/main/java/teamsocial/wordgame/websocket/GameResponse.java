package teamsocial.wordgame.websocket;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
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
  private List<String> explanations;
  private List<PlayerResponse> players;
  private List<SelectedExplanationResponse> selectedExplanations;

  public GameResponse(Game game) {
    // Word
    word = game.getCurrentWord();

    // State
    state = getResponseState(game);

    // CurrentStateEndTime
    var round = game.getCurrentRound();
    var roundState = round.getState();

    if (roundState != null) {
      currentStateEndTime = round.getCurrentStateEndTime();
    } else {
      currentStateEndTime = null;
    }

    // Players
    players = new ArrayList<>();
    for (var entity : game.getPlayerScores().entrySet()) {
      players.add(new PlayerResponse(entity.getKey().getName(), entity.getValue()));
    }

    // Explanations
    explanations = new ArrayList<>();
    if (state == State.SELECT_EXPLANATION) {
      explanations = game.getCurrentRound().getAllExplanations();
    }

    // SelectedExplanations
    selectedExplanations = new ArrayList<>();
    if (state == State.PRESENT_ANSWER) {
      System.out.println("hi!");
      var map = game.getCurrentRound().getSelectedExplanations();
      for (var entry : inverse(map).entrySet()) {
        var selectedExplanation = new SelectedExplanationResponse(
          entry.getValue(),
          entry.getKey(),
          game.getCurrentRound().whoWrote(entry.getKey()),
          game.getCurrentRound().isCorrect(entry.getKey())
        );
        selectedExplanations.add(selectedExplanation);
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

  @Getter
  @Setter
  @AllArgsConstructor
  private class SelectedExplanationResponse {

    private final List<Player> players;
    private final String explanation;
    private final Player by;
    private final boolean correct;
  }

  @Getter
  @Setter
  private class PlayerResponse {

    private final String name;
    private final int score;

    public PlayerResponse(String name, int score) {
      this.name = name;
      this.score = score;
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
