DROP DATABASE IF EXISTS petpedia;
CREATE DATABASE petpedia;

\c petpedia; 
--connect to Postgres, 'c' for connect

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS pets;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL,--NOT NULL means mandatory column/input
  email VARCHAR NOT NULL 
);

CREATE TABLE pets (
  id SERIAL PRIMARY KEY,
  owner_id INT REFERENCES users(id) ON DELETE CASCADE,
  species VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  age INT
);

INSERT INTO users(username, email) VALUES ('Corey','corey@corey.corey'), ('Reed', 'bigGains@reed.com');

INSERT INTO pets(owner_id, species, name, age) 
VALUES (1 , 'feline', 'Noboru', 2), (1, 'feline', 'Hatchiko', 95), (2, 'tortoise', 'Tootry', 98);
