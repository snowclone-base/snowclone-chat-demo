CREATE OR REPLACE FUNCTION notify_db_changes()
RETURNS TRIGGER AS $$
BEGIN
   PERFORM pg_notify('db_changes', json_build_object(
     'username', NEW.username,
     'message', NEW.message
    )::text);
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to execute the function on messages changes
CREATE TRIGGER db_changes_trigger
AFTER INSERT OR UPDATE OR DELETE ON api.messages
FOR EACH ROW
EXECUTE FUNCTION notify_db_changes();