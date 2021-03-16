package teamsocial.wordgame.controller.requestwrapper;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CategoryUpdateRequest {

  private final String oldName;
  private final String newName;
}
