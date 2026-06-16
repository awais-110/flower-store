INSERT INTO settings (key, value) VALUES ('site', '{"name":"VideoSnap"}'::jsonb) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
