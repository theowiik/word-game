package teamsocial.wordgame;

import java.util.UUID;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import teamsocial.wordgame.controller.CategoryController;
import teamsocial.wordgame.controller.requestwrapper.CategoryUpdateRequest;
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

  @Test
  void updateCategoryWithNoWordTest() {
    var oldName = getUnusedName();
    var newName = getUnusedName();
    categoryRepository.save(new Category(oldName));

    var request = new CategoryUpdateRequest(oldName, newName);
    var response = categoryController.update(request);

    var updatedCategory = response.getBody();
    Assertions.assertNotNull(updatedCategory);
    Assertions.assertEquals(updatedCategory.getName(), newName);
  }

  @Test
  void updateCategoryWithWordsTest() {
    var oldCatName = getUnusedName();
    var newCatName = getUnusedName();
    var wordName = getUnusedName();
    var category = categoryRepository.save(new Category(oldCatName));
    var word = wordRepository.save(new Word(wordName, getUnusedName(), category));
    Assertions.assertEquals(word.getCategory().getName(), oldCatName);

    // Change category name
    var request = new CategoryUpdateRequest(oldCatName, newCatName);
    var response = categoryController.update(request);
    var updatedCategory = response.getBody();
    Assertions.assertEquals(response.getStatusCode(), HttpStatus.OK);
    Assertions.assertNotNull(updatedCategory);
    Assertions.assertEquals(updatedCategory.getName(), newCatName);

    // Old category should be removed
    var oldCategory = categoryRepository.findById(oldCatName);
    Assertions.assertTrue(oldCategory.isEmpty());

    // Words in old category has updated to the new category
    var updatedWordOptional = wordRepository.findById(wordName);
    Assertions.assertTrue(updatedWordOptional.isPresent());
    var updatedWord = updatedWordOptional.get();
    Assertions.assertEquals(updatedWord.getCategory().getName(), newCatName);
  }

  @Test
  void updateNonExistingCategoryFailTest() {
    var request = new CategoryUpdateRequest(getUnusedName(), getUnusedName());
    var response = categoryController.update(request);
    Assertions.assertEquals(response.getStatusCode(), HttpStatus.NOT_FOUND);
  }

  private String getUnusedName() {
    return UUID.randomUUID().toString().replace("-", "");
  }
}
