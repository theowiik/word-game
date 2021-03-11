CREATE TABLE words
(
  word        TEXT UNIQUE PRIMARY KEY,
  description TEXT NOT NULL,
  category    TEXT REFERENCES categories (name)
)