
document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in and is a renter
  const user = getCurrentUser();
  
  if (!user || user.userType !== 'renter') {
    window.location.href = 'login.html';
    return;
  }
  
  // Get reservations for this user
  const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
  const userReservations = reservations.filter(reservation => reservation.userId === user.id);
  
  // Display reservations
  const reservationsContainer = document.getElementById('reservations-container');
  
  if (reservationsContainer) {
    if (userReservations.length === 0) {
      reservationsContainer.innerHTML = `
        <div class="text-center py-8">
          <p class="text-gray-600 mb-4">You don't have any reservations yet.</p>
          <a href="properties.html" class="btn-primary inline-block">Find a place to stay</a>
        </div>
      `;
    } else {
      reservationsContainer.innerHTML = '';
      
      userReservations.forEach(reservation => {
        const reservationCard = document.createElement('div');
        reservationCard.className = 'reservation-card';
        
        reservationCard.innerHTML = `
          <div class="reservation-image">
            ${reservation.propertyImage ? `<img src="${reservation.propertyImage}" alt="${reservation.propertyTitle}">` : '<span>No image</span>'}
          </div>
          
          <div class="reservation-info">
            <h3>${reservation.propertyTitle}</h3>
            <p class="location">${reservation.propertyLocation}</p>
            <p class="reservation-dates">
              ${formatDate(new Date(reservation.startDate))} – ${formatDate(new Date(reservation.endDate))}
            </p>
            <p class="reservation-price">Total: $${reservation.totalPrice}</p>
            
            <div class="reservation-actions">
              <a href="write-review.html?id=${reservation.propertyId}" class="write-review-btn">
                Scrie un review
              </a>
            </div>
          </div>
        `;
        
        reservationsContainer.appendChild(reservationCard);
      });
    }
  }
  
  // Handle logout button
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      logout();
    });
  }
});

// Format date
function formatDate(date) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('ro-RO', options);
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

// Logout function
function logout() {
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}
