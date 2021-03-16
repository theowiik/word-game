package teamsocial.wordgame.model.game;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import teamsocial.wordgame.model.entity.Category;

import java.io.Serializable;
import java.util.*;

@Getter
@Setter
public class Game implements Serializable, Round.RoundFinishedListeners {

  private final static int ROUNDS = 5; //How many rounds each game should contain
  @Getter(onMethod = @__(@JsonIgnore))
  private final Set<GameObserver> observers;
  private final Set<GameFinishedListeners> gameFinishedListeners;
  @Getter(onMethod = @__(@JsonIgnore))
  private final Set<Player> players;
  private final Category category;
  private final String pin;
  @Setter(AccessLevel.PRIVATE)
  private boolean started;
  @Getter(onMethod = @__(@JsonIgnore))
  private List<Round> rounds;
  private State state;
  private int activeRoundIndex;

  /**
   * @param category the category for the game.
   * @param pin      the pin for the game. Must be 5 numbers without any whitespaces.
   */
  public Game(Category category, String pin) {
    if (!validPin(pin)) {
      throw new IllegalArgumentException("Invalid pin, must be 5 integer");
    }

    rounds = new ArrayList<>();
    observers = new HashSet<>();
    gameFinishedListeners = new HashSet<>();
    this.category = category;
    state = State.LOBBY;
    players = new HashSet<>();
    this.pin = pin;
    nextRound();
  }

  /**
   * Checks whether the pin is five numbers without any whitespaces.
   *
   * @param pin the pin to check.
   * @return true if it matches.
   */
  private boolean validPin(String pin) {
    if (pin == null || pin.isEmpty()) {
      return false;
    }

    var regexString = "[\\d]{5}";
    return pin.matches(regexString);
  }

  /**
   * Creates a HashMap and populate it with the scores from all played rounds
   *
   * @return The scores for each player so far in the game as HashMap<Player, Integer>
   */
  public Map<Player, Integer> getPlayerScores() {
    Map<Player, Integer> scores = new HashMap<>();
    for (var player : this.players) {
      scores.put(player, 0);
    }
    for (var round : this.rounds) {
      for (var player : round.correctPlayers()) {
        scores.put(player, scores.get(player) + 20);
      }
      round.getExplanations().forEach((player, explanation) -> {
        var nFooled = round.countWhoManyChosed(player, explanation);
        scores.put(player, scores.get(player) + (nFooled * 10));
      });
    }

    return scores;
  }

  /**
   * Starts the game and put it in PLAYING state.
   * Starts the first round of the game.
   */
  public void startGame() {
    if (!started) {
      state = State.PLAYING;
      setStarted(true);
      getCurrentRound().start();
    }
  }

  /**
   * Add a GameObserver to the list of observers
   *
   * @param go an object that implements GameObserver
   */
  public void addGameChangedObserver(GameObserver go) {
    observers.add(go);
  }

  /**
   * Add a GameFinishedListener to listeners of the game
   *
   * @param gfl an object that implements GameFinishedListener
   */
  public void addGameFinishedListener(GameFinishedListeners gfl) {
    gameFinishedListeners.add(gfl);
  }

  /**
   * Returns the round that is currently active
   *
   * @return The active Round of the game
   */
  public Round getCurrentRound() {
    return rounds.get(activeRoundIndex - 1);
  }

  /**
   * Inits and creates a new round. Does not start the round.
   */
  private void nextRound() {
    rounds.add(new Round(category, this::notifyGameChangedObservers));
    activeRoundIndex++;
    getCurrentRound().addRoundFinishedListener(this);
  }

  /**
   * Add an explanation to the list of explanation for the current word in the current round.
   *
   * @param player the player that submits an explanation
   * @param explanation the explanation submitted
   */
  public void addExplanation(Player player, String explanation) {
    getCurrentRound().addPlayerExplanation(player, explanation);
    notifyGameChangedObservers();
  }

  /**
   *  Select explanation for a player in current round.
   *
   * @param player the player that selects an explanation
   * @param explanation the explanation selected
   */
  public void selectExplanation(Player player, String explanation) {
    getCurrentRound().selectExplanation(player, explanation);
  }

  /**
   * Add a player to the game and notify game changes
   *
   * @param player the player that has joined the game
   */
  public void addPlayer(Player player) {
    players.add(player);
    notifyGameChangedObservers();
  }

  /**
   * Notify all observers that something has changed in the game.
   */
  public void notifyGameChangedObservers() {
    for (var o : observers) {
      o.notifyGameChanged(this);
    }
  }

  /**
   * Notify all listeners that the game has ended.
   */
  public void notifyGameFinishedListeners() {
    for (var l : gameFinishedListeners) {
      l.notifyGameFinished(pin);
    }
  }

  /**
   * If its not the last round call for a new round to start.
   * If it is the last round, put the game to state END and notify observers and listeners
   */
  @Override
  public void notifyRoundFinished() {
    if (activeRoundIndex >= ROUNDS) {
      state = State.END;
      notifyGameChangedObservers();
      notifyGameFinishedListeners();
    } else {
      nextRound();
      getCurrentRound().start();
    }
  }

  /**
   * Checks whether the player has joined the game.
   *
   * @param player the player to check.
   * @return true if the player has joined the game.
   */
  public boolean playerIsJoined(Player player) {
    if (player == null) return false;
    return players.contains(player);
  }

  /**
   * Gets the word for the current round
   * @return current word of type Word
   */
  public String getCurrentWord() {
    return getCurrentRound().getCurrentWord();
  }

  /**
   * Enum holding the different states of a game
   */
  public enum State {
    LOBBY, PLAYING, END
  }

  /**
   * Interface for game changed observers to implement
   */
  public interface GameObserver {

    /**
     * Apply logic for when game has changed
     *
     * @param game the game that has changed
     */
    void notifyGameChanged(Game game);
  }

  /**
   * Interface for game finished listeners to implement
   */
  public interface GameFinishedListeners {
    /**
     * Apply logic for when game has finished
     * @param pin the pin for the game that has finished
     */
    void notifyGameFinished(String pin);
  }
}
