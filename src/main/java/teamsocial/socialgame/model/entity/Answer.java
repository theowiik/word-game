package teamsocial.socialgame.model.entity;

import lombok.Data;

@Data
public class Answer {
  private PlayerManager player;
  private String description;
  
  public Answer(PlayerManager player, String description) {
    this.player = player;
    this.description = description;
  }
}
