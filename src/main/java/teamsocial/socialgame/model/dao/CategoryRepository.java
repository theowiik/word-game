package teamsocial.socialgame.model.dao;

import javax.transaction.Transactional;
import org.apache.deltaspike.data.api.AbstractEntityRepository;
import org.apache.deltaspike.data.api.Repository;
import teamsocial.socialgame.model.entity.Category;

@Repository
@Transactional
public abstract class CategoryRepository extends AbstractEntityRepository<Category, String> {

}
