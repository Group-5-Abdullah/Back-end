DROP TABLE IF EXISTS readyPackages ;

CREATE TABLE IF NOT EXISTS readyPackages (
    id SERIAL PRIMARY KEY ,
    user_email VARCHAR(255) ,
    gift_title VARCHAR(10000),
    gift_image VARCHAR(10000),
    gift_price VARCHAR(10000),
    flower_image VARCHAR(10000),
    flower_name VARCHAR(10000),
    track_name VARCHAR(10000),
    track_url VARCHAR(10000),
    aritst_name VARCHAR(10000),
    food_title VARCHAR(10000),
    food_image VARCHAR(10000)
);