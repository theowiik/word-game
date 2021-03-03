package teamsocial.socialgame;

import java.io.IOException;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.Set;
import javax.inject.Inject;
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.servlet.ServletContext;
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
import teamsocial.socialgame.model.entity.Player;
import teamsocial.socialgame.model.entity.PlayerManager;

@ServerEndpoint(value = "/players",
        decoders = {JSONTextDecoder.class},
        encoders = {JSONTextEncoder.class})
public class GameEndpoint implements Serializable {

  @Inject
  private PlayerManager playerManager;
  
  @Inject
  private ServletContext contextt;
  
  private static final Set<Session> sessions = new HashSet<>();
  private static final String JOIN = "JOIN";
  private static final String CHANGE_NAME = "CHANGE_NAME";

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

    if (message.contains(JOIN)) {
      System.out.println("Player wants to join game.");

      playerManager.setPlayer(new Player(getPlayerName(), getRandomNumber(1000, 9999)));
      game.addPlayer(playerManager.getPlayer());
      
      //game.addPlayer(new Player(getPlayerName(), getRandomNumber(1000, 9999)));
    } else if (message.contains(CHANGE_NAME)) {
    }

    String result = jsonb.toJson(game);
    broadcastMessage(result);
  }

  private int getRandomNumber(int min, int max) {
    return (int) ((Math.random() * (max - min)) + min);
  }

  private String getPlayerName() {
    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
    LocalDateTime now = LocalDateTime.now();
    return dtf.format(now);
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
