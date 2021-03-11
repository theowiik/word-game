package teamsocial.wordgame.model.game;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import lombok.Data;
import lombok.Getter;
import teamsocial.wordgame.model.entity.Category;

@Data
public class Game implements Serializable {

  private final static int ROUNDS = 3;
  @Getter(onMethod = @__(@JsonIgnore))
  private final Set<GameObserver> observers = new HashSet<>();
  private final Category category;
  private final Set<Player> players;
  private final String pin;
  private final State state;
  private int round;
  private Round currentRound;

  /**
   * @param category the category for the game.
   * @param pin      the pin for the game. Must be 5 numbers without any whitespaces.
   */
  public Game(Category category, String pin) {
    if (!validPin(pin)) {
      throw new IllegalArgumentException("Invalid pin, must be 5 integer");
    }

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

  public void startGame() {
    currentRound.start();
  }

  public void addObserver(GameObserver go) {
    observers.add(go);
  }

  private void nextRound() {
    round++;
    currentRound = new Round(category, this::notifyObservers);
  }

  public void setExplanation(Player player, String description) {
    currentRound.setExplanation(player, description);
    notifyObservers();
  }

  public void addPlayer(Player player) {
    players.add(player);
    notifyObservers();
  }

  public void notifyObservers() {
    for (var o : observers) {
      o.onGameChange();
    }
  }

  public enum State {
    LOBBY, PLAYING, END
  }

  public interface GameObserver {

    void onGameChange();
  }
}
