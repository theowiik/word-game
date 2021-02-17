/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package teamsocial.socialgame.resources;

import javax.ws.rs.Path;
import teamsocial.socialgame.model.dao.CategoryDAO;
import java.util.List;
import teamsocial.socialgame.model.entity.Category;

/**
 *
 * @author hento
 */
@Path("category")
public class CategoryResource {

    @EJB
    private CategoryDAO categoryDAO;

    @GET
    public List<Category> categoryList() {
        return categoryDAO.findAll();
    }

}
