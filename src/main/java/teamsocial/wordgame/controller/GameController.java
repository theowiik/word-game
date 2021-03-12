package teamsocial.wordgame.controller;

import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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

  @PostMapping("/")
  public Game create(@RequestParam("category") String category) {
    return gameManager.createGame(category);
  }

  @GetMapping("/{pin}")
  public ResponseEntity<Game> get(@PathVariable("pin") String pin) {
    var game = getGame(pin);
    return ResponseEntity.ok(game);
  }

  @PostMapping("/{pin}/answer")
  public ResponseEntity setAnswer(
      @PathVariable("pin") String pin,
      @RequestParam("description") String description
  ) {
    try {
      var game = getGame(pin);
      game.setExplanation(userBean.getPlayer(), description);
      return ResponseEntity.ok().build();
    } catch (IllegalStateException e) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Could not save explanation");
    }
  }

  @PostMapping("/{pin}/join/")
  public ResponseEntity joinGame(
      @PathVariable("pin") String pin,
      @RequestParam("name") String name
  ) {
    var game = getGame(pin);

    if (userBean.getPlayer() == null) {
      System.out.println("NY SPELARE");
      userBean.setPlayer(new Player(name));
      game.addPlayer(userBean.getPlayer());
    } else {
      System.out.println("GAMMAL SPELARE");
    }

    return ResponseEntity.ok().build();
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
