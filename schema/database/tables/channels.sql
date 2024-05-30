-- Active: 1715715294984@@127.0.0.1@5432@unify
# PostgreSQL

DROP TABLE IF EXISTS channels;

CREATE TABLE channels (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  listening BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  access_token TEXT NOT NULL,
  CONSTRAINT unique_username UNIQUE (username),
  CONSTRAINT unique_access_token UNIQUE (access_token)
);
