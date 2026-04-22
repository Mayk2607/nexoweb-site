-- Añadir la columna client_code a la tabla clients
ALTER TABLE clients ADD COLUMN IF NOT EXISTS client_code VARCHAR(50);
