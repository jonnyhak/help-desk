-- CREATE DATABASE pernhelpdesk;

CREATE TABLE ticket(
    ticket_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    email VARCHAR(255), 
    userName VARCHAR(255), 
    status VARCHAR(255), 
    reply VARCHAR(255)
);

