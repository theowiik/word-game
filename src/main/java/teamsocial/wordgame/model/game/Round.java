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
   * Returns a shuffled list of all the explanations including the correct one.
   *
   * @return a shuffled list of all the explanations including the correct one.
   */
  public List<String> getAllExplanations() {
    var output = new ArrayList<>(explanations.values());
    output.add(word.getDescription());
    Collections.shuffle(output);
    return output;
  }

  /**
   * Sets a random word as the word of the round.
   *
   * @param category the category the word should be collected from
   */
  private void setRandomWord(Category category) {
    var rand = new java.util.Random();
    var words = category.getWords();

    if (words == null || words.isEmpty()) {
      throw new IllegalStateException("Can not start a game with a category with no words");
    }

    word = words.get(rand.nextInt(words.size()));
  }

  /**
   * Gets the word of the round
   *
   * @return the word of the round
   */
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

  /**
   * Add a listener to the list of roundFinishedlisteners
   *
   * @param listener the listener to add
   */
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

  /**
   * Get the correct explanation of the word of the round.
   *
   * @return the string of the correct explanation
   */
  public String getCorrectExplanation() {
    return word.getDescription();
  }

  /**
   *
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


  /**
   *  If the round is in the correct state the player selects an explanation
   *
   * @param player the player that selects an explanation
   * @param selectedExplanation the selected explanation
   */
  void selectExplanation(Player player, String selectedExplanation) {
    if (state != State.SELECT_EXPLANATION) {
      throw new IllegalStateException();
    }
    selectedExplanations.put(player, selectedExplanation);
  }

  /**
   * Checks if a given string is a valid description
   * @param string the string to check if it is valid
   * @return boolean if it is valid or not
   */
  private boolean validDescription(String string) {

    // Has content
    if (string == null || string.isEmpty()) {
      return false;
    }

    // Valid length
    return string.length() > 1 && string.length() < 50;
  }

  /**
   * Starts a round. Call first state.
   */
  public void start() {
    enterPresentWordInputExplanation();
  }

  /**
   * Keep the state during its duration and then call enterSelectExplanation
   */
  private void enterPresentWordInputExplanation() {
    this.state = State.PRESENT_WORD_INPUT_EXPLANATION;
    currentStateStartedAt = now();
    roundChangedImpl.performOnRoundStateChanged();
    callAfter(this::enterSelectExplanation, state.getDurationSeconds());
  }

  /**
   * Keep the state during its duration and then call enterPresentAnswer
   */
  private void enterSelectExplanation() {
    this.state = State.SELECT_EXPLANATION;
    currentStateStartedAt = now();
    roundChangedImpl.performOnRoundStateChanged();
    callAfter(this::enterPresentAnswer, state.getDurationSeconds());
  }

  /**
   * Keep the state during its duration and then call enterPresentScore
   */
  private void enterPresentAnswer() {
    state = State.PRESENT_ANSWER;
    currentStateStartedAt = now();
    roundChangedImpl.performOnRoundStateChanged();
    callAfter(this::enterPresentScore, state.getDurationSeconds());
  }

  /**
   * Keep the state during its duration and then call notifyRoundFinishedListeners
   */
  private void enterPresentScore() {
    state = State.PRESENT_SCORE;
    currentStateStartedAt = now();
    roundChangedImpl.performOnRoundStateChanged();
    callAfter(this::notifyRoundFinishedListeners, state.getDurationSeconds());
  }

  /**
   * Iterate over all listeners and call notifyRoundFinished
   */
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

  /**
   *  Check how many player chosed a given explanation
   *
   * @param player the player to exlude
   * @param explanation the explanation to check who many chosed
   * @return
   */
  public int countWhoManyChosed(Player player, String explanation) {
    var n = 0;
    for (var e : selectedExplanations.entrySet()) {
      if (explanation.equals(e.getValue()) && e.getKey() != player) {
        n++;
      }
    }
    return n;
  }

  /**
   * Enum that holds State and its duration
   */
  public enum State {
    PRESENT_WORD_INPUT_EXPLANATION(60),
    SELECT_EXPLANATION(7 * (3 + 1)),
    PRESENT_ANSWER(10 * (3 + 1)),
    PRESENT_SCORE(15);

    private final int durationSeconds;

    State(int durationSeconds) {
      this.durationSeconds = durationSeconds;
    }

    /**
     * Get the duration seconds of a state
     *
     * @return int of seconds
     */
    public int getDurationSeconds() {
      return durationSeconds;
    }

    /**
     * Convert duration seconds to milliseconds
     * @return int of milliseconds
     */
    public int getDurationMilliSeconds() {
      return durationSeconds * 1000;
    }
  }

  /**
   * Interface for listeners of the round
   */
  public interface RoundFinishedListeners {
    void notifyRoundFinished();
  }

  /**
   * Interface holding method for state changes of the round
   */
  interface RoundChanged {
    void performOnRoundStateChanged();
  }

  /**
   * Checks if a given explanation is the correct explanation
   *
   * @param explanation string of an explanation
   * @return boolean value if it is true or not
   */
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
