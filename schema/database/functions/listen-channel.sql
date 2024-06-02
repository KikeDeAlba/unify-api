-- Active: 1715715294984@@127.0.0.1@5432@unify

# PostgreSQL
CREATE OR REPLACE FUNCTION listen_channel(id NUMERIC, channel_name TEXT)
  RETURNS VOID AS
$BODY$
BEGIN
  INSERT INTO channels (id, username)
  VALUES (id, lower(channel_name))
  ON CONFLICT (username)
  DO UPDATE
  SET listening = TRUE;

  INSERT INTO bot_config (owner, prefix)
  VALUES (id, 'UnifyOfficialBot')
  ON CONFLICT (owner)
  DO NOTHING;

END;
$BODY$
  LANGUAGE plpgsql VOLATILE;