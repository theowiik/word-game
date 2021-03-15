package teamsocial.wordgame;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;
import teamsocial.wordgame.controller.WordController;
import teamsocial.wordgame.model.entity.Category;
import teamsocial.wordgame.model.entity.Word;
import teamsocial.wordgame.repository.IWordRepository;

@SpringBootTest
public class WordControllerTest {

  @Autowired
  private WordController wordController;

  @Autowired
  IWordRepository wordRepository;

  @Test
  public void createTest(){

      Word word = new Word();
      Category category = new Category("hej");
      word.setWord("Tjena");
      word.setDescription("TestTest");
      word.setCategory(category);



      var response = wordController.create(word);
      var responseWord = response.getBody();

    Assert.isTrue(responseWord.getWord().equals(word.getWord()));
    Assert.isTrue(responseWord.getDescription().equals(word.getDescription()));

  }


  @Test
  public void updateWordTest(){

    Word word = new Word();
    Category category = new Category("cat1111");
    word.setWord("Lol");
    word.setDescription("TestTestTest");
    word.setCategory(category);


    var response = wordController.create(word);
    var responseWord = response.getBody();

    //TODO
  }

  @Test
  public void deleteWordTest(){
    Word word = new Word();
    Category category = new Category("cat1111");
    word.setWord("Lol");
    word.setDescription("TestTestTest");
    word.setCategory(category);


    wordController.create(word);
    wordController.delete(word.getWord());
    var checkForEmptyWord = wordRepository.findById(word.getWord());

    Assert.isTrue(checkForEmptyWord.isEmpty());



  }


}
