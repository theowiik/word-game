package teamsocial.wordgame;

import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;
import teamsocial.wordgame.controller.CategoryController;
import teamsocial.wordgame.model.entity.Category;

@SpringBootTest
class CategoryControllerTest {

  @Autowired
  private CategoryController categoryController;

  @Test
  void createTest() {
    var name = getUnusedName();
    var categoryRequest = new Category(name);
    var response = categoryController.create(categoryRequest);
    var responseCategory = response.getBody();

    Assert.isTrue(responseCategory.getName().equals(name));
  }

  private String getUnusedName() {
    return UUID.randomUUID().toString().replace("-", "");
  }
}
