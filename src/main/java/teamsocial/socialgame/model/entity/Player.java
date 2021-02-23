package teamsocial.socialgame.model.entity;

import java.io.Serializable;
import lombok.Data;

@Data
public class Player implements Serializable {
  private String id;
  private int score;
}
