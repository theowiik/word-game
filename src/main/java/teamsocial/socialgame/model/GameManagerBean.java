/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package teamsocial.socialgame.model;

import java.util.HashMap;
import java.util.Map;
import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.enterprise.context.ApplicationScoped;
import teamsocial.socialgame.model.dao.CategoryDAO;
import teamsocial.socialgame.model.entity.Category;
import teamsocial.socialgame.model.entity.Game;

@ApplicationScoped
public class GameManagerBean {
  private Map<String, Game> games;
  private int counter;
  
  @EJB
  private CategoryDAO categoryDAO;
  
  @PostConstruct
  private void init() {
    games = new HashMap<String, Game>();
    Category category = getDummyCategory();
    String pin = getUnusedPin();
    games.put(pin, new Game(category, pin));
  }

  public Game getGame(String pin) {
    Game game = games.get(pin);
    return game;
  }

  public Game createGame() {
    String pin = getUnusedPin();
    games.put(pin, new Game(getDummyCategory(), pin));
    return games.get(pin);
  }
  
  private Category getDummyCategory() {
    return categoryDAO.findAll().get(0);
  }
  
  private String getUnusedPin() {
    counter++;
    return String.valueOf(12345 + counter);
  }
}
