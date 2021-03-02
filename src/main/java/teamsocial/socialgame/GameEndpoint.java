package teamsocial.socialgame;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;
import javax.inject.Inject;
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.websocket.CloseReason;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import teamsocial.socialgame.encoder.JSONTextDecoder;
import teamsocial.socialgame.encoder.JSONTextEncoder;
import teamsocial.socialgame.model.GameManagerBean;
import teamsocial.socialgame.model.entity.Game;

@ServerEndpoint(value = "/players",
        decoders = {JSONTextDecoder.class},
        encoders = {JSONTextEncoder.class})
public class GameEndpoint {

  private static Set<Session> sessions = new HashSet<>();

  @Inject
  private GameManagerBean gameManager;

  public static void broadcastMessage(String message) {
    sessions.forEach(session -> {
      try {
        session.getBasicRemote().sendObject(message);
      } catch (IOException | EncodeException e) {
        e.printStackTrace();
      }
    });
  }

  @OnOpen
  public void onOpen(Session session) {
    System.out.println("WebSocket opened: " + session.getId());
    sessions.add(session);
  }

  @OnMessage
  public void onMessage(String message, Session session) {
    System.out.println("Messsage recieved: " + message + " from " + session.getId());

    Game game = gameManager.getGame("12345");
    Jsonb jsonb = JsonbBuilder.create();
    String result = jsonb.toJson(game);

    try {
      session.getBasicRemote().sendObject(result);
    } catch (IOException | EncodeException e) {
      e.printStackTrace();
    }
  }

  @OnError
  public void onError(Session session, Throwable throwable) {
    System.out.println("WebSocket error for " + session.getId() + " " + throwable.getMessage());
  }

  @OnClose
  public void onClose(Session session, CloseReason closeReason) {
    System.out.println(
            "WebSocket closed for " + session.getId() + " with reason " + closeReason.getCloseCode()
    );
    sessions.remove(session);
  }
}
