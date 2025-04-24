
document.addEventListener('DOMContentLoaded', function() {
  // Get property ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const propertyId = urlParams.get('id');
  
  if (!propertyId) {
    window.location.href = 'properties.html';
    return;
  }
  
  // Get properties from localStorage
  const properties = JSON.parse(localStorage.getItem('properties') || '[]');
  const property = properties.find(p => p.id === propertyId);
  
  if (!property) {
    window.location.href = 'properties.html';
    return;
  }
  
  // Update page title
  document.title = `${property.title} - Hostably`;
  
  // Display property details
  const propertyDetailsElement = document.querySelector('.property-details');
  if (propertyDetailsElement) {
    propertyDetailsElement.innerHTML = `
      ${property.image ? `<img src="${property.image}" alt="${property.title}">` : ''}
      <h1>${property.title}</h1>
      <p class="location">${property.location}</p>
      <p class="price">$${property.pricePerNight} per night</p>
      <p>${property.description}</p>
      <p><strong>Bedrooms:</strong> ${property.bedrooms}</p>
      <div class="amenities">
        ${property.amenities.map(amenity => `<span>${amenity}</span>`).join('')}
      </div>
    `;
  }
  
  // Handle booking form
  const bookingForm = document.getElementById('booking-form');
  const checkInElement = document.getElementById('check-in');
  const checkOutElement = document.getElementById('check-out');
  const guestsElement = document.getElementById('guests');
  const totalPriceElement = document.getElementById('total-price');
  
  if (bookingForm && checkInElement && checkOutElement && guestsElement && totalPriceElement) {
    // Set minimum dates
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    checkInElement.min = formatDate(today);
    checkOutElement.min = formatDate(tomorrow);
    
    // Calculate total price when dates change
    const updateTotalPrice = () => {
      const checkIn = new Date(checkInElement.value);
      const checkOut = new Date(checkOutElement.value);
      
      if (checkIn && checkOut && checkIn < checkOut) {
        const nights = Math.floor((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        const total = property.pricePerNight * nights;
        totalPriceElement.textContent = `$${total}`;
      } else {
        totalPriceElement.textContent = '$0';
      }
    };
    
    checkInElement.addEventListener('change', function() {
      // Update checkout min date
      const checkIn = new Date(this.value);
      const nextDay = new Date(checkIn);
      nextDay.setDate(nextDay.getDate() + 1);
      checkOutElement.min = formatDate(nextDay);
      
      if (new Date(checkOutElement.value) <= checkIn) {
        checkOutElement.value = formatDate(nextDay);
      }
      
      updateTotalPrice();
    });
    
    checkOutElement.addEventListener('change', updateTotalPrice);
    
    // Handle form submission
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const user = getCurrentUser();
      
      if (!user) {
        window.location.href = 'login.html';
        return;
      }
      
      const checkIn = new Date(checkInElement.value);
      const checkOut = new Date(checkOutElement.value);
      const guests = parseInt(guestsElement.value);
      
      if (checkIn && checkOut && checkIn < checkOut) {
        const nights = Math.floor((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        const totalPrice = property.pricePerNight * nights;
        
        // Create reservation object
        const reservation = {
          id: `res${Date.now()}`,
          propertyId: property.id,
          propertyTitle: property.title,
          propertyLocation: property.location,
          propertyImage: property.image,
          startDate: checkInElement.value,
          endDate: checkOutElement.value,
          guestCount: guests,
          userId: user.id,
          userName: user.name,
          totalPrice: totalPrice,
          hostId: property.hostId
        };
        
        // Store reservation
        const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
        reservations.push(reservation);
        localStorage.setItem('reservations', JSON.stringify(reservations));
        
        // Redirect to user's reservations page
        alert('Reservation successful!');
        window.location.href = user.userType === 'renter' ? 'renter-reservations.html' : 'host-reservations.html';
      } else {
        alert('Please select valid dates');
      }
    });
  }
  
  // Display reviews
  displayReviews(propertyId);
  
  // Update navigation
  updateNavigation();
});

// Display reviews for a property
function displayReviews(propertyId) {
  const reviewsListElement = document.querySelector('.reviews-list');
  if (!reviewsListElement) return;
  
  // Get reviews from localStorage
  const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  const propertyReviews = reviews.filter(review => review.propertyId === propertyId);
  
  if (propertyReviews.length === 0) {
    reviewsListElement.innerHTML = '<p>No reviews yet.</p>';
    return;
  }
  
  // Render reviews
  reviewsListElement.innerHTML = propertyReviews.map(review => `
    <div class="review">
      <div class="review-header">
        <span class="review-user">${review.userName}</span>
        <span class="review-date">${formatDateShort(new Date(review.date))}</span>
      </div>
      <div class="review-rating">
        ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
      </div>
      <p>${review.comment}</p>
    </div>
  `).join('');
}

// Format date to YYYY-MM-DD
function formatDate(date) {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();
  
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  
  return [year, month, day].join('-');
}

// Format date for display
function formatDateShort(date) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
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
