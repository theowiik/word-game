package teamsocial.socialgame.model.entity;

import lombok.Data;

@Data
public class Answer {
  private Player player;
  private String description;
  
  public Answer(Player player, String description) {
    this.player = player;
    this.description = description;
  }
}
