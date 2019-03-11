\c

-- DROP TABLE IF EXISTS users
CREATE TABLE users
(
  user_id INTEGER,
  user_name VARCHAR(50),
  user_age INTEGER,
  user_gender VARCHAR(2),
  last_location VARCHAR(50),
  lat DECIMAL,
  long DECIMAL
)

-- COPY users FROM '/Users/kennywhwu/Desktop/rithm_school/outcomes/challenges/rithm/backend/api-challenge/users.csv' DELIMITER ',' CSV HEADER;