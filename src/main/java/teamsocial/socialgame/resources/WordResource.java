package teamsocial.socialgame.resources;

import java.util.List;
import javax.ejb.EJB;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import teamsocial.socialgame.model.dao.WordDAO;
import teamsocial.socialgame.model.entity.Category;

@Path("word")
public class WordResource {

  @EJB
  private WordDAO wordDAO;

  @GET
  public List<Category> getWords() {
    return null;
  }
}
