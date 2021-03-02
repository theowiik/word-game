package teamsocial.socialgame.model.entity;

import lombok.Getter;

@Getter
public final class ReadOnlyPlayer {

  private String name;
  private int score;

  public ReadOnlyPlayer(String name, int score) {
    this.name = name;
    this.score = score;
  }
}
