package teamsocial.socialgame.model.entity;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Category implements Serializable {

  @Id
  private String name;
  @OneToMany
  private List<Word> words;

  public Category(String name) {
    this.name = name;
  }
}
