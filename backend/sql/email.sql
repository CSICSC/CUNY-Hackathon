CREATE TABLE public.emails (
    email VARCHAR(500) NOT NULL,
    site_id INT NOT NULL,
    CONSTRAINT fk_site_id FOREIGN KEY (site_id) REFERENCES site_data (site_id)
);