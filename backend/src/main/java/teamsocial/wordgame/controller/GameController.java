package teamsocial.wordgame.controller;

import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.annotation.SessionScope;
import org.springframework.web.server.ResponseStatusException;
import teamsocial.wordgame.model.GameManagerBean;
import teamsocial.wordgame.model.PlayerManagerBean;
import teamsocial.wordgame.model.game.Game;
import teamsocial.wordgame.model.game.Player;
import teamsocial.wordgame.websocket.GameChangedPushService;

@RestController
@RequestMapping("/api/v1/games")
@SessionScope
public class GameController implements Serializable {

  @Autowired
  private GameManagerBean gameManager;

  @Autowired
  private PlayerManagerBean playerManager;

  @PostMapping("/{category}")
  public Game create(@PathVariable("category") String category) {
    return gameManager.createGame(category);
  }

  @GetMapping("/{pin}")
  public ResponseEntity<Game> get(@PathVariable("pin") String pin) {
    var game = gameManager.getGame(pin);
    if (game == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Could not find game");
    }
    return ResponseEntity.ok(game);
  }

  @PostMapping("/{pin}/answer/{description}")
  public ResponseEntity setAnswer(
      @PathVariable("pin") String pin,
      @PathVariable("description") String description
  ) {
    try {
      gameManager.setExplanation(pin, playerManager, description);
      return ResponseEntity.ok().build();
    } catch (IllegalStateException e) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Could not save explanation");
    }
  }

  @PostMapping("/{pin}/join/{name}")
  public ResponseEntity joinGame(@PathVariable("pin") String pin,
      @PathVariable("name") String name) {
    var game = gameManager.getGame(pin);
    var player = playerManager.getPlayer();

    if (game == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Could not find game");
    }

    if (player == null) {
      playerManager.setPlayer(new Player(name, 0)); // TODO: Check if already exists.
      game.addPlayer(playerManager.getPlayer());
    }

    return ResponseEntity.ok().build();
  }
}
