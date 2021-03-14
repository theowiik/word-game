package teamsocial.wordgame.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

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
