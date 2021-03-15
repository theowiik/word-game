package teamsocial.wordgame.model.game;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
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
  private Map<Player, String> selectedExplanations = new HashMap<>();

  private State state;
  private Word word;

  /**
   * The unix time in milliseconds when the current state started.
   */
  private long currentStateStartedAt;

  public Round(Category category, RoundChanged roundChangedImpl) {
    roundFinishedListeners = new ArrayList<>();
    explanations = new HashMap<>();
    this.roundChangedImpl = roundChangedImpl;
    setRandomWord(category);
  }

  /**
   * Returns a list of all the explanations including the correct one.
   *
   * @return a list of all the explanations including the correct one.
   */
  public List<String> getAllExplanations() {
    var explanations = new ArrayList<String>();
    explanations.addAll(this.explanations.values());
    explanations.add(word.getDescription());
    Collections.shuffle(explanations);
    return explanations;
  }

  private void setRandomWord(Category category) {
    var rand = new java.util.Random();
    var words = category.getWords();

    if (words == null || words.isEmpty()) {
      throw new IllegalStateException("Can not start a game with a category with no words");
    }

    word = words.get(rand.nextInt(words.size()));
  }

  public String getCurrentWord() {
    return word.getWord();
  }

  public Long getCurrentStateEndTime() {
    if (getState() != null){
      return getCurrentStateStartedAt() + getState().getDurationMilliSeconds();
    } else {
      return null;
    }
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

  private String getCorrectExplanation() {
    return word.getDescription();
  }

  /**
   * @return a list of players who guessed correctly.
   */
  public Set<Player> correctPlayers() {
    var correctExplanation = this.word.getDescription();
    Set<Player> correctPlayers = new HashSet<>();
    for (var e : selectedExplanations.entrySet()) {
      if (e.getValue().equals(getCorrectExplanation())) {
        correctPlayers.add(e.getKey());
      }
    }
    return correctPlayers;
  }

  void selectExplanation(Player player, String selectedExplanation) {
    if (state != State.SELECT_EXPLANATION) {
      throw new IllegalStateException();
    }
    selectedExplanations.put(player, selectedExplanation);
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
    PRESENT_WORD_INPUT_EXPLANATION(20),
    SELECT_EXPLANATION(15),
    PRESENT_ANSWER(50),
    PRESENT_SCORE(15);

    private final int durationSeconds;

    State(int durationSeconds) {
      this.durationSeconds = durationSeconds;
    }

    public int getDurationSeconds() {
      return durationSeconds;
    }

    public int getDurationMilliSeconds() {
      return durationSeconds * 1000;
    }
  }

  public interface RoundFinishedListeners {
    void notifyRoundFinished();
  }

  interface RoundChanged {

    void performOnRoundStateChanged();
  }

  public Player whoWrote(String explanation) {
    for (var entry : explanations.entrySet()) {
      if (entry.getValue().equals(explanation)) {
        return entry.getKey();
      }
    }

    return null;
  }

  public boolean isCorrect(String explanation) {
    return explanation.equals(word.getDescription());
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
