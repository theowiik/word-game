package teamsocial.wordgame.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.context.WebApplicationContext;
import teamsocial.wordgame.model.GameManagerBean;
import teamsocial.wordgame.model.PlayerManagerBean;
import teamsocial.wordgame.websocket.response.GameResponse;

@Controller
public class ChatController {

  @Autowired
  private GameManagerBean gameManager;

  @MessageMapping("/chat")
  @SendTo("/topic/messages")
  public GameResponse send(Message message) {
    var game = gameManager.getGame("12345");

    System.out.println("Player manager: ");

    return new GameResponse(game);
  }
}
