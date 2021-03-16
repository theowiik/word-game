CREATE TABLE words
(
  word        TEXT UNIQUE PRIMARY KEY,
  description TEXT NOT NULL,
  category    TEXT NOT NULL REFERENCES categories (name)
)