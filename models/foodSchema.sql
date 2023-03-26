DROP TABLE IF EXISTS food ;

CREATE TABLE IF NOT EXISTS food(
  id SERIAL PRIMARY KEY,
  user_email VARCHAR(255),
  food_title VARCHAR(255),
  food_image VARCHAR(255),
  eventid INTEGER,CONSTRAINT fk_customer FOREIGN KEY (eventid) REFERENCES eventinfo(eventid)
);