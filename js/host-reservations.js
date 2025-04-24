
document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in and is a host
  const user = getCurrentUser();
  
  if (!user || user.userType !== 'host') {
    window.location.href = 'login.html';
    return;
  }
  
  // Get reservations for this host
  const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
  const hostReservations = reservations.filter(reservation => reservation.hostId === user.id);
  
  // Display reservations
  const reservationsContainer = document.getElementById('reservations-container');
  
  if (reservationsContainer) {
    if (hostReservations.length === 0) {
      reservationsContainer.innerHTML = `
        <div class="text-center py-8">
          <p class="text-gray-600">You have no reservations yet.</p>
        </div>
      `;
    } else {
      reservationsContainer.innerHTML = '';
      
      hostReservations.forEach(reservation => {
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
            <p class="reservation-guest">Guest: ${reservation.userName}</p>
            <p class="reservation-price">Total: $${reservation.totalPrice}</p>
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
