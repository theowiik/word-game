package teamsocial.socialgame.model.entity;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import lombok.Data;

@Data
public class Game implements Serializable {

  private final static int ROUNDS = 3;
  private Category category;
  private State state;
  private int round;
  private Round currentRound;
  private String pin;
  private Set<Player> players;
  private int id;

  public Game(Category category, String pin) {
    this.category = category;
    this.pin = pin;
    state = State.PRESENT_WORD_INPUT_ANSWER;
    nextRound();
    players = new HashSet<>();
    id = getRandomNumber(1000, 9999);
  }

  private void nextRound() {
    round++;
    currentRound = new Round(category);
  }

  private int getRandomNumber(int min, int max) {
    return (int) ((Math.random() * (max - min)) + min);
  }

  /**
   * Attempts to set the answer for the player, returns wether the operation was successful.
   *
   * @param player      the player that wants to add the word.
   * @param description the description of the word.
   * @return true if the word was successfully added.
   */
  public boolean setAnswer(PlayerManager player, String description) {
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

  public void addPlayer(Player player) {
    players.add(player);
  }

  private boolean validDescription(String string) {

    // Has content
    if (string == null || string.isEmpty()) {
      return false;
    }

    // Valid length
    return string.length() > 1 && string.length() < 50;
  }

  private enum State {
    PRESENT_WORD_INPUT_ANSWER, SELECT_WORD, PRESENT_ANSWER, PRESENT_SCORE
  }
}
