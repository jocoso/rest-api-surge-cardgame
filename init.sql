CREATE TABLE characters
(
    ID SERIAL PRIMARY KEY,
    name varchar(30) NOT NULL
)

INSERT INTO characters
    (name)
VALUES
    ('Priest'),
    ('Miriam')