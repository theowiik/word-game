package teamsocial.socialgame.model.entity;

import java.io.Serializable;
import javax.enterprise.context.SessionScoped;
import lombok.Data;

@Data
@SessionScoped
public class Player implements Serializable {

  private String name;
  private int score;
}
