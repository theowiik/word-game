package teamsocial.socialgame.model.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Answer {

  private PlayerManager player;
  private String description;

  public Answer(PlayerManager player, String description) {
    this.player = player;
    this.description = description;
  }
}
