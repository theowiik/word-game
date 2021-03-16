package teamsocial.wordgame;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.UUID;

import liquibase.pro.packaged.A;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;
import teamsocial.wordgame.model.GameManagerBean;
import teamsocial.wordgame.model.entity.Category;
import teamsocial.wordgame.model.entity.Word;
import teamsocial.wordgame.model.game.Game;
import teamsocial.wordgame.model.game.Player;
import teamsocial.wordgame.model.game.Round;
import teamsocial.wordgame.repository.ICategoryRepository;
import teamsocial.wordgame.repository.IWordRepository;
import teamsocial.wordgame.websocket.GameChangedPushService;

@SpringBootTest
class GameTest {

  @Autowired
  private ICategoryRepository categoryRepository;

  @Autowired
  private IWordRepository wordRepository;

  @Test
  void legalPinTest() {
    String[] legalPins = {
        "10000", "53453", "66666"
    };

    for (var legalPin : legalPins) {
      var category = createNewUniqueCategoryWithWords();
      Assertions.assertDoesNotThrow(() -> new Game(category, legalPin));
    }
  }

  @Test
  void illegalPinTest() {
    String[] illegalPins = {
        "", "   ", "1", "1234F", "34343443", "WASDIOASDIJASDO", "a", "1234 5"
    };

    for (var illegalPin : illegalPins) {
      var category = createNewUniqueCategoryWithWords();
      Assertions.assertThrows(Exception.class, () -> new Game(category, illegalPin));
    }
  }

  @Test
  void addPlayerTest() {
    var category = createNewUniqueCategoryWithWords();
    var game = new Game(category, "00000");
    var player = new Player("Billy");

    game.addPlayer(player);

    Assert.isTrue(game.getPlayers().contains(player));
  }


  @Test
  void getPLayerScoresTest() {
    var category = new Category(createUnusedName());

    var word = new Word("Score", "Measure", category);
    category.setWords(new ArrayList<>(Arrays.asList(word)));

    var game = new Game(category, "00001");
    var player = new Player("Billy");
    game.addPlayer(player);
    Assert.isTrue(game.getPlayerScores().get(player) == 0);

    var round = game.getRounds().get(0);
    round.setWord(word);
    round.setState(Round.State.SELECT_EXPLANATION);
    game.selectExplanation(player, word.getDescription());
    Assert.isTrue(game.getPlayerScores().get(player) > 0);

  }

  @Test
  void startGameTest() {
    var category = createNewUniqueCategoryWithWords();
    var game = new Game(category, "00002");
    Assert.isTrue(game.getState() == Game.State.LOBBY);

    game.startGame();
    Assert.isTrue(game.getState() == Game.State.PLAYING);

  }

  @Test
  void checkCorrectCategoryTest() {
    var category = createNewUniqueCategoryWithWords();
    var game = new Game(category, "00002");

    Assert.isTrue(category == game.getCategory());
    Assert.isTrue(game.getCurrentRound().getCurrentWord() == category.getWords().get(0).getWord());

  }

  @Test
  void addGameChangedObserverTest() {
    var category = createNewUniqueCategoryWithWords();
    var game = new Game(category, "00003");
    Assert.isTrue(game.getObservers().isEmpty());
    GameChangedPushService gcps = new GameChangedPushService();
    game.addGameChangedObserver(gcps);
    Assert.isTrue(game.getObservers().contains(gcps));
  }

  @Test
  void addGameFinishedListenerTest() {
    var category = createNewUniqueCategoryWithWords();
    var game = new Game(category, "00004");
    Assert.isTrue(game.getGameFinishedListeners().isEmpty());
    GameManagerBean gmb = new GameManagerBean();
    game.addGameFinishedListener(gmb);
    Assert.isTrue(game.getGameFinishedListeners().contains(gmb));
  }

  @Test
  void getCurrentRoundTest() {
    var category = createNewUniqueCategoryWithWords();
    var game = new Game(category, "00005");
    var startingRound = game.getCurrentRound();

    Assert.isInstanceOf(Round.class , startingRound);
  }

  @Test
  void addExplanationTest() {
    var category = createNewUniqueCategoryWithWords();
    var game = new Game(category, "00006");
    var player = new Player("Billy");
    game.getCurrentRound().setState(Round.State.PRESENT_WORD_INPUT_EXPLANATION);
    var explanation = "my explanation";
    game.addExplanation(player, explanation);
    Assert.isTrue(game.getCurrentRound().getExplanations().containsValue(explanation));
  }

  @Test
  void selectExplanationTest() {
    var category = createNewUniqueCategoryWithWords();
    var game = new Game(category, "00007");
    var player = new Player("Billy");
    game.getCurrentRound().setState(Round.State.PRESENT_WORD_INPUT_EXPLANATION);
    var explanation = "my explanation";
    game.addExplanation(player, explanation);

    game.getCurrentRound().setState(Round.State.SELECT_EXPLANATION);
    game.selectExplanation(player, explanation);

    Assert.isTrue(game.getCurrentRound().getSelectedExplanations().get(player) == explanation);
  }

  @Test
  void notifyRoundFinishedTest() {
    var category = createNewUniqueCategoryWithWords();
    var game = new Game(category, "00008");
    Assert.isTrue(game.getState() == Game.State.LOBBY);
    game.notifyRoundFinished();
    game.notifyRoundFinished();
    game.notifyRoundFinished();
    game.notifyRoundFinished();
    Assert.isTrue(game.getActiveRoundIndex() == 5);
    game.notifyRoundFinished();
    Assert.isTrue(game.getState() == Game.State.END);
  }

  @Test
  void playerIsJoinedTest() {
    var category = createNewUniqueCategoryWithWords();
    var game = new Game(category, "00009");
    Player nullPLayer = null;
    var player = new Player("Billy");
    game.addPlayer(player);

    Assert.isTrue(!game.playerIsJoined(nullPLayer));
    Assert.isTrue(game.playerIsJoined(player));
  }

  @Test
  void getCurrentWord() {
    var category = createNewUniqueCategoryWithWords();
    var game = new Game(category, "00010");

    Assert.hasText(game.getCurrentWord());
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
