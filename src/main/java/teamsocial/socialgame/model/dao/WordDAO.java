package teamsocial.socialgame.model.dao;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import lombok.Getter;
import teamsocial.socialgame.model.entity.Word;

@Stateless
public class WordDAO extends AbstractDAO<Word> {

  @Getter
  @PersistenceContext(unitName = "socialgame")
  private EntityManager entityManager;

  public WordDAO() {
    super(Word.class);
  }

  public Word findByName(String name) {
    //EntityManager em = getEntityManager();
    //final CriteriaQuery cq = em.getCriteriaBuilder().createQuery(Word.class).from(Word.class);
    //cq.select(cq.from(Word.class)).where()
    return null;
  }
}
