package teamsocial.socialgame;

import java.util.List;
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
  public void addWordsToCategory() throws Exception {
    tx.begin();
    categoryDAO.create(new Category("CategoryName"));
    wordDAO.create(new Word("CategoryWord1", "Description"));

    Category category = categoryDAO.findAll().get(0);
    Word word1 = wordDAO.findAll().get(0);
    List<Word> words = category.getWords();
    //words.add(word1);
    word1.setCategory(category);
    //wordDAO.getEntityManager().flush();
    //categoryDAO.getEntityManager().merge(category);
    wordDAO.getEntityManager().merge(word1);
    tx.commit();

    System.out.println("lorem");
    System.out.println("Kategoriens ord: " + category.getWords());
    System.out.println("Ordets kategori: " + word1.getCategory());

    Assert.assertTrue(word1.getCategory() != null);
    Assert.assertTrue(true);
  }
}
