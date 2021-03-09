package teamsocial.wordgame.websocket.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import teamsocial.wordgame.model.game.Player;

@Data
@AllArgsConstructor
public class GameResponse {

  private List<Player> players;
}
