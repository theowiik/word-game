package teamsocial.wordgame.model;

import java.util.HashMap;
import java.util.Map;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.ApplicationScope;
import teamsocial.wordgame.model.game.Game;
import teamsocial.wordgame.repository.ICategoryRepository;
import teamsocial.wordgame.websocket.GameChangedPushService;

@ApplicationScope
@Component
public class GameManagerBean implements Game.GameFinishedListeners {

  private Map<String, Game> games;
  private int counter;

  @Autowired
  private ICategoryRepository categoryRepository;

  @Autowired
  private GameChangedPushService pushService;

  @PostConstruct
  private void init() {
    games = new HashMap<>();
    createGame("cat1"); // TODO Remove this
  }

  public Game getGameByPin(String pin) {
    var game = games.get(pin);
    return game;
  }

  public Game createGame(String category) {
    var cat = categoryRepository.findById(category).get(); // TODO: Throw error.
    var pin = getUnusedPin();
    var game = new Game(cat, pin);
    game.addGameChangedObserver(pushService);
    game.addGameFinishedListener(this);
    games.put(pin, game);
    return game;
  }

  public void removeGame(String pin) {
    games.remove(pin);
  }

  private String getUnusedPin() {
    counter++;
    return String.valueOf(12344 + counter);
  }

  @Override
  public void notifyGameFinished(String pin) {
    removeGame(pin);
  }
}
