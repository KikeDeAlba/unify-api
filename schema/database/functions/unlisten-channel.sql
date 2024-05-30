# PostgreSQL
CREATE OR REPLACE FUNCTION unlisten_channel(channel_name TEXT)
  RETURNS VOID AS
$BODY$
BEGIN
  UPDATE channels
  SET listening = FALSE
  WHERE username = channel_name;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE;