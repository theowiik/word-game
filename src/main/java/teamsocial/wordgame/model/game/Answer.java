package teamsocial.wordgame.model.game;

import lombok.Data;
import lombok.NoArgsConstructor;
import teamsocial.wordgame.model.PlayerManagerBean;

@Data
@NoArgsConstructor
class Answer {

  private PlayerManagerBean player;
  private String description;

  public Answer(PlayerManagerBean player, String description) {
    this.player = player;
    this.description = description;
  }
}
