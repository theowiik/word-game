package teamsocial.wordgame;

import java.util.UUID;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import teamsocial.wordgame.controller.CategoryController;
import teamsocial.wordgame.model.entity.Category;
import teamsocial.wordgame.model.entity.Word;
import teamsocial.wordgame.repository.ICategoryRepository;
import teamsocial.wordgame.repository.IWordRepository;

@SpringBootTest
class CategoryControllerTest {

  @Autowired
  private CategoryController categoryController;

  @Autowired
  private ICategoryRepository categoryRepository;

  @Autowired
  private IWordRepository wordRepository;

  @Test
  void indexTest() {
    categoryRepository.save(new Category(getUnusedName()));
    categoryRepository.save(new Category(getUnusedName()));
    categoryRepository.save(new Category(getUnusedName()));

    var categories = categoryController.index();

    Assertions.assertTrue(categories.size() >= 3);
  }

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

  @Test
  void deleteCategoryWithNoWordsSuccessTest() {
    var category = categoryRepository.save(new Category(getUnusedName()));
    var name = category.getName();

    categoryController.delete(name);

    var catInDB = categoryRepository.findById(name);
    Assertions.assertTrue(catInDB.isEmpty());
  }

  @Test
  void deleteCategoryWithWordsFailTest() {
    var catName = getUnusedName();
    var category = categoryRepository.save(new Category(catName));
    wordRepository.save(new Word(getUnusedName(), "description", category));

    var response = categoryController.delete(catName);

    Assertions.assertEquals(response.getStatusCode(), HttpStatus.FORBIDDEN);
  }

  @Test
  void deleteNonExistingCategoryFailTest() {
    var response = categoryController.delete(getUnusedName());
    Assertions.assertEquals(response.getStatusCode(), HttpStatus.NOT_FOUND);
  }

  @Test
  void deleteNullCategoryFailTest() {
    var response = categoryController.delete(null);
    Assertions.assertEquals(response.getStatusCode(), HttpStatus.BAD_REQUEST);
  }

  private String getUnusedName() {
    return UUID.randomUUID().toString().replace("-", "");
  }
}
