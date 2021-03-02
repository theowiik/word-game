package teamsocial.socialgame.encoder;

import javax.json.JsonObject;
import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

public class JSONTextEncoder implements Encoder.Text<JsonObject> {

  @Override
  public String encode(JsonObject object) throws EncodeException {
    return object.toString();
  }

  @Override
  public void init(EndpointConfig config) {
  }

  @Override
  public void destroy() {
  }
}