package teamsocial.wordgame.model.game;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.*;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import teamsocial.wordgame.model.entity.Category;
import teamsocial.wordgame.model.entity.Word;

@Getter
@Setter
@NoArgsConstructor
public class Round implements Serializable {

  @Getter(onMethod = @__(@JsonIgnore))
  private RoundChanged roundChangedImpl;

  @Getter(onMethod = @__(@JsonIgnore))
  private List<RoundFinishedListeners> roundFinishedListeners;

  /**
   * The explanations the players come up with.
   */
  private Map<Player, String> explanations = new HashMap<>();

  /**
   * The explanation the players think is the correct answer.
   */
  private Map<Player, String> chosenExplanations = new HashMap<>();

  private State state;
  private Word word;

  /**
   * The unix time in milliseconds when the current state started.
   */
  private long currentStateStartedAt;

  public List<String> getAllExplanations(){
    List<String> explanations = new ArrayList<>();
    explanations.addAll(this.explanations.values());
    explanations.add(word.getDescription());
    Collections.shuffle(explanations);
    return explanations;
  }

  public Round(Category category, RoundChanged roundChangedImpl) {
    roundFinishedListeners = new ArrayList<>();
    explanations = new HashMap<>();
    this.roundChangedImpl = roundChangedImpl;
    setRandomWord(category);
  }

  private void setRandomWord(Category category){
    var rand = new java.util.Random();
    var words = category.getWords();

    if (words == null || words.isEmpty()) {
      throw new IllegalStateException("Can not start a game with a category with no words");
    }

    word = words.get(rand.nextInt(words.size()));
  }

  public interface RoundFinishedListeners {

    void notifyRoundFinished();
  }

  public void addRoundFinishedListener(RoundFinishedListeners listener) {
    roundFinishedListeners.add(listener);
  }

  /**
   * Sets the answer for the player.
   *
   * @param player      the player that wants to add the word.
   * @param description the description of the word.
   */
  public void addPlayerExplanation(Player player, String description) {
    if (player == null
      || !validDescription(description)
      || state != State.PRESENT_WORD_INPUT_EXPLANATION
    ) {
      throw new IllegalStateException();
    }
    explanations.put(player, description);
  }


  public String correctAnswer() {
    return word.getDescription();
  }


  /**
   * @return The list of players who guessed correctly
   */

  public Set<Player> correctPlayers() {
    var correctExplanation = this.word.getDescription();
    Set<Player> correctPlayers = new HashSet<>();
    for (Map.Entry<Player, String> e : chosenExplanations.entrySet()) {
      if (e.getValue().equals(correctAnswer())) {
        correctPlayers.add(e.getKey());
      }
    }
    return correctPlayers;
  }

  void pickExplanation(Player player, String chosenExplanation) {
    if (state != State.SELECT_EXPLANATION
    ) {
      throw new IllegalStateException();
    }
    chosenExplanations.put(player, chosenExplanation);
  }


  private boolean validDescription(String string) {

    // Has content
    if (string == null || string.isEmpty()) {
      return false;
    }

    // Valid length
    return string.length() > 1 && string.length() < 50;
  }

  public void start() {
    enterPresentWordInputExplanation();
  }

  private void enterPresentWordInputExplanation() {
    this.state = State.PRESENT_WORD_INPUT_EXPLANATION;
    currentStateStartedAt = now();
    roundChangedImpl.performOnRoundStateChanged();
    callAfter(this::enterSelectExplanation, state.getDurationSeconds());
  }

  private void enterSelectExplanation() {
    this.state = State.SELECT_EXPLANATION;
    currentStateStartedAt = now();
    roundChangedImpl.performOnRoundStateChanged();
    callAfter(this::enterPresentAnswer, state.getDurationSeconds());
  }

  private void enterPresentAnswer() {
    state = State.PRESENT_ANSWER;
    currentStateStartedAt = now();
    roundChangedImpl.performOnRoundStateChanged();
    callAfter(this::enterPresentScore, state.getDurationSeconds());
  }

  private void enterPresentScore() {
    state = State.PRESENT_SCORE;
    currentStateStartedAt = now();
    roundChangedImpl.performOnRoundStateChanged();
    callAfter(this::notifyRoundFinishedListeners, state.getDurationSeconds());
  }

  private void notifyRoundFinishedListeners() {
    for (var o : roundFinishedListeners) {
      o.notifyRoundFinished();
    }
  }

  /**
   * Runs the invokable method after {@code delayInSeconds} seconds.
   *
   * @param invokable      the method to invoke.
   * @param delayInSeconds the time in seconds to delay.
   */
  private void callAfter(Invokable invokable, int delayInSeconds) {
    ScheduledThreadPoolExecutor exec = new ScheduledThreadPoolExecutor(1);
    exec.schedule(invokable::perform, delayInSeconds, TimeUnit.SECONDS);
  }

  public enum State {
    PRESENT_WORD_INPUT_EXPLANATION(10),
    SELECT_EXPLANATION(10),
    PRESENT_ANSWER(10),
    PRESENT_SCORE(6);

    private final int durationSeconds;

    State(int durationSeconds) {
      this.durationSeconds = durationSeconds;
    }

    public int getDurationSeconds() {
      return durationSeconds;
    }
  }

  interface RoundChanged {

    void performOnRoundStateChanged();
  }

  /**
   * Gets the current unix time in milliseconds.
   *
   * @return the current unix time in milliseconds.
   */
  private long now() {
    return System.currentTimeMillis();
  }

  private interface Invokable {

    void perform();
  }
}
