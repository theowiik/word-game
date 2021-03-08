package teamsocial.wordgame.model;

import java.util.HashMap;
import java.util.Map;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.ApplicationScope;
import teamsocial.wordgame.model.entity.Category;
import teamsocial.wordgame.model.game.Game;
import teamsocial.wordgame.repository.ICategoryRepository;

@ApplicationScope
@Component
public class GameManagerBean {

  private Map<String, Game> games;
  private int counter;

  @Autowired
  private ICategoryRepository categoryRepository;

  @PostConstruct
  private void init() {
    games = new HashMap<>();
    var category = getDummyCategory();
    var pin = getUnusedPin();
    games.put(pin, new Game(category, pin));
  }

  public Game getGame(String pin) {
    var game = games.get(pin);
    return game;
  }

  public Game createGame(String category) {
    var cat = categoryRepository.findById(category).get(); // TODO: Throw error.
    var pin = getUnusedPin();
    var game = new Game(cat, pin);
    games.put(pin, game);
    return game;
  }

  public void setExplanation(String pin, PlayerManagerBean player, String description) {
    Game game = getGame(pin);
    game.setExplanation(player.getPlayer(), description);
  }

  private Category getDummyCategory() {
    return categoryRepository.findById("cat1").get();
  }

  private String getUnusedPin() {
    counter++;
    return String.valueOf(12344 + counter);
  }
}
