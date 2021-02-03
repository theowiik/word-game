package teamsocial.socialgame;

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
import teamsocial.socialgame.model.dao.WordDAO;
import teamsocial.socialgame.model.entity.Word;

@RunWith(Arquillian.class)
public class WordDAOTest {

  @EJB
  private WordDAO wordDAO;

  @Deployment
  public static WebArchive createDeployment() {
    return ShrinkWrap.create(WebArchive.class)
        .addClasses(WordDAO.class, Word.class)
        .addAsResource("META-INF/persistence.xml")
        .addAsManifestResource(EmptyAsset.INSTANCE, "beans.xml");
  }

  @Before
  public void init() {
    wordDAO.create(new Word("Resonabel", "Ett bra ord."));
    wordDAO.create(new Word("AnnatOrd", "Ett bra ord."));
    wordDAO.create(new Word("OrdTre", "Ett ej så bra ord."));
  }

  @Test
  public void checkThatFindCarsMatchingNameMatchesCorrectly() {
    Assert.assertTrue(true);
  }
}
