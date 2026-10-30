USE my_database;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Recommended length for hashed passwords (e.g., bcrypt)
    role VARCHAR(50) NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Insert a sample user (Password here should ideally be hashed in a real application)
INSERT INTO users (fullname, username, password, role) 
VALUES ('John Doe', 'user1', 'password1', 'role');