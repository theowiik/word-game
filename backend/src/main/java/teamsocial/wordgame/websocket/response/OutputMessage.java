package teamsocial.wordgame.websocket.response;

public class OutputMessage {

  private final String from;
  private final String text;
  private final String time;

  public OutputMessage(final String from, final String text, final String time) {

    this.from = from;
    this.text = text;
    this.time = time;
  }

  public String getText() {
    return text;
  }

  public String getTime() {
    return time;
  }

  public String getFrom() {
    return from;
  }
}
