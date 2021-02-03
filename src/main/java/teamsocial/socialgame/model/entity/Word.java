package teamsocial.socialgame.model.entity;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "words")
public class Word implements Serializable {

  @Id
  private String word;

  @NotNull
  private String description;

  @ManyToOne
  private Category category;

  public Word(String word, @NotNull String description, Category category) {
    this.word = word;
    this.description = description;
    this.category = category;
  }

  public Word() {
  }

  public String getWord() {
    return this.word;
  }

  public @NotNull String getDescription() {
    return this.description;
  }

  public void setDescription(@NotNull String description) {
    this.description = description;
  }

  public void setWord(String word) {
    this.word = word;
  }

  public Category getCategory() {
    return this.category;
  }

  public void setCategory(Category category) {
    this.category = category;
  }

  public boolean equals(final Object o) {
    if (o == this) {
      return true;
    }
    if (!(o instanceof Word)) {
      return false;
    }
    final Word other = (Word) o;
    if (!other.canEqual(this)) {
      return false;
    }
    final Object this$word = this.getWord();
    final Object other$word = other.getWord();
    if (this$word == null ? other$word != null : !this$word.equals(other$word)) {
      return false;
    }
    final Object this$description = this.getDescription();
    final Object other$description = other.getDescription();
    if (this$description == null ? other$description != null
        : !this$description.equals(other$description)) {
      return false;
    }
    final Object this$category = this.getCategory();
    final Object other$category = other.getCategory();
    return this$category == null ? other$category == null : this$category.equals(other$category);
  }

  protected boolean canEqual(final Object other) {
    return other instanceof Word;
  }

  public int hashCode() {
    final int PRIME = 59;
    int result = 1;
    final Object $word = this.getWord();
    result = result * PRIME + ($word == null ? 43 : $word.hashCode());
    final Object $description = this.getDescription();
    result = result * PRIME + ($description == null ? 43 : $description.hashCode());
    final Object $category = this.getCategory();
    result = result * PRIME + ($category == null ? 43 : $category.hashCode());
    return result;
  }

  public String toString() {
    return "Word(word=" + this.getWord() + ", description=" + this.getDescription() + ", category="
        + this.getCategory() + ")";
  }
}
