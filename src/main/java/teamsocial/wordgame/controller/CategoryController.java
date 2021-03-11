package teamsocial.wordgame.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import teamsocial.wordgame.model.entity.Category;
import teamsocial.wordgame.repository.ICategoryRepository;

@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {

  @Autowired
  private ICategoryRepository categoryRepository;

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
}
