
-- Hostably Database Schema
-- This script creates all tables needed for the Hostably application

-- Create the database
CREATE DATABASE IF NOT EXISTS hostably;
USE hostably;

-- Users table - stores both hosts and renters
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  user_type ENUM('host', 'renter') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE INDEX idx_email (email)
);

-- Properties table - stores all property listings
CREATE TABLE properties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  host_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price_per_night DECIMAL(10, 2) NOT NULL,
  bedrooms INT NOT NULL,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (host_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_location (location),
  INDEX idx_host (host_id)
);

-- Property amenities - many-to-many relationship
CREATE TABLE amenities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- Junction table for property-amenity relationship
CREATE TABLE property_amenities (
  property_id INT NOT NULL,
  amenity_id INT NOT NULL,
  PRIMARY KEY (property_id, amenity_id),
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
  FOREIGN KEY (amenity_id) REFERENCES amenities(id) ON DELETE CASCADE
);

-- Reservations table
CREATE TABLE reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  property_id INT NOT NULL,
  renter_id INT NOT NULL,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  guests INT NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
  FOREIGN KEY (renter_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_property (property_id),
  INDEX idx_renter (renter_id)
);

-- Reviews table
CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  property_id INT NOT NULL,
  user_id INT NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_review (property_id, user_id),
  INDEX idx_property (property_id)
);

-- Insert default amenities
INSERT INTO amenities (name) VALUES 
  ('WiFi'),
  ('Kitchen'),
  ('Free Parking'),
  ('Swimming Pool'),
  ('Air Conditioning'),
  ('TV'),
  ('Washing Machine'),
  ('Heating'),
  ('Balcony'),
  ('Pet Friendly');

-- Example stored procedure for search functionality
DELIMITER //
CREATE PROCEDURE search_properties(IN search_term VARCHAR(255))
BEGIN
  SELECT p.*, 
    u.name as host_name, 
    GROUP_CONCAT(a.name) as amenities,
    AVG(r.rating) as avg_rating
  FROM properties p 
  JOIN users u ON p.host_id = u.id
  LEFT JOIN property_amenities pa ON p.id = pa.property_id
  LEFT JOIN amenities a ON pa.amenity_id = a.id
  LEFT JOIN reviews r ON p.id = r.property_id
  WHERE 
    p.title LIKE CONCAT('%', search_term, '%') OR
    p.location LIKE CONCAT('%', search_term, '%') OR
    p.description LIKE CONCAT('%', search_term, '%')
  GROUP BY p.id;
END //
DELIMITER ;

-- Example stored procedure to get property details with amenities and reviews
DELIMITER //
CREATE PROCEDURE get_property_details(IN property_id_param INT)
BEGIN
  -- Get property details
  SELECT p.*, u.name as host_name
  FROM properties p
  JOIN users u ON p.host_id = u.id
  WHERE p.id = property_id_param;
  
  -- Get property amenities
  SELECT a.name
  FROM amenities a
  JOIN property_amenities pa ON a.id = pa.amenity_id
  WHERE pa.property_id = property_id_param;
  
  -- Get property reviews
  SELECT r.*, u.name as reviewer_name
  FROM reviews r
  JOIN users u ON r.user_id = u.id
  WHERE r.property_id = property_id_param
  ORDER BY r.created_at DESC;
END //
DELIMITER ;

-- Example stored procedure to create a reservation
DELIMITER //
CREATE PROCEDURE create_reservation(
  IN property_id_param INT,
  IN renter_id_param INT,
  IN check_in_date_param DATE,
  IN check_out_date_param DATE,
  IN guests_param INT,
  IN total_price_param DECIMAL(10, 2)
)
BEGIN
  -- First check if the property is available for the requested dates
  DECLARE is_available BOOLEAN DEFAULT TRUE;
  
  SELECT COUNT(*) = 0 INTO is_available
  FROM reservations 
  WHERE 
    property_id = property_id_param AND
    status NOT IN ('cancelled') AND
    ((check_in_date <= check_in_date_param AND check_out_date > check_in_date_param) OR
     (check_in_date < check_out_date_param AND check_out_date >= check_out_date_param) OR
     (check_in_date >= check_in_date_param AND check_out_date <= check_out_date_param));
  
  IF is_available THEN
    -- If available, create the reservation
    INSERT INTO reservations (property_id, renter_id, check_in_date, check_out_date, guests, total_price)
    VALUES (property_id_param, renter_id_param, check_in_date_param, check_out_date_param, guests_param, total_price_param);
    
    SELECT LAST_INSERT_ID() AS reservation_id, TRUE AS success, 'Reservation created successfully' AS message;
  ELSE
    -- If not available, return an error message
    SELECT 0 AS reservation_id, FALSE AS success, 'Property is not available for the selected dates' AS message;
  END IF;
END //
DELIMITER ;
