package teamsocial.wordgame.websocket;

import java.text.SimpleDateFormat;
import java.util.Date;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import teamsocial.wordgame.websocket.response.OutputMessage;

@Controller
public class ChatController {

  @MessageMapping("/chat")
  @SendTo("/topic/messages")
  public OutputMessage send(Message message) {
    var time = new SimpleDateFormat("HH:mm").format(new Date());
    return new OutputMessage(message.getFrom(), message.getText(), time);
  }
}
