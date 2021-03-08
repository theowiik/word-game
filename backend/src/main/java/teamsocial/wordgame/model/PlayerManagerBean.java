package teamsocial.wordgame.model;

import java.io.Serializable;
import lombok.Data;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;
import teamsocial.wordgame.model.game.Player;

@Data
@SessionScope
@Component
public class PlayerManagerBean implements Serializable {

  private Player player;
}
