package teamsocial.socialgame.resources;

import java.util.List;
import javax.ejb.EJB;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import teamsocial.socialgame.model.dao.CategoryDAO;
import teamsocial.socialgame.model.entity.Category;

@Path("category")
public class CategoryResource {

  @EJB
  private CategoryDAO categoryDAO;

  @GET
  public List<Category> getCategories() {
    return categoryDAO.findAll();
  }
}
