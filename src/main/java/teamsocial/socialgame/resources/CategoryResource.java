package teamsocial.socialgame.resources;

import java.util.List;
import javax.ejb.EJB;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import teamsocial.socialgame.model.dao.CategoryRepository;
import teamsocial.socialgame.model.entity.Category;

@Path("categories")
public class CategoryResource {

  @Inject
  private CategoryRepository categoryRepository;

  @GET
  public List<Category> getCategories() {
    return categoryRepository.findAll();
  }

  @GET
  @Path("/{name}")
  public Category getCategory(@PathParam("name") String name) {
    return categoryRepository.findBy(name);
  }
}
