package teamsocial.socialgame.model.entity;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.enterprise.context.ApplicationScoped;
import javax.json.bind.annotation.JsonbTransient;
import lombok.Data;
import lombok.Getter;

@Data
@ApplicationScoped
public class Game implements Serializable {

  private Category category;
  private State state;
  private final static int ROUNDS = 3;
  private int round;
  @Getter(onMethod = @__(
          @JsonbTransient))
  private Set<Player> playerSessions;
  private Round currentRound;
  private String pin;
  private Set<ReadOnlyPlayer> players;
  private int id;

  public Game(Category category, String pin) {
    playerSessions = new HashSet<Player>();
    this.category = category;
    this.pin = pin;
    state = State.PRESENT_WORD_INPUT_ANSWER;
    nextRound();
    id = getRandomNumber(1000, 9999);
  }

  public Set<ReadOnlyPlayer> getPlayers() {
    Set<ReadOnlyPlayer> p = new HashSet<>();
    System.out.println("-------------START--------------");
    System.out.println("Game contains " + playerSessions.size() + " players.");
    for (Player player : playerSessions) {
      System.out.println("-new-");
      System.out.println("Found player: " + player.getName());
      p.add(new ReadOnlyPlayer(player.getName(), player.getScore()));
    }
    return p;
  }

  private void setPlayers(Set<ReadOnlyPlayer> readOnlyPlayers) {
  }

  private void nextRound() {
    round++;
    currentRound = new Round(category);
  }
  
  private int getRandomNumber(int min, int max) {
    return (int) ((Math.random() * (max - min)) + min);
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
    System.out.println("ait im bout to change the player name");
    String oldName = player.getName();

    player.setName(name);
    String newName = player.getName();
    System.out.println(oldName + " -> " + newName);

    playerSessions.add(player);
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
