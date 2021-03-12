package teamsocial.wordgame;

import java.util.UUID;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;
import teamsocial.wordgame.model.entity.Category;
import teamsocial.wordgame.repository.ICategoryRepository;

@SpringBootTest
class CategoryTest {

  @Autowired
  private ICategoryRepository categoryRepository;

  @Test
  void nameNotNull() {
    var category = new Category(null);

    Assertions.assertThrows(
        Exception.class,
        () -> categoryRepository.save(category)
    );
  }

  @Test
  void nameNotEmpty() {
    String[] illegalNames = {"", "   "};

    for (var name : illegalNames) {
      var category = new Category(name);
      Assertions.assertThrows(
          Exception.class,
          () -> categoryRepository.save(category)
      );

    }
  }
}
