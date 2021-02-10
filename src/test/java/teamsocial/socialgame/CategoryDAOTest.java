package teamsocial.socialgame;

import java.io.File;
import javax.ejb.EJB;
import javax.inject.Inject;
import javax.transaction.UserTransaction;
import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.jboss.shrinkwrap.resolver.api.maven.Maven;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import teamsocial.socialgame.model.EntityManagerProducer;
import teamsocial.socialgame.model.dao.CategoryDAO;
import teamsocial.socialgame.model.dao.WordDAO;
import teamsocial.socialgame.model.dao.WordRepository;
import teamsocial.socialgame.model.entity.Category;
import teamsocial.socialgame.model.entity.Word;

@RunWith(Arquillian.class)
public class CategoryDAOTest {

  @Inject
  private UserTransaction tx;

  @Inject
  private WordRepository wRepository;

  @EJB
  private WordDAO wordDAO;

  @EJB
  private CategoryDAO categoryDAO;

  @Deployment
  public static WebArchive createDeployment() {
    final File[] files = Maven.resolver().loadPomFromFile("pom.xml").
        importRuntimeDependencies().resolve().withTransitivity().asFile();
    return ShrinkWrap.create(WebArchive.class)
        .addClasses(WordDAO.class, Word.class, Category.class, CategoryDAO.class,
            EntityManagerProducer.class, WordRepository.class)
        .addAsResource("META-INF/persistence.xml")
        .addAsResource("META-INF/beans.xml")
        .addAsLibraries(files);
  }

  @Test
  public void addWordToCategory() throws Exception {
    tx.begin();
    String theString = "myString9049450345890";

    Word myWord = new Word(theString, "desc");
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
