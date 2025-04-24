
document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in
  const user = getCurrentUser();
  
  if (!user) {
    window.location.href = 'login.html';
    return;
  }
  
  // Update navigation
  updateNavigation();
  
  // Get property ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const propertyId = urlParams.get('id');
  
  if (!propertyId) {
    window.location.href = 'properties.html';
    return;
  }
  
  // Get property details
  const properties = JSON.parse(localStorage.getItem('properties') || '[]');
  const property = properties.find(p => p.id === propertyId);
  
  if (!property) {
    window.location.href = 'properties.html';
    return;
  }
  
  // Display property title
  const propertyTitleElement = document.getElementById('property-title');
  if (propertyTitleElement) {
    propertyTitleElement.textContent = property.title;
  }
  
  // Set up rating stars
  const stars = document.querySelectorAll('.star');
  let selectedRating = 5; // Default rating
  
  stars.forEach(star => {
    // Set initial active state
    if (parseInt(star.dataset.rating) <= selectedRating) {
      star.classList.add('active');
    }
    
    // Handle click events
    star.addEventListener('click', function() {
      selectedRating = parseInt(this.dataset.rating);
      
      // Update star appearance
      stars.forEach(s => {
        if (parseInt(s.dataset.rating) <= selectedRating) {
          s.classList.add('active');
        } else {
          s.classList.remove('active');
        }
      });
    });
  });
  
  // Handle form submission
  const reviewForm = document.getElementById('review-form');
  
  if (reviewForm) {
    reviewForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const comment = document.getElementById('review-comment').value;
      
      // Create review object
      const review = {
        id: `review${Date.now()}`,
        propertyId: property.id,
        userId: user.id,
        userName: user.name,
        rating: selectedRating,
        comment: comment,
        date: new Date().toISOString()
      };
      
      // Save review
      const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
      reviews.push(review);
      localStorage.setItem('reviews', JSON.stringify(reviews));
      
      // Redirect to property details
      alert('Review submitted successfully!');
      window.location.href = `property-details.html?id=${propertyId}`;
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
