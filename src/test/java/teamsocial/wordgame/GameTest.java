package teamsocial.wordgame;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.UUID;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;
import teamsocial.wordgame.model.entity.Category;
import teamsocial.wordgame.model.entity.Word;
import teamsocial.wordgame.model.game.Game;
import teamsocial.wordgame.model.game.Player;
import teamsocial.wordgame.repository.ICategoryRepository;
import teamsocial.wordgame.repository.IWordRepository;

@SpringBootTest
class GameTest {

  @Autowired
  private ICategoryRepository categoryRepository;

  @Autowired
  private IWordRepository wordRepository;

  @Test
  void legalPinTest() {
    String[] legalPins = {
        "10000", "53453", "66666"
    };

    for (var legalPin : legalPins) {
      var category = createNewUniqueCategoryWithWords();
      Assertions.assertDoesNotThrow(() -> new Game(category, legalPin));
    }
  }

  @Test
  void illegalPinTest() {
    String[] illegalPins = {
        "", "   ", "1", "1234F", "34343443", "WASDIOASDIJASDO", "a", "1234 5"
    };

    for (var illegalPin : illegalPins) {
      var category = createNewUniqueCategoryWithWords();
      Assertions.assertThrows(Exception.class, () -> new Game(category, illegalPin));
    }
  }

  @Test
  void addPlayerTest() {
    var category = createNewUniqueCategoryWithWords();
    var game = new Game(category, "00000");
    var player = new Player("Billy", 0);

    game.addPlayer(player);

    Assert.isTrue(game.getPlayers().contains(player));
  }

  private Category createNewUniqueCategoryWithWords() {
    var category = new Category(getUuid());

    var word = new Word(getUuid(), getUuid(), category);
    category.setWords(new ArrayList<>(Arrays.asList(word)));

    return category;
  }

  private String getUuid() {
    return UUID.randomUUID().toString();
  }
}
