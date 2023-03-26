DROP TABLE  IF EXISTS eventinfo ;
CREATE TABLE IF NOT EXISTS eventinfo (
    eventid  SERIAL  PRIMARY KEY,
    event VARCHAR(255),
    location VARCHAR(255) ,
    date VARCHAR(255),
    description VARCHAR(10000),
    user_email varchar(255)
   
   
);