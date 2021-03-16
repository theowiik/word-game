package teamsocial.wordgame;


import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;
import teamsocial.wordgame.model.entity.Category;
import teamsocial.wordgame.model.entity.Word;
import teamsocial.wordgame.model.game.Game;
import teamsocial.wordgame.model.game.Player;
import teamsocial.wordgame.model.game.Round;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.UUID;

@SpringBootTest
public class RoundTest {


  @Test
  void getAllExplanationsTest() {
    var category = createNewUniqueCategoryWithWords();
    var game = new Game(category, "00000");
    var player = new Player("Billy");
    var explanation = "My explanation";

    game.getCurrentRound().setState(Round.State.PRESENT_WORD_INPUT_EXPLANATION);
    game.getCurrentRound().addPlayerExplanation(player, explanation);

    var explanations = game.getCurrentRound().getAllExplanations();

    Assert.isTrue(explanations.contains(explanation));

  }

  @Test
  void validDescriptionTest() {
    var category = createNewUniqueCategoryWithWords();
    var game = new Game(category, "00000");
    var player = new Player("Billy");
    var notValidExplanation = "";

    game.getCurrentRound().setState(Round.State.PRESENT_WORD_INPUT_EXPLANATION);

    Assertions.assertThrows(IllegalStateException.class, () -> game.getCurrentRound().addPlayerExplanation(player, notValidExplanation));
  }

  @Test
  void startRoundTest() {
    var category = createNewUniqueCategoryWithWords();
    var game = new Game(category, "00000");

    game.getCurrentRound().start();
    Assertions.assertTrue(game.getCurrentRound().getState() == Round.State.PRESENT_WORD_INPUT_EXPLANATION);
  }

  @Test
  void isCorrectTest() {
    var category = createNewUniqueCategoryWithWords();
    var game = new Game(category, "00000");

    var word = game.getCurrentRound().getWord();
    Assertions.assertTrue(game.getCurrentRound().isCorrect(word.getDescription()));
  }

  private Category createNewUniqueCategoryWithWords() {
    var category = new Category(createUnusedName());

    var word = new Word(createUnusedName(), createUnusedName(), category);
    category.setWords(new ArrayList<>(Arrays.asList(word)));

    return category;
  }

  private String createUnusedName() {
    return UUID.randomUUID().toString().replace("-", "");
  }
}




