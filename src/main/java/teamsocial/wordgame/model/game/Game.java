package teamsocial.wordgame.model.game;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.*;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import teamsocial.wordgame.model.entity.Category;

@Data
public class Game implements Serializable, Round.RoundFinishedListeners {

  private final static int ROUNDS = 2;
  @Getter(onMethod = @__(@JsonIgnore))
  private final Set<GameObserver> observers;
  private final Category category;
  private final Set<Player> players;
  private final String pin;
  private State state;
  private int round;
  private List<Round> rounds;
  @Setter(AccessLevel.PRIVATE)
  private boolean started;

  /**
   * @param category the category for the game.
   * @param pin      the pin for the game. Must be 5 numbers without any whitespaces.
   */
  public Game(Category category, String pin) {
    if (!validPin(pin)) {
      throw new IllegalArgumentException("Invalid pin, must be 5 integer");
    }

    observers = new HashSet<>();
    this.category = category;
    state = State.LOBBY;
    nextRound();
    players = new HashSet<>();
    this.pin = pin;
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

  public Map<Player, Integer> getPlayerScores(){
    Map<Player, Integer> scores = new HashMap<>();
    for(Player player : this.players){
      scores.put(player, 0);
    }
    for(Round round : this.rounds){
      for(Player player : round.correctPlayers()) {
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
    return rounds.get(round);
  }

  /**
   * Inits and creates a new round. Does not start the round.
   */
  private void nextRound() {
    System.out.println("creating a new round");
    rounds.add(new Round(category, this::notifyGameChangedObservers));
    round++;
    getCurrentRound().addRoundFinishedListener(this);
  }

  public void setExplanation(Player player, String description) {
    getCurrentRound().setExplanation(player, description);
    notifyGameChangedObservers();
  }

  public void addPlayer(Player player) {
    players.add(player);
    notifyGameChangedObservers();
  }

  public void notifyGameChangedObservers() {
    for (var o : observers) {
      o.onGameChange();
    }
  }

  @Override
  public void roundChanged() {
    if (round >= ROUNDS) {
      System.out.println("finished all rounds");
      state = State.END;
      notifyGameChangedObservers();
    } else {
      System.out.println("ayy");
      nextRound();
      getCurrentRound().start();
    }
  }

  public enum State {
    LOBBY, PLAYING, END
  }

  public interface GameObserver {

    void onGameChange();
  }
}
