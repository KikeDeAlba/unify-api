-- Active: 1715715294984@@127.0.0.1@5432@unify

# PostgreSQL
CREATE OR REPLACE FUNCTION listen_channel(channel_name TEXT, access_token TEXT)
  RETURNS VOID AS
$BODY$
BEGIN
  INSERT INTO channels (username, access_token)
  VALUES (lower(channel_name), access_token)
  ON CONFLICT (username)
  DO UPDATE
  SET listening = TRUE;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE;