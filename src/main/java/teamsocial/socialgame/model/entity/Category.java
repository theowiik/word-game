package teamsocial.socialgame.model.entity;

import java.io.Serializable;
import java.util.List;
import javax.json.bind.annotation.JsonbTransient;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Category implements Serializable {

  @Id
  private String name;

  @Getter(onMethod = @__( @JsonbTransient ))
  @OneToMany(mappedBy = "category")
  private List<Word> words;

  public Category(String name) {
    this.name = name;
  }
}
