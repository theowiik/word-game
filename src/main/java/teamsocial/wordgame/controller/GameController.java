package teamsocial.wordgame.controller;

import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.annotation.SessionScope;
import org.springframework.web.server.ResponseStatusException;
import teamsocial.wordgame.model.GameManagerBean;
import teamsocial.wordgame.model.UserBean;
import teamsocial.wordgame.model.game.Game;
import teamsocial.wordgame.model.game.Player;

@RestController
@RequestMapping("/api/v1/games")
@SessionScope // TODO Can this be ApplicationScope?
public class GameController implements Serializable {

  @Autowired
  private GameManagerBean gameManager;

  @Autowired
  private UserBean userBean;

  @GetMapping("/{pin}")
  public ResponseEntity get(@PathVariable("pin") String pin) {
    var game = gameManager.getGameByPin(pin);

    if (game == null) {
      return ResponseEntity.notFound().build();
    } else {
      return ResponseEntity.noContent().build();
    }
  }

  @PostMapping("/")
  public ResponseEntity<Game> create(@RequestParam("category") String category) {
    Game game;

    try {
      game = gameManager.createGame(category);
    } catch (IllegalArgumentException e) {
      throw new ResponseStatusException(
        HttpStatus.BAD_REQUEST, "No category with name " + category
      );
    } catch (IllegalStateException e) {
      throw new ResponseStatusException(
        HttpStatus.BAD_REQUEST, "Cant create a game with a category that has no words" + category
      );
    }

    return ResponseEntity.ok(game);
  }

  @PostMapping("/{pin}/add_explanation")
  public ResponseEntity addExplanation(
    @PathVariable("pin") String pin,
    @RequestParam("explanation") String explanation
  ) {
    try {
      var game = getGame(pin);
      game.addExplanation(userBean.getPlayer(), explanation);
      return ResponseEntity.ok().build();
    } catch (IllegalStateException e) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Could not add player explanation");
    }
  }

  @PostMapping("/{pin}/select")
  public ResponseEntity pickExplanation(
    @PathVariable("pin") String pin,
    @RequestParam("explanation") String explanation
  ) {
    try {
      var game = getGame(pin);
      game.selectExplanation(userBean.getPlayer(), explanation);
      return ResponseEntity.ok().build();
    } catch (IllegalStateException e) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Could not pick explanation");
    }
  }

  @PostMapping("/{pin}/join")
  public ResponseEntity joinGame(
    @PathVariable("pin") String pin,
    @RequestParam("name") String name
  ) {
    var game = getGame(pin);

    if (game.isStarted()) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body("The game has started already");
    }

    if (userBean.getPlayer() == null) {
      userBean.setPlayer(new Player(name));
    }

    if (!game.playerIsJoined(userBean.getPlayer())) {
      game.addPlayer(userBean.getPlayer());
    }

    game.notifyGameChangedObservers();

    return ResponseEntity.ok().build();
  }

  @GetMapping("/{pin}/whoami")
  public ResponseEntity<String> getWhoAmI(@PathVariable("pin") String pin) {

    var game = gameManager.getGameByPin(pin);
    if (game == null) {
      return ResponseEntity.notFound().build();
    }

    var player = userBean.getPlayer();
    if (player == null) {
      return ResponseEntity.notFound().build();
    }

    if (!game.getPlayers().contains(player)) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    return ResponseEntity.ok(player.getName());

  }

  @PostMapping("/{pin}/start")
  public ResponseEntity startGame(@PathVariable("pin") String pin) {
    var game = getGame(pin);

    if (game.isStarted()) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Game already started");
    }

    game.startGame();

    return ResponseEntity.ok().build();
  }

  private Game getGame(String pin) {
    var game = gameManager.getGameByPin(pin);

    if (game == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Could not find game");
    }

    return game;
  }

}
