package teamsocial.socialgame.model.entity;

import java.io.Serializable;
import java.util.ArrayList;
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
  @OneToMany(mappedBy = "category")
  private List<Word> words = new ArrayList<Word>();
  
  public Category(String name) {
    this.name = name;
  }
}
