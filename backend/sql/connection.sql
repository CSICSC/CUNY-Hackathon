CREATE TABLE public.connection (
    conn_id VARCHAR(100) NOT NULL PRIMARY KEY,
    email VARCHAR(500),
    friend_emails TEXT[] NOT NULL,
    site_id INT NOT NULL,
    CONSTRAINT fk_site_id FOREIGN KEY (site_id) REFERENCES site_data (site_id)
);