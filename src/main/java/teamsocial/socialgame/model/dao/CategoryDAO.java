package teamsocial.socialgame.model.dao;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import lombok.Getter;
import teamsocial.socialgame.model.entity.Category;

@Stateless
public class CategoryDAO extends AbstractDAO<Category> {

  @Getter
  @PersistenceContext(unitName = "socialgame")
  private EntityManager entityManager;

  public CategoryDAO() {
    super(Category.class);
  }
}
