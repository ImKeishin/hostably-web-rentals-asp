
document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in and is a host
  const user = getCurrentUser();
  
  if (!user || user.userType !== 'host') {
    window.location.href = 'login.html';
    return;
  }
  
  // Get user's properties
  const properties = JSON.parse(localStorage.getItem('properties') || '[]');
  const userProperties = properties.filter(property => property.hostId === user.id);
  
  // Display properties
  const propertiesContainer = document.getElementById('properties-container');
  
  if (propertiesContainer) {
    if (userProperties.length === 0) {
      propertiesContainer.innerHTML = `
        <div class="text-center py-8">
          <p class="text-gray-600 mb-4">You haven't added any properties yet.</p>
          <a href="add-property.html" class="btn-primary inline-block">Add Your First Property</a>
        </div>
      `;
    } else {
      propertiesContainer.innerHTML = '';
      
      userProperties.forEach(property => {
        const propertyRow = document.createElement('div');
        propertyRow.className = 'property-row';
        
        propertyRow.innerHTML = `
          <div class="property-image-container">
            ${property.image ? `<img src="${property.image}" alt="${property.title}">` : '<span>No image</span>'}
          </div>
          
          <div class="property-info">
            <h3>${property.title}</h3>
            <p class="location">${property.location}, ${property.bedrooms} bedrooms</p>
            <p>${property.amenities.join(', ')}</p>
            
            <div class="property-actions">
              <a href="edit-property.html?id=${property.id}" class="btn-edit">Edit</a>
            </div>
          </div>
        `;
        
        propertiesContainer.appendChild(propertyRow);
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
