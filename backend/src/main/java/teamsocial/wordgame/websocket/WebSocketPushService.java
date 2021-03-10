package teamsocial.wordgame.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import teamsocial.wordgame.websocket.response.OutputMessage;

@Service
public class WebSocketPushService {

  @Autowired
  private SimpMessagingTemplate simpMessagingTemplate;

  public void notifyGameChanged() {
    System.out.println("sending the new game state in service");

    simpMessagingTemplate.convertAndSend(
        "/topic/messages",
        new OutputMessage("from", "text", "time")
    );
  }
}
