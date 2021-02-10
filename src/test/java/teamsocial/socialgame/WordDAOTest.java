package teamsocial.socialgame;

import java.io.File;
import javax.ejb.EJB;
import javax.inject.Inject;
import javax.transaction.UserTransaction;
import org.apache.deltaspike.data.api.QueryResult;
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
public class WordDAOTest {

  @EJB
  private WordDAO wordDAO;

  @Inject
  private WordRepository wRepository;
  
    @Inject
  private UserTransaction tx;

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
  public void createWordTest() throws Exception {
    tx.begin();
    String wordName = "Word59054034549038";
    wordDAO.create(new Word(wordName, "Description1"));
    tx.commit();
 
    QueryResult<Word> queryResult = wRepository.findByWord(wordName);
    Word wordInDB = queryResult.getSingleResult();

    Assert.assertEquals(wordInDB.getWord(), wordName);
  }
}
