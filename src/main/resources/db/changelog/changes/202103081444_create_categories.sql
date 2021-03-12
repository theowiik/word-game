CREATE TABLE categories
(
  name TEXT UNIQUE PRIMARY KEY,
  CHECK (name ~* '^(\w+\s?)+$')
)