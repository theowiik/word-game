package teamsocial.socialgame;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.transaction.UserTransaction;
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
public class CategoryDAOTest {

  @Inject
  private UserTransaction tx;

  @EJB
  private WordDAO wordDAO;

  @EJB
  private CategoryDAO categoryDAO;

  @Deployment
  public static WebArchive createDeployment() {
    return ShrinkWrap.create(WebArchive.class)
            .addClasses(CategoryDAO.class, Category.class, WordDAO.class, Word.class)
            .addAsResource("META-INF/persistence.xml")
            .addAsManifestResource(EmptyAsset.INSTANCE, "beans.xml");
  }

  @Test
  public void coolTest() throws Exception {
    tx.begin();
    Word myWord = new Word("myWord", "desc");
    Category cat = new Category("cat");
    myWord.setCategory(cat);

    categoryDAO.create(cat);
    wordDAO.create(myWord);

    Category newCat = categoryDAO.findAll().get(0);
    categoryDAO.getEntityManager().refresh(newCat);
    tx.commit();

    Word wordInCat = newCat.getWords().get(0);

    Assert.assertTrue(newCat.getWords().size() > 0);
    Assert.assertEquals(wordInCat.getWord(), myWord.getWord());
  }
}
