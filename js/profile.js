
document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in
  const user = getCurrentUser();
  
  if (!user) {
    window.location.href = 'login.html';
    return;
  }
  
  // Update navigation
  updateNavigation();
  
  // Display profile info
  const profileDetails = document.querySelector('.profile-details');
  
  if (profileDetails) {
    profileDetails.innerHTML = `
      <div>
        <span class="label">Nume:</span>
        <span>${user.name}</span>
      </div>
      
      <div>
        <span class="label">Email:</span>
        <span>${user.email}</span>
      </div>
      
      <div>
        <span class="label">Din:</span>
        <span>${formatDate(new Date(user.createdAt))}</span>
      </div>
    `;
  }
  
  // Set up action buttons based on user type
  const viewPropertiesBtn = document.getElementById('view-properties-btn');
  const viewReservationsBtn = document.getElementById('view-reservations-btn');
  
  if (viewPropertiesBtn && viewReservationsBtn) {
    if (user.userType === 'host') {
      viewPropertiesBtn.textContent = 'Vezi proprietățile mele';
      viewPropertiesBtn.href = 'host-properties.html';
      viewReservationsBtn.textContent = 'Vezi rezervările primite';
      viewReservationsBtn.href = 'host-reservations.html';
    } else {
      viewPropertiesBtn.textContent = 'Vezi rezervările mele';
      viewPropertiesBtn.href = 'renter-reservations.html';
      viewReservationsBtn.style.display = 'none'; // Hide second button for renters
    }
  }
});

// Format date
function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('ro-RO', options);
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
  const navLinks = document.getElementById('nav-links');
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
