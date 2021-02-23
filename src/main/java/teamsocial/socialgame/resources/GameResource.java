package teamsocial.socialgame.resources;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import teamsocial.socialgame.model.GameManagerBean;
import teamsocial.socialgame.model.entity.Game;

@Path("games")
public class GameResource {

  @Inject
  private GameManagerBean gameManager;
  
  @POST
  public Game createGame() {
    return gameManager.createGame();
  }
  
  @GET
  @Path("/{pin}")
  public Game getGame(@PathParam("pin") String pin) {
    return gameManager.getGame(pin);
  }
}
