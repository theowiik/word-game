package teamsocial.socialgame.model;

import java.io.Serializable;
import javax.enterprise.inject.Disposes;
import javax.enterprise.inject.Produces;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.TransactionScoped;

@TransactionScoped
public class EntityManagerProducer implements Serializable {

  @PersistenceContext(name = "socialgame")
  private EntityManager entityManager;

  @Produces
  protected EntityManager createEntityManager() {
    return this.entityManager;
  }

  protected void closeEntityManager(@Disposes EntityManager entityManager) {
    if (entityManager.isOpen()) {
      entityManager.close();
    }
  }
}
