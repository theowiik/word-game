package teamsocial.socialgame.model.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaQuery;

public abstract class AbstractDAO<T> {
  private final Class<T> entityType;

  // TODO: Should this be here?
  public AbstractDAO(Class<T> wordClass) {
    entityType = wordClass;
  }

  protected abstract EntityManager getEntityManager();

  public List<T> findAll() {
    final CriteriaQuery cq = getEntityManager().getCriteriaBuilder().createQuery();
    cq.select(cq.from(entityType));
    return getEntityManager().createQuery(cq).getResultList();
  }

  public void remove(T entity) {
    getEntityManager().remove(getEntityManager().merge(entity));
  }
}
