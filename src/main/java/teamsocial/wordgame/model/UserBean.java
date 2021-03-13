package teamsocial.wordgame.model;

import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;
import teamsocial.wordgame.model.game.Player;

@Getter
@Setter
@SessionScope
@Component
public class UserBean implements Serializable {

  private Player player;
}
