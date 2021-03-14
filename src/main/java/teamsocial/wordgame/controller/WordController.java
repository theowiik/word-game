package teamsocial.wordgame.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import teamsocial.wordgame.model.entity.Word;
import teamsocial.wordgame.repository.IWordRepository;

@RestController
@RequestMapping("/api/v1/words")
public class WordController {

  @Autowired
  private IWordRepository wordRepository;

  @GetMapping
  public List<Word> index() {
    return wordRepository.findAll();
  }

  @PostMapping
  public ResponseEntity<Word> create(@RequestBody Word wordRequest) {
    if (wordRequest == null) {
      return ResponseEntity.badRequest().build();
    }

    if (wordRepository.findById(wordRequest.getWord()).isPresent()) {
      return ResponseEntity.badRequest().build();
    }

    var savedWord = wordRepository.save(wordRequest);
    return ResponseEntity.ok(savedWord);
  }

  @PutMapping
  public ResponseEntity update(@RequestBody Word wordRequest) {
    var wordInDb = wordRepository.findById(wordRequest.getWord());

    if (wordInDb.isEmpty()) {
      return ResponseEntity.badRequest().build();
    }

    var savedWord = wordRepository.save(wordRequest);

    return ResponseEntity.ok(savedWord);
  }

  @DeleteMapping
  public ResponseEntity delete(@RequestBody Word wordRequest) {
    if (wordRequest == null) {
      return ResponseEntity.badRequest().build();
    }

    var wordInDatabase = wordRepository.findById(wordRequest.getWord());

    if (wordInDatabase.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    wordRepository.delete(wordInDatabase.get());
    return ResponseEntity.noContent().build();
  }
}
