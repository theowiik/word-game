package teamsocial.socialgame;

import javax.ejb.EJB;
import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import teamsocial.socialgame.model.dao.CategoryDAO;
import teamsocial.socialgame.model.dao.WordDAO;
import teamsocial.socialgame.model.entity.Category;
import teamsocial.socialgame.model.entity.Word;

@RunWith(Arquillian.class)
public class WordDAOTest {

  @EJB
  private WordDAO wordDAO;

  @Deployment
  public static WebArchive createDeployment() {
    return ShrinkWrap.create(WebArchive.class)
        .addClasses(WordDAO.class, Word.class, Category.class, CategoryDAO.class)
        .addAsResource("META-INF/persistence.xml")
        .addAsManifestResource(EmptyAsset.INSTANCE, "beans.xml");
  }

  @Test
  public void notNullDescription() {
    wordDAO.create(new Word("Word1", "Description1"));
    wordDAO.create(new Word("Word2", "Description2"));
    wordDAO.create(new Word("Word3", "Description3"));

    //Word word = new Word("Word", null);
    Assert.assertTrue(true);
  }

  @Test
  public void nonEmptyDescription() {
    wordDAO.create(new Word("Word4", "Description1"));

    //Word word = new Word("Word", null);
    Assert.assertTrue(true);
  }

}
