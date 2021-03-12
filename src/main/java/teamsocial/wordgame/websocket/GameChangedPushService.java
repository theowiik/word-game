package teamsocial.wordgame.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import teamsocial.wordgame.model.GameManagerBean;
import teamsocial.wordgame.model.game.Game;

@Service
public class GameChangedPushService implements Game.GameObserver {

  @Autowired
  private SimpMessagingTemplate simpMessagingTemplate;

  @Autowired
  private GameManagerBean gameManager;

  @Override
  public void onGameChange() {
    var game = gameManager.getGameByPin("12345");

    simpMessagingTemplate.convertAndSend(
        "/topic/messages",
        new GameResponse(game)
    );
  }
}
