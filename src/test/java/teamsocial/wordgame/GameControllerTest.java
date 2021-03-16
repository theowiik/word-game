package teamsocial.wordgame;

import java.util.UUID;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;
import teamsocial.wordgame.controller.CategoryController;
import teamsocial.wordgame.controller.GameController;
import teamsocial.wordgame.model.GameManagerBean;
import teamsocial.wordgame.model.entity.Category;
import teamsocial.wordgame.model.entity.Word;
import teamsocial.wordgame.model.game.Game.State;
import teamsocial.wordgame.repository.ICategoryRepository;
import teamsocial.wordgame.repository.IWordRepository;

@SpringBootTest
class GameControllerTest {

  @Autowired
  private GameController gameController;

  @Autowired
  private GameManagerBean gameManagerBean;

  @Autowired
  private CategoryController categoryController;

  @Autowired
  private ICategoryRepository categoryRepository;

  @Autowired
  private IWordRepository wordRepository;

  @Test
  void createGameSuccessTest() {
    var catName = getUnusedName();
    var category = categoryRepository.save(new Category(catName));
    var wordEntity = new Word(catName, "Desc", category);
    wordRepository.save(wordEntity);

    var response = gameController.create(catName);
    Assertions.assertEquals(response.getStatusCode(), HttpStatus.OK);
    var game = response.getBody();

    Assertions.assertNotNull(game);
    Assertions.assertEquals(game.getCategory().getName(), catName);
  }

  @Test
  void createGameWithNonExistingCategoryFailTest() {
    Assertions.assertThrows(
      ResponseStatusException.class,
      () -> gameController.create(getUnusedName())
    );
  }

  @Test
  void createGameWithCategoryNoWordsFailTest() {
    var catName = getUnusedName();
    categoryRepository.save(new Category(catName));
    Assertions.assertThrows(
      ResponseStatusException.class,
      () -> gameController.create(catName)
    );
  }

  @Test
  void getNonExistingGameTest() {
    var response1 = gameController.get(null);
    Assertions.assertEquals(response1.getStatusCode(), HttpStatus.NOT_FOUND);

    var response2 = gameController.get("weee!!");
    Assertions.assertEquals(response2.getStatusCode(), HttpStatus.NOT_FOUND);
  }

  @Test
  void startGameSuccessTest() {
    var catName = getUnusedName();
    var category = categoryRepository.save(new Category(catName));
    wordRepository.save(new Word(getUnusedName(), "Desc", category));
    var gameResponse = gameController.create(category.getName());
    var game = gameResponse.getBody();

    Assertions.assertNotNull(game);
    gameController.startGame(game.getPin());

    Assertions.assertEquals(game.getState(), State.PLAYING);

    // Dont start already started game
    Assertions.assertThrows(
      ResponseStatusException.class,
      () -> gameController.startGame(game.getPin())
    );
  }

  @Test
  void JoinGameTest() {
    var catName = getUnusedName();
    var category = categoryRepository.save(new Category(catName));
    wordRepository.save(new Word(getUnusedName(), "Desc", category));
    var gameResponse = gameController.create(category.getName());
    var game = gameResponse.getBody();
    Assertions.assertNotNull(game);

    gameController.joinGame(game.getPin(), getUnusedName());
    var playersInGame = game.getPlayers();
    Assertions.assertEquals(playersInGame.size(), 1);

    // Dont join an active game
    gameController.startGame(game.getPin());
    var response = gameController.joinGame(game.getPin(), "_");
    Assertions.assertEquals(response.getStatusCode(), HttpStatus.FORBIDDEN);
  }

  private String getUnusedName() {
    return UUID.randomUUID().toString().replace("-", "");
  }
}
