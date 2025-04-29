
<?php
// Example PHP file showing how to connect to the MySQL database
// You can use this as a reference for your backend code

// Database configuration
$host = 'localhost';       // Usually 'localhost' for local development
$username = 'root';        // Your MySQL username
$password = '';            // Your MySQL password
$database = 'hostably';    // The database name

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Example function to get all properties
function getAllProperties($conn) {
  $sql = "SELECT p.*, u.name as host_name, AVG(r.rating) as avg_rating 
          FROM properties p
          JOIN users u ON p.host_id = u.id
          LEFT JOIN reviews r ON p.id = r.property_id
          GROUP BY p.id";
          
  $result = $conn->query($sql);
  $properties = [];
  
  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
      $properties[] = $row;
    }
  }
  
  return $properties;
}

// Example function to register a new user
function registerUser($conn, $name, $email, $password, $userType) {
  // Hash the password for security
  $passwordHash = password_hash($password, PASSWORD_DEFAULT);
  
  // Prepare statement to prevent SQL injection
  $stmt = $conn->prepare("INSERT INTO users (name, email, password_hash, user_type) VALUES (?, ?, ?, ?)");
  $stmt->bind_param("ssss", $name, $email, $passwordHash, $userType);
  
  if ($stmt->execute()) {
    return [
      'success' => true,
      'message' => 'Registration successful',
      'user_id' => $stmt->insert_id
    ];
  } else {
    return [
      'success' => false,
      'message' => 'Error: ' . $stmt->error
    ];
  }
}

// Example function to authenticate a user
function loginUser($conn, $email, $password, $userType) {
  $stmt = $conn->prepare("SELECT id, name, email, password_hash FROM users WHERE email = ? AND user_type = ?");
  $stmt->bind_param("ss", $email, $userType);
  $stmt->execute();
  $result = $stmt->get_result();
  
  if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    
    if (password_verify($password, $user['password_hash'])) {
      // Password is correct
      return [
        'success' => true,
        'message' => 'Login successful',
        'user' => [
          'id' => $user['id'],
          'name' => $user['name'],
          'email' => $user['email'],
          'userType' => $userType
        ]
      ];
    }
  }
  
  return [
    'success' => false,
    'message' => 'Invalid email or password'
  ];
}

// Close connection when done
// $conn->close();
?>
