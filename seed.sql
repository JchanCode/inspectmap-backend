

DROP DATABASE IF EXISTS rest_rating_interactive_map;
CREATE DATABASE rest_rating_interactive_map;
\connect rest_rating_interactive_map

DROP TABLE IF EXISTS users cascade;
CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
);


DROP TABLE IF EXISTS restaurants cascade;
CREATE TABLE restaurants (
  camis INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  LAT TEXT NOT NULL,
  LNG TEXT NOT NULL
);

DROP TABLE IF EXISTS bookmarks cascade;
CREATE TABLE bookmarks (
  username VARCHAR(25) 
    REFERENCES users ON DELETE CASCADE,
  camis INTEGER 
    REFERENCES restaurants, 
  PRIMARY KEY (username, camis)
);

DROP DATABASE rest_rating_interactive_map_test;
CREATE DATABASE rest_rating_interactive_map_test;
