package teamsocial.wordgame.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

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
  private Category category;

  public Word(String word, @NotNull String description) {
    this.word = word;
    this.description = description;
  }
}
