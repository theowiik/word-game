package teamsocial.socialgame.model.entity;

import java.io.Serializable;
import lombok.Data;

@Data
public class Answer implements Serializable {
  private Player player;
  private String answer;
}
