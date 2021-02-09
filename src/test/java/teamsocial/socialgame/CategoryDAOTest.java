package teamsocial.socialgame;

import java.util.List;
import javax.ejb.EJB;
import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import teamsocial.socialgame.model.dao.CategoryDAO;
import teamsocial.socialgame.model.dao.WordDAO;
import teamsocial.socialgame.model.entity.Category;
import teamsocial.socialgame.model.entity.Word;

@RunWith(Arquillian.class)
public class CategoryDAOTest {

  @EJB
  private CategoryDAO categoryDAO;

  @EJB
  private WordDAO wordDAO;

  @Deployment
  public static WebArchive createDeployment() {
    return ShrinkWrap.create(WebArchive.class)
        .addClasses(CategoryDAO.class, Category.class, WordDAO.class, Word.class)
        .addAsResource("META-INF/persistence.xml")
        .addAsManifestResource(EmptyAsset.INSTANCE, "beans.xml");
  }

  @Before
  public void init() {
    wordDAO.create(new Word("CategoryWord1", "Description"));
    wordDAO.create(new Word("CategoryWord2", "Description"));
    wordDAO.create(new Word("CategoryWord3", "Description"));

    categoryDAO.create(new Category("IT-ord"));
    categoryDAO.create(new Category("Matord"));
  }

  @Test
  public void addWordsToCategory() {
    //Category category = categoryDAO.findAll().get(0);
    //Word word1 = wordDAO.findAll().get(0);
    //List<Word> words = category.getWords();
    //words.add(word1);
//
    //if (words == null) {
    //  System.out.println("null (Lorem)");
    //} else {
    //  System.out.println("not null (Lorem)");
    //}
//
    //categoryDAO.getEntityManager().merge(category);
    //wordDAO.getEntityManager().refresh(word1);
//
    //Assert.assertTrue(word1.getCategory() != null);
  }
}
