CREATE TABLE public.site_data (
    site_id INT NOT NULL,
    description VARCHAR(5000) NOT NULL,
    real_views INT NOT NULL,
    unique_views INT NOT NULL,
    time_spent INT[] NOT NULL,
    real_location TEXT[] NOT NULL,
    unique_location TEXT[] NOT NULL,
    num_friends INT[] NOT NULL,
    faq_clicked INT[]
);