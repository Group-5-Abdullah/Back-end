DROP TABLE IF EXISTS flowers ;

CREATE TABLE IF NOT EXISTS flowers(
 id SERIAL PRIMARY KEY,
 user_email VARCHAR(255),
 flower_title VARCHAR(255),
 flower_image VARCHAR(255)

);