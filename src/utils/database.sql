CREATE TABLE
  types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL
  );

CREATE TABLE
  products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    type_id INTEGER,
    FOREIGN KEY (type_id) REFERENCES types (id)
  );