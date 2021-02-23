
package teamsocial.socialgame.model.entity;

import java.io.Serializable;
import java.util.List;
import lombok.Data;

@Data
public class Game implements Serializable {
  private Category category;
  private State state;
  private final static int ROUNDS = 3;
  private int round;
  private List<Player> players;
  private Round currentRound;
  private String pin;
  
  public Game(Category category, String pin) {
    this.category = category;
    this.pin = pin;
  }
  
  private void nextRound() {
    round++;
    currentRound = new Round(category);
  }
  
  private enum State {
    PRESENT_WORD, SELECT_WORD, PRESENT_ANSWER, PRESENT_SCORE
  }
}
