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

  @Getter(onMethod = @__(@JsonIgnore))
  private final Set<GameObserver> observers = new HashSet<>();
  private final static int ROUNDS = 3;
  private final Category category;
  private final Set<Player> players;
  private final String pin;
  private final State state;
  private int round;
  private Round currentRound;

  public Game(Category category, String pin) {
    this.category = category;
    state = State.LOBBY;
    nextRound();
    players = new HashSet<>();
    this.pin = pin;
  }

  public void startGame() {
  }

  public void observe(GameObserver go) {
    observers.add(go);
  }

  public void stopObserving(GameObserver go) {
    observers.remove(go);
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
    for (GameObserver o : observers) {
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
