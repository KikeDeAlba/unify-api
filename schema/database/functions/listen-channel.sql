-- Active: 1715715294984@@127.0.0.1@5432@unify

# PostgreSQL
CREATE OR REPLACE FUNCTION listen_channel(channel_name TEXT)
  RETURNS VOID AS
$BODY$
BEGIN
  INSERT INTO channels (username)
  VALUES (channel_name)
  ON CONFLICT (username)
  DO UPDATE
  SET listening = TRUE;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE;