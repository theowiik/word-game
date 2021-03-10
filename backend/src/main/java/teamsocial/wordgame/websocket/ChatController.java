package teamsocial.wordgame.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import teamsocial.wordgame.model.GameManagerBean;
import teamsocial.wordgame.model.game.Game;
import teamsocial.wordgame.websocket.response.GameResponse;

@Controller
public class ChatController implements Game.GameObserver {

  @Autowired
  private GameManagerBean gameManager;

  @MessageMapping("/chat")
  @SendTo("/topic/messages")
  public GameResponse send(Message message) {
    var game = gameManager.getGame("12345");
    var response = new GameResponse(game);
    return response;
  }

  @Override
  public void onGameChange() {

  }
}
