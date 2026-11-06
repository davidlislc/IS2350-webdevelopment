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
VALUES ('John Doe', 'user1', 'password1', 'user');
INSERT INTO users (fullname, username, password, role) 
VALUES ('Jane Doe', 'user2', 'password1', 'admin');

-- Create the access_request table
CREATE TABLE IF NOT EXISTS access_request (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userid INT NOT NULL,
    useremail VARCHAR(100) NOT NULL,
    request_type VARCHAR(50) NOT NULL,
    request_detail TEXT,
    request_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    note TEXT,
    FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
);

-- Create the request_process table
CREATE TABLE IF NOT EXISTS request_process (
    id INT AUTO_INCREMENT PRIMARY KEY,
    access_request_id INT NOT NULL UNIQUE,
    isApproved BOOLEAN,
    approver_id INT,
    approver_email VARCHAR(100),
    decidsion_time TIMESTAMP,
    FOREIGN KEY (access_request_id) REFERENCES access_request(id) ON DELETE CASCADE,
    FOREIGN KEY (approver_id) REFERENCES users(id) ON DELETE SET NULL
);