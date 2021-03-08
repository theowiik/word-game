package teamsocial.wordgame.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@Table(name = "words")
public class Word implements Serializable {

  @Id
  private String word;

  @Column(name = "description")
  @NotNull
  private String description;

  @ManyToOne(optional = true)
  @JoinColumn(name = "category")
  @Getter(onMethod = @__(@JsonIgnore))
  private Category category;

  public Word(String word, @NotNull String description) {
    this.word = word;
    this.description = description;
  }
}
