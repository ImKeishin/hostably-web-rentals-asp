
# Hostably Database Setup Guide

This guide explains how to set up the MySQL database for the Hostably project using MySQL Workbench.

## Prerequisites

1. MySQL Server installed on your machine
2. MySQL Workbench installed
3. Basic knowledge of SQL and database management

## Setup Instructions

### 1. Launch MySQL Workbench

Open MySQL Workbench and connect to your local MySQL server instance.

### 2. Create a New Schema

1. In MySQL Workbench, right-click on the "Schemas" section in the Navigator panel
2. Select "Create Schema..."
3. Enter "hostably" as the schema name
4. Click "Apply"

### 3. Run the Database Schema Script

1. Open the `database_schema.sql` file in MySQL Workbench
   - Go to File > Open SQL Script... and select the file
2. Make sure "hostably" is selected as the default schema
3. Click the lightning bolt icon to execute the entire script
   - This will create all necessary tables, indexes, and stored procedures

### 4. Verify the Database Structure

After running the script, you should have the following tables in your database:
- `users`: Stores user information for both hosts and renters
- `properties`: Stores property listings
- `amenities`: Stores available amenities
- `property_amenities`: Junction table connecting properties with amenities
- `reservations`: Stores booking information
- `reviews`: Stores property reviews

### 5. Connect to the Database from Your Application

Use the connection details in your PHP files to connect to the database:
- Host: `localhost` (or your MySQL server address)
- Username: Your MySQL username (typically "root" for local development)
- Password: Your MySQL password
- Database: `hostably`

## Database Schema Overview

### Users Table
Stores both hosts and renters with authentication information.

### Properties Table
Stores property listings with details like location, price, and bedrooms.

### Amenities & Property_Amenities Tables
Store available amenities and their relationships with properties.

### Reservations Table
Manages bookings with check-in/check-out dates and status.

### Reviews Table
Stores property ratings and comments from users who have stayed at properties.

## Stored Procedures

The database includes several stored procedures to simplify common operations:

1. `search_properties`: Search properties by text in title, location, or description
2. `get_property_details`: Get complete property details including amenities and reviews
3. `create_reservation`: Create a new reservation with availability checking

## Next Steps

1. Set up a PHP environment to connect to the database
2. Create API endpoints as described in `api_endpoints.txt`
3. Connect your frontend JavaScript to the API endpoints

## Security Considerations

1. Always use prepared statements to prevent SQL injection
2. Store passwords using proper hashing (PHP's password_hash function)
3. Implement proper authentication and authorization checks for API endpoints
4. Use HTTPS for all API requests to protect sensitive data
