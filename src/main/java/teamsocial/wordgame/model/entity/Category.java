package teamsocial.wordgame.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "categories")
public class Category implements Serializable {

  @Id
  @Column(name = "name")
  private String name;

  @OneToMany(mappedBy = "category")
  @Getter(onMethod = @__(@JsonIgnore))
  private List<Word> words;

  public Category(String name) {
    this.name = name;
  }
}
