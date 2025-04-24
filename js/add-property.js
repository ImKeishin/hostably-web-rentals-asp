
document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in and is a host
  const user = getCurrentUser();
  
  if (!user || user.userType !== 'host') {
    window.location.href = 'login.html';
    return;
  }
  
  // Update navigation
  updateNavigation();
  
  // Handle form submission
  const addPropertyForm = document.getElementById('add-property-form');
  
  if (addPropertyForm) {
    addPropertyForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const title = document.getElementById('title').value;
      const location = document.getElementById('location').value;
      const description = document.getElementById('description').value;
      const pricePerNight = parseInt(document.getElementById('price').value);
      const bedrooms = parseInt(document.getElementById('bedrooms').value);
      const image = document.getElementById('image').value;
      
      // Get selected amenities
      const amenities = [];
      document.querySelectorAll('input[name="amenities"]:checked').forEach(checkbox => {
        amenities.push(checkbox.value);
      });
      
      // Create property object
      const property = {
        id: `prop${Date.now()}`,
        title,
        location,
        description,
        pricePerNight,
        image,
        amenities,
        hostId: user.id,
        hostName: user.name,
        bedrooms
      };
      
      // Save property to localStorage
      const properties = JSON.parse(localStorage.getItem('properties') || '[]');
      properties.push(property);
      localStorage.setItem('properties', JSON.stringify(properties));
      
      // Redirect to host properties page
      alert('Property added successfully!');
      window.location.href = 'host-properties.html';
    });
  }
});

// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem('user') !== null;
}

// Get current user
function getCurrentUser() {
  const userString = localStorage.getItem('user');
  return userString ? JSON.parse(userString) : null;
}

// Update navigation based on user status
function updateNavigation() {
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks) return;
  
  navLinks.innerHTML = '';
  
  const user = getCurrentUser();
  
  if (user) {
    // User is logged in
    if (user.userType === 'host') {
      // Host navigation
      appendLink(navLinks, 'host-dashboard.html', 'Dashboard');
      appendLink(navLinks, 'host-properties.html', 'My Properties');
      appendLink(navLinks, 'host-reservations.html', 'Reservations');
    } else {
      // Renter navigation
      appendLink(navLinks, 'properties.html', 'Properties');
      appendLink(navLinks, 'renter-reservations.html', 'My Reservations');
    }
    
    appendLink(navLinks, 'profile.html', 'Profile');
    
    const logoutLink = document.createElement('a');
    logoutLink.href = '#';
    logoutLink.textContent = 'Logout';
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });
    navLinks.appendChild(logoutLink);
  } else {
    // Not logged in
    appendLink(navLinks, 'properties.html', 'Properties');
    appendLink(navLinks, 'login.html', 'Login');
    appendLink(navLinks, 'register.html', 'Register');
  }
}

// Helper function to append a link to navigation
function appendLink(parent, href, text) {
  const link = document.createElement('a');
  link.href = href;
  link.textContent = text;
  
  // Highlight current page
  if (window.location.pathname.endsWith(href)) {
    link.classList.add('active');
  }
  
  parent.appendChild(link);
}

// Logout function
function logout() {
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}
