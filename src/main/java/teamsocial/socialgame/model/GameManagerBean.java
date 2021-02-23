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
  
  @EJB
  private CategoryDAO categoryDAO;
  
  @PostConstruct
  private void init() {
    games = new HashMap<String, Game>();
    Category category = categoryDAO.findAll().get(0);
    games.put("hello", new Game(category));
  }

  public Game getGame(String pin) {
    System.out.println("lorem");
    Game game = games.get(pin);
    System.out.println(game);
    return game;
  }
}
