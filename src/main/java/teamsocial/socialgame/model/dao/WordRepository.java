package teamsocial.socialgame.model.dao;

import javax.transaction.Transactional;
import org.apache.deltaspike.data.api.AbstractEntityRepository;
import org.apache.deltaspike.data.api.QueryResult;
import org.apache.deltaspike.data.api.Repository;
import teamsocial.socialgame.model.entity.Word;

@Repository
@Transactional
public abstract class WordRepository extends AbstractEntityRepository<Word, String> {

  public abstract QueryResult<Word> findByWord(String word);
}
