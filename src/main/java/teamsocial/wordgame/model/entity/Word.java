package teamsocial.wordgame.model.entity;

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
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "words")
public class Word implements Serializable {

  @Id
  private String word;

  @Column(name = "description")
  @NotNull
  private String description;

  @ManyToOne(optional = true)
  @JoinColumn(name = "category")
  @NotNull
  private Category category;
}
