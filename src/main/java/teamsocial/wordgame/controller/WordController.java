package teamsocial.wordgame.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import teamsocial.wordgame.model.entity.Word;
import teamsocial.wordgame.repository.IWordRepository;

/**
 * Controller for handling word actions
 */
@RestController
@RequestMapping("/api/v1/words")
public class WordController {

  @Autowired
  private IWordRepository wordRepository;

  /**
   * Get a list of all words in database.
   * @return words a list of Word
   */
  @GetMapping
  public List<Word> index() {
    return wordRepository.findAll();
  }

  /**
   *  Save the requested word to the database. If the request is null or already exists badRequest is returned.
   *
   * @param wordRequest the word to create
   * @return ResponseEntity with the created word or badRequest if error
   */
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

  /**
   * Update the description and/or category of a word.
   * If the word can not be found in database return badRequest
   *
   * @param wordRequest the word to update
   * @return ResponseEntity with the created word or badRequest if error
   */
  @PutMapping
  public ResponseEntity update(@RequestBody Word wordRequest) {
    var wordInDb = wordRepository.findById(wordRequest.getWord());

    if (wordInDb.isEmpty()) {
      return ResponseEntity.badRequest().build();
    }

    var savedWord = wordRepository.save(wordRequest);

    return ResponseEntity.ok(savedWord);
  }

  /**
   * Deletes the word with the given key.
   *
   * @param word the key of a word entity
   * @return corresponding ResponseEntity
   */
  @DeleteMapping("/{word}")
  public ResponseEntity delete( @PathVariable("word") String word) {
    if (word == null) {
      return ResponseEntity.badRequest().build();
    }

    var wordInDatabase = wordRepository.findById(word);

    if (wordInDatabase.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    wordRepository.delete(wordInDatabase.get());
    return ResponseEntity.noContent().build();
  }
}

