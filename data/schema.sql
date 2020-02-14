-- -----------------------------------------------------
-- Table users
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  password VARCHAR(255) NOT NULL
);


-- -----------------------------------------------------
-- Table comparisons
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS comparisons (
  id SERIAL PRIMARY KEY,
  first_student_name VARCHAR(20) NOT NULL,
  first_file_url VARCHAR(20) NOT NULL,
  second_student_name VARCHAR(20) NOT NULL,
  second_file_url VARCHAR(20) NOT NULL,
  results JSON NOT NULL
);