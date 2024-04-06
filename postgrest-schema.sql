CREATE TABLE api.messages (
  id serial PRIMARY KEY,
  username text,
  message text NOT NULL
);