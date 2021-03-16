package teamsocial.wordgame.model.game;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

/**
 * The Player of the game
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Player implements Serializable {
  private String name;
}
