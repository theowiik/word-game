package teamsocial.wordgame.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.Set;
import javax.websocket.CloseReason;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import teamsocial.wordgame.model.GameManagerBean;
import teamsocial.wordgame.model.PlayerManagerBean;
import teamsocial.wordgame.model.game.Game;
import teamsocial.wordgame.model.game.Player;

@ServerEndpoint(value = "/ws/players")
public class GameEndpoint implements Serializable, Game.GameObserver {

  private static final Set<Session> sessions = new HashSet<>();
  private static final String JOIN = "JOIN";
  private static final String CHANGE_NAME = "CHANGE_NAME";
  @Autowired
  private PlayerManagerBean playerManager;
  @Autowired
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

  @SneakyThrows
  public void onGameChange() {
    var game = gameManager.getGame("12345");

    var mapper = new ObjectMapper();
    var gameJson = mapper.writeValueAsString(game);

    broadcastMessage(gameJson);
  }

  @OnOpen
  public void onOpen(Session session) {
    System.out.println("WebSocket opened: " + session.getId());
    sessions.add(session);
  }

  @SneakyThrows
  @OnMessage
  public void onMessage(String message, Session session) {
    System.out.println("Messsage recieved: " + message + " from " + session.getId());
    var game = gameManager.getGame("12345");

    if (message.contains(JOIN)) {
      System.out.println("Player wants to join game.");

      playerManager.setPlayer(new Player(getPlayerName(), getRandomNumber(1000, 9999)));
      game.addPlayer(playerManager.getPlayer());

      //game.addPlayer(new Player(getPlayerName(), getRandomNumber(1000, 9999)));
    } else if (message.contains(CHANGE_NAME)) {
    }

    var mapper = new ObjectMapper();
    var result = mapper.writeValueAsString(game);
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
