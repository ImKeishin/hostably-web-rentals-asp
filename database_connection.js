
// Example JavaScript file showing how to interact with a PHP backend

/**
 * Fetches all properties from the server
 * @returns {Promise<Array>} Array of properties
 */
async function fetchProperties() {
  try {
    const response = await fetch('api/properties.php');
    
    if (!response.ok) {
      throw new Error('Failed to fetch properties');
    }
    
    const properties = await response.json();
    return properties;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

/**
 * Registers a new user
 * @param {Object} userData - User data including name, email, password, and userType
 * @returns {Promise<Object>} Response object with success status and message
 */
async function registerUser(userData) {
  try {
    const response = await fetch('api/register.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error registering user:', error);
    return { success: false, message: 'Registration failed. Please try again.' };
  }
}

/**
 * Authenticates a user
 * @param {Object} loginData - Login data including email, password, and userType
 * @returns {Promise<Object>} Response object with success status, message, and user data if successful
 */
async function loginUser(loginData) {
  try {
    const response = await fetch('api/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error logging in:', error);
    return { success: false, message: 'Login failed. Please try again.' };
  }
}

/**
 * Creates a new property listing
 * @param {Object} propertyData - Property data
 * @param {string} authToken - Authentication token
 * @returns {Promise<Object>} Response object with success status and message
 */
async function createProperty(propertyData, authToken) {
  try {
    const response = await fetch('api/properties.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(propertyData)
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error creating property:', error);
    return { success: false, message: 'Failed to create property. Please try again.' };
  }
}

/**
 * Creates a reservation for a property
 * @param {Object} reservationData - Reservation data
 * @param {string} authToken - Authentication token
 * @returns {Promise<Object>} Response object with success status and message
 */
async function createReservation(reservationData, authToken) {
  try {
    const response = await fetch('api/reservations.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(reservationData)
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error creating reservation:', error);
    return { success: false, message: 'Failed to create reservation. Please try again.' };
  }
}
