-- color : 'blue',
-- brand : "Mike",
-- price : 350,
-- size: 3,
-- in_stock : 5


CREATE TABLE shoes (
    id SERIAL PRIMARY KEY,
    brand TEXT NOT NULL,
    color TEXT NOT NULL,
    size INTEGER NOT NULL,
    price INTEGER NOT NULL,
    in_stock INTEGER NOT NULL DEFAULT 1
);

