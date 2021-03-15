package teamsocial.wordgame;

import java.util.UUID;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import teamsocial.wordgame.controller.CategoryController;
import teamsocial.wordgame.model.entity.Category;
import teamsocial.wordgame.repository.ICategoryRepository;

@SpringBootTest
class CategoryControllerTest {

  @Autowired
  private CategoryController categoryController;

  @Autowired
  private ICategoryRepository categoryRepository;

  @Test
  void createValidTest() {
    var name = getUnusedName();
    var categoryRequest = new Category(name);
    var response = categoryController.create(categoryRequest);
    var responseCategory = response.getBody();

    Assertions.assertEquals(responseCategory.getName(), name);
  }

  @Test
  void createInvalidTest() {
    var response = categoryController.create(null);
    Assertions.assertEquals(response.getStatusCode(), HttpStatus.BAD_REQUEST);
  }

  @Test
  void createAlreadyExistingTest() {
    var sharedName = getUnusedName();
    var myCat = new Category(sharedName);
    categoryRepository.save(myCat);

    var response = categoryController.create(new Category(sharedName));

    Assertions.assertEquals(response.getStatusCode(), HttpStatus.BAD_REQUEST);
  }

  private String getUnusedName() {
    return UUID.randomUUID().toString().replace("-", "");
  }
}
