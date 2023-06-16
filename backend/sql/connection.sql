CREATE TABLE public.connection (
    conn_id VARCHAR(100) NOT NULL PRIMARY KEY,
    ip_addr VARCHAR(100) NOT NULL,
    email VARCHAR(500),
    discord VARCHAR(500),
    time_connected time NOT NULL,
    time_disconnected time,
    friend_emails TEXT[] NOT NULL,
    site_id INT NOT NULL,
    CONSTRAINT fk_site_id FOREIGN KEY (site_id) REFERENCES site_data (site_id)
);