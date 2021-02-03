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
}
