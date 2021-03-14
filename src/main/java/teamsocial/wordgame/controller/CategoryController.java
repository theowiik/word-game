package teamsocial.wordgame.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
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

  @GetMapping("/{name}")
  public ResponseEntity<Category> get(@PathVariable("name") String name) {
    var category = categoryRepository.findById(name);

    if (category.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Could not find category");
    }

    return ResponseEntity.ok(category.get());
  }

  @PostMapping
  public ResponseEntity<Category> create(@RequestBody Category category) {
    if (category == null) {
      return ResponseEntity.badRequest().build();
    }

    if (categoryRepository.findById(category.getName()).isPresent()) {
      return ResponseEntity.badRequest().build();
    }

    var savedCategory = categoryRepository.save(category);
    return ResponseEntity.ok(savedCategory);
  }

  @DeleteMapping
  public ResponseEntity delete(@RequestBody Category category) {
    if (category == null) {
      return ResponseEntity.badRequest().build();
    }

    var categoryInDatabase = categoryRepository.findById(category.getName());

    if (categoryInDatabase.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    for (var word : categoryInDatabase.get().getWords()) {
      word.setCategory(null);
      wordRepository.save(word);
    }

    categoryRepository.delete(categoryInDatabase.get());
    return ResponseEntity.noContent().build();
  }
}
