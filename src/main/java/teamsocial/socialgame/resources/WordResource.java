package teamsocial.socialgame.resources;

import java.util.List;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import teamsocial.socialgame.model.dao.WordRepository;
import teamsocial.socialgame.model.entity.Word;

@Path("words")
public class WordResource {

  @Inject
  private WordRepository wordRepository;

  @GET
  public List<Word> getWords() {
    return wordRepository.findAll();
  }
}
