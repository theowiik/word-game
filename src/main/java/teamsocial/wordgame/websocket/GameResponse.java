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
    selectedExplanations = generateSelectedExplanations(game, state);
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

  /**
   * Creates a list of the selected explanation responses. Is empty if the state is not
   * PRESENT_ANSWER.
   *
   * @param game  the game.
   * @param state the state of the game.
   * @return a list of the selected explanation responses.
   */
  private List<SelectedExplanationResponse> generateSelectedExplanations(Game game, State state) {
    var output = new ArrayList<SelectedExplanationResponse>();
    var selectedExplanations = game.getCurrentRound().getSelectedExplanations();
    var playerExplanations = game.getCurrentRound().getExplanations();

    if (state != State.PRESENT_ANSWER) {
      return output;
    }

    // Add all explanations with empty player lists
    playerExplanations.forEach((player, explanation) -> {
      var selectedExplanation = new SelectedExplanationResponse(
        new ArrayList<>(),
        explanation,
        player,
        game.getCurrentRound().isCorrect(explanation)
      );

      output.add(selectedExplanation);
    });

    // Add correct explanation
    output.add(
      new SelectedExplanationResponse(
        new ArrayList<>(),
        game.getCurrentRound().getCorrectExplanation(),
        null,
        true
      )
    );

    // Add players who chose each explanation
    selectedExplanations.forEach((player, chosenExplanation) -> {
      for (var response : output) {
        if (response.getExplanation().equals(chosenExplanation)) {
          response.getPlayers().add(player);
        }
      }
    });

    return output;
  }
}
