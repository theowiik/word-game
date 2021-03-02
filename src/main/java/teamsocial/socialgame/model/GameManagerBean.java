package teamsocial.socialgame.model;

import java.util.HashMap;
import java.util.Map;
import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import teamsocial.socialgame.model.dao.CategoryRepository;
import teamsocial.socialgame.model.entity.Category;
import teamsocial.socialgame.model.entity.Game;
import teamsocial.socialgame.model.entity.PlayerManager;

@ApplicationScoped
public class GameManagerBean {

  private Map<String, Game> games;
  private int counter;

  @Inject
  private CategoryRepository categoryRepository;

  @PostConstruct
  private void init() {
    games = new HashMap<String, Game>();
    Category category = getDummyCategory();
    String pin = getUnusedPin();
    games.put(pin, new Game(category, pin));
  }

  public Game getGame(String pin) {
    Game game = games.get(pin);
    return game;
  }

  public Game createGame(String category) {
    String pin = getUnusedPin();
    Category cat = categoryRepository.findBy(category);
    games.put(pin, new Game(cat, pin));
    return games.get(pin);
  }

  public void setAnswer(String pin, PlayerManager player, String description) {
    Game game = getGame(pin);
    game.setAnswer(player, description);
  }

  private Category getDummyCategory() {
    return categoryRepository.findBy("cat1");
  }

  private String getUnusedPin() {
    counter++;
    return String.valueOf(12344 + counter);
  }
}
