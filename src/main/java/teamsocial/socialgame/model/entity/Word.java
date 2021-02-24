package teamsocial.socialgame.model.entity;

import java.io.Serializable;
import javax.json.bind.annotation.JsonbTransient;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Word implements Serializable {

  @Id
  private String word;

  @NotNull
  private String description;

  @ManyToOne(optional = true)
  @JoinColumn(name = "CATEGORY_NAME")
  @Getter(onMethod = @__( @JsonbTransient ))
  private Category category;

  public Word(String word, @NotNull String description) {
    this.word = word;
    this.description = description;
  }
}
