package teamsocial.socialgame.model.entity;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Player implements Serializable {

  private String name;
  private int score;
}
