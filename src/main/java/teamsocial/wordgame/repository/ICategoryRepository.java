package teamsocial.wordgame.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import teamsocial.wordgame.model.entity.Category;

public interface ICategoryRepository extends JpaRepository<Category, String> {

}
