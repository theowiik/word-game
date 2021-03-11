package teamsocial.wordgame.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import teamsocial.wordgame.model.entity.Word;

public interface IWordRepository extends JpaRepository<Word, String> {

}
