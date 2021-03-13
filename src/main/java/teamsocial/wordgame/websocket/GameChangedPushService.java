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
  public void onGameChange(Game game) {
    var pin = game.getPin();
    simpMessagingTemplate.convertAndSend("/topic/messages/" + pin, new GameResponse(game));
  }
}
