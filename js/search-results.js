
document.addEventListener('DOMContentLoaded', function() {
  // Get search query from URL
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('query') || '';
  
  // Set search input value to the query
  const searchQueryInput = document.getElementById('search-query');
  if (searchQueryInput) {
    searchQueryInput.value = query;
  }
  
  // Get properties from localStorage
  const properties = JSON.parse(localStorage.getItem('properties') || '[]');
  
  // Filter properties based on search query
  const filteredProperties = properties.filter(property => {
    const searchLower = query.toLowerCase();
    return (
      property.title.toLowerCase().includes(searchLower) ||
      property.location.toLowerCase().includes(searchLower) ||
      property.description.toLowerCase().includes(searchLower)
    );
  });
  
  // Display search status
  const searchStatus = document.getElementById('search-status');
  if (searchStatus) {
    if (filteredProperties.length === 0) {
      searchStatus.textContent = `No properties found matching "${query}"`;
    } else {
      searchStatus.textContent = `Found ${filteredProperties.length} properties matching "${query}"`;
    }
  }
  
  // Display results
  const resultsGrid = document.getElementById('results-grid');
  if (resultsGrid) {
    if (filteredProperties.length === 0) {
      resultsGrid.innerHTML = '<p class="text-center">No properties found. Try a different search term.</p>';
    } else {
      resultsGrid.innerHTML = '';
      filteredProperties.forEach(property => {
        const propertyCard = createPropertyCard(property);
        resultsGrid.appendChild(propertyCard);
      });
    }
  }
  
  // Update navigation
  updateNavigation();
});

// Create a property card element
function createPropertyCard(property) {
  const card = document.createElement('div');
  card.className = 'property-card';
  
  card.innerHTML = `
    <div class="property-image">
      ${property.image ? `<img src="${property.image}" alt="${property.title}">` : ''}
    </div>
    <div class="property-content">
      <h3>${property.title}</h3>
      <p class="location">${property.location}</p>
      <p class="price">$${property.pricePerNight} per night</p>
      <a href="property-details.html?id=${property.id}" class="view-button">View Property</a>
    </div>
  `;
  
  return card;
}

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
