package teamsocial.wordgame.websocket;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import teamsocial.wordgame.model.game.Game;
import teamsocial.wordgame.model.game.Player;
import teamsocial.wordgame.model.game.Round;

@Data
public class GameResponse {

  private List<Player> players;
  private Game.State gameState;
  private Round.State roundState;

  public GameResponse(Game game) {
    setPlayers(new ArrayList<>(game.getPlayers()));
    setGameState(game.getState());
    setRoundState(game.getCurrentRound().getState());
  }
}
