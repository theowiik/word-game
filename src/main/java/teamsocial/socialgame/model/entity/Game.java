package teamsocial.socialgame.model.entity;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import lombok.Data;

@Data
public class Game implements Serializable {
  
  private Category category;
  private State state;
  private final static int ROUNDS = 3;
  private int round;
  private Set<Player> players;
  private Round currentRound;
  private String pin;
  
  public Game(Category category, String pin) {
    players = new HashSet<Player>();
    this.category = category;
    this.pin = pin;
    state = State.PRESENT_WORD_INPUT_ANSWER;
    nextRound();
  }
  
  private void nextRound() {
    round++;
    currentRound = new Round(category);
  }

  /**
   * Attempts to set the answer for the player, returns wether the operation was
   * successful.
   *
   * @param player the player that wants to add the word.
   * @param description the description of the word.
   * @return true if the word was successfully added.
   */
  public boolean setAnswer(Player player, String description) {
    if (player == null || !validDescription(description)) {
      return false;
    }
    
    if (state == State.PRESENT_WORD_INPUT_ANSWER) {
      currentRound.setAnswer(player, description);
      return true;
    } else {
      return false;
    }
  }
  
  public void addPlayer(Player player, String name) {
    player.setName(name);
    players.add(player);
  }
  
  private enum State {
    PRESENT_WORD_INPUT_ANSWER, SELECT_WORD, PRESENT_ANSWER, PRESENT_SCORE
  }
  
  private boolean validDescription(String string) {

    // Has content
    if (string == null || string.isEmpty() || string.isBlank()) {
      return false;
    }

    // Valid length
    if (string.length() <= 1 || string.length() >= 50) {
      return false;
    }
    
    return true;
  }
}
