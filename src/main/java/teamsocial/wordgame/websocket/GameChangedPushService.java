package teamsocial.wordgame.websocket;

import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import teamsocial.wordgame.model.GameManagerBean;
import teamsocial.wordgame.model.game.Game;
import teamsocial.wordgame.model.game.Game.GameChangedObserver;

@Service
public class GameChangedPushService implements GameChangedObserver {

  @Autowired
  private SimpMessagingTemplate simpMessagingTemplate;

  @Autowired
  private GameManagerBean gameManager;

  @PostConstruct
  private void init() {
    gameManager.setPushService(this);
  }

  @Override
  public void notifyGameChanged(Game game) {
    var pin = game.getPin();
    simpMessagingTemplate.convertAndSend("/topic/messages/" + pin, new GameResponse(game));
  }
}
