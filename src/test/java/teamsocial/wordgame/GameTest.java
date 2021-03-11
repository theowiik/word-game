package teamsocial.wordgame;

import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import teamsocial.wordgame.model.entity.Category;
import teamsocial.wordgame.model.entity.Word;
import teamsocial.wordgame.model.game.Game;
import teamsocial.wordgame.repository.ICategoryRepository;
import teamsocial.wordgame.repository.IWordRepository;

@SpringBootTest
class GameTest {

  @Autowired
  private ICategoryRepository categoryRepository;

  @Autowired
  private IWordRepository wordRepository;

  @Test
  void gamePinIsFiveNumbers() {
    var category = createNewUniqueCategoryWithWords();
    var game = new Game(category, "");
  }

  @Test
  void addPlayerTest() {
    var category = createNewUniqueCategoryWithWords();
    var game = new Game(category, "");
  }

  private Category createNewUniqueCategoryWithWords() {
    var category = new Category(getUuid());
    var savedCategory = categoryRepository.save(category);

    var word = new Word(getUuid(), getUuid(), savedCategory);
    wordRepository.save(word);

    return savedCategory;
  }

  private String getUuid() {
    return UUID.randomUUID().toString();
  }
}
