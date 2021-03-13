package teamsocial.wordgame.model.game;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import teamsocial.wordgame.model.entity.Category;

@Getter
@Setter
public class Game implements Serializable, Round.RoundFinishedListeners {

  @Getter(onMethod = @__(@JsonIgnore))
  private final Set<GameObserver> observers;
  private final static int ROUNDS = 2;
  @Getter(onMethod = @__(@JsonIgnore))
  private final Set<Player> players;
  private final Category category;
  private final String pin;
  @Setter(AccessLevel.PRIVATE)
  private boolean started;
  @Getter(onMethod = @__(@JsonIgnore))
  private List<Round> rounds;
  private State state;
  private int round;

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

  public Map<Player, Integer> getPlayerScores() {
    Map<Player, Integer> scores = new HashMap<>();
    for (var player : this.players) {
      scores.put(player, 0);
    }

    for (var round : this.rounds) {
      for (var player : round.correctPlayers()) {
        scores.put(player, scores.get(player) + 1);
      }
    }

    return scores;
  }

  public void startGame() {
    if (!started) {
      state = State.PLAYING;
      setStarted(true);
      getCurrentRound().start();
    }
  }

  public void addGameChangedObserver(GameObserver go) {
    observers.add(go);
  }

  public Round getCurrentRound() {
    return rounds.get(round - 1);
  }

  /**
   * Inits and creates a new round. Does not start the round.
   */
  private void nextRound() {
    rounds.add(new Round(category, this::notifyGameChangedObservers));
    round++;
    getCurrentRound().addRoundFinishedListener(this);
  }

  public void addPlayerExplanation(Player player, String explanation) {
    getCurrentRound().addPlayerExplanation(player, explanation);
    notifyGameChangedObservers();
  }

  public void pickExplanation(Player player, String explanation) {
    getCurrentRound().pickExplanation(player, explanation);
  }

  public void addPlayer(Player player) {
    players.add(player);
    notifyGameChangedObservers();
  }

  public void notifyGameChangedObservers() {
    for (var o : observers) {
      o.notifyGameChanged(this);
    }
  }

  @Override
  public void notifyRoundFinished() {
    if (round >= ROUNDS) {
      state = State.END;
      notifyGameChangedObservers();
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
    return  players.contains(player);
  }

  public enum State {
    LOBBY, PLAYING, END
  }

  public interface GameObserver {

    void notifyGameChanged(Game game);
  }
}
