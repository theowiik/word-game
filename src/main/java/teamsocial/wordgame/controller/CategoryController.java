package teamsocial.wordgame.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import teamsocial.wordgame.controller.requestwrapper.CategoryUpdateRequest;
import teamsocial.wordgame.model.entity.Category;
import teamsocial.wordgame.repository.ICategoryRepository;
import teamsocial.wordgame.repository.IWordRepository;

@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {

  @Autowired
  private ICategoryRepository categoryRepository;

  @Autowired
  private IWordRepository wordRepository;

  @GetMapping
  public List<Category> index() {
    return categoryRepository.findAll();
  }

  @PostMapping
  public ResponseEntity<Category> create(@RequestBody Category categoryRequest) {
    if (categoryRequest == null) {
      return ResponseEntity.badRequest().build();
    }

    if (categoryRepository.findById(categoryRequest.getName()).isPresent()) {
      return ResponseEntity.badRequest().build();
    }

    var savedCategory = categoryRepository.save(categoryRequest);
    return ResponseEntity.ok(savedCategory);
  }

  @DeleteMapping("/{category}")
  public ResponseEntity delete( @PathVariable("category") String category) {
    if (category == null) {
      return ResponseEntity.badRequest().build();
    }

    var categoryInDatabase = categoryRepository.findById(category);

    if (categoryInDatabase.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    if (!categoryInDatabase.get().getWords().isEmpty()){
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Delete the words of the category first");
    }

    categoryRepository.delete(categoryInDatabase.get());
    return ResponseEntity.noContent().build();
  }

  @PutMapping
  public ResponseEntity update(@RequestBody CategoryUpdateRequest categoryUpdateRequest) {
    var categoryInDB = categoryRepository.findById(
      categoryUpdateRequest.getOldName()
    );

    if (categoryInDB.isEmpty()) {
      return ResponseEntity.badRequest().build();
    }

    var newCategory = categoryRepository.save(new Category(categoryUpdateRequest.getNewName()));
    var savedNewCategory = categoryRepository.save(newCategory);
    var oldCategory = categoryInDB.get();

    for (var word : oldCategory.getWords()) {
      word.setCategory(savedNewCategory);
    }
    categoryRepository.delete(oldCategory);

    return ResponseEntity.ok(savedNewCategory);
  }
}
