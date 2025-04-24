
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

// Sample data for properties
const sampleProperties = [
  {
    id: '1',
    title: 'Modern Apartment in City Center',
    location: 'New York, USA',
    description: 'Beautiful and modern apartment located in the heart of the city. Close to all amenities and public transportation.',
    pricePerNight: 120,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
    amenities: ['WiFi', 'Kitchen', 'Air Conditioning', 'Washer'],
    hostId: 'host1',
    hostName: 'John Doe',
    bedrooms: 2
  },
  {
    id: '2',
    title: 'Beach House with Ocean View',
    location: 'Miami, USA',
    description: 'Stunning beach house with panoramic ocean views. Perfect for a relaxing getaway.',
    pricePerNight: 200,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
    amenities: ['WiFi', 'Pool', 'Kitchen', 'Parking'],
    hostId: 'host2',
    hostName: 'Jane Smith',
    bedrooms: 3
  },
  {
    id: '3',
    title: 'Cozy Mountain Cabin',
    location: 'Denver, USA',
    description: 'Cozy cabin in the mountains with beautiful views and a fireplace.',
    pricePerNight: 150,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
    amenities: ['WiFi', 'Fireplace', 'Kitchen', 'Parking'],
    hostId: 'host3',
    hostName: 'Robert Johnson',
    bedrooms: 2
  }
];

// Store sample data in localStorage if it doesn't exist
if (!localStorage.getItem('properties')) {
  localStorage.setItem('properties', JSON.stringify(sampleProperties));
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  updateNavigation();
  
  // Handle logout button if present
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      logout();
    });
  }
});
