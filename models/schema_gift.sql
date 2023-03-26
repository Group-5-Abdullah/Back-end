DROP TABLE IF EXISTS gifts ;

CREATE TABLE IF NOT EXISTS gifts(
    id SERIAL PRIMARY KEY,
  gift_title VARCHAR(255),
  gift_image VARCHAR(255),
  gift_price VARCHAR(255),
  gift_quantity VARCHAR(255),
  user_email VARCHAR(255),
  eventid INTEGER,CONSTRAINT fk_customer FOREIGN KEY (eventid) REFERENCES eventinfo(eventid)
);