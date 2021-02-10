package teamsocial.socialgame.model;

import java.io.Serializable;
import javax.enterprise.inject.Disposes;
import javax.enterprise.inject.Produces;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import javax.transaction.TransactionScoped;

@TransactionScoped
public class EntityManagerProducer implements Serializable {

  @PersistenceUnit(unitName = "socialgame")
  private EntityManagerFactory emf;

  @Produces
  public EntityManager create() {
    return emf.createEntityManager();
  }

  public void close(@Disposes EntityManager em) {
    if (em.isOpen()) {
      em.close();
    }
  }
}
