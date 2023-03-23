DROP TABLE IF EXISTS music ;

CREATE TABLE IF NOT EXISTS music (
    id SERIAL PRIMARY KEY ,
    user_email VARCHAR(255) ,
    track_name VARCHAR(255),
    track_url VARCHAR(255),
    aritst_name VARCHAR(255)
);