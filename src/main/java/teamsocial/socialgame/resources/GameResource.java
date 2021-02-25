package teamsocial.socialgame.resources;

import java.io.Serializable;
import javax.enterprise.context.SessionScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;
import teamsocial.socialgame.model.GameManagerBean;
import teamsocial.socialgame.model.entity.Game;
import teamsocial.socialgame.model.entity.Player;

@Path("games")
@SessionScoped
public class GameResource implements Serializable {

  @Inject
  private GameManagerBean gameManager;
  
  @Inject
  private Player player;

  @POST
  @Path("/{category}")
  public Game createGame(@PathParam("category") String category) {
    return gameManager.createGame(category);
  }

  @GET
  @Path("/{pin}")
  public Response getGame(@PathParam("pin") String pin) {
    Game game = getG(pin);
    if (game == null) {
      throw new NotFoundException("Did not find a game with pin: " + pin);
    }
    return Response.ok(game).build();
  }
  
  @POST
  @Path("/{pin}/answer/{description}")
  public Response setAnswer(@PathParam("pin") String pin, @PathParam("description") String description) {
    gameManager.setAnswer(pin, player, description);
    return Response.ok().build();
  }
  
  private Game getG(String pin) {
    return gameManager.getGame(pin);
  }
}
