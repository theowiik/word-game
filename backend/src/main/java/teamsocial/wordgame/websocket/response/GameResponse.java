package teamsocial.wordgame.websocket.response;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import teamsocial.wordgame.model.game.Game;
import teamsocial.wordgame.model.game.Player;

@Data
public class GameResponse {

  private Game.State state;
  private List<Player> players;

  public GameResponse(Game game) {
    setPlayers(new ArrayList<>(game.getPlayers()));
    setState(game.getState());
  }
}
