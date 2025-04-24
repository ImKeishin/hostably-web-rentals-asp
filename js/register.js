
document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.getElementById('register-form');
  const errorMessage = document.getElementById('error-message');
  
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const userType = document.querySelector('input[name="user-type"]:checked').value;
      
      // Get existing users or initialize empty array
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if email already exists
      if (users.some(user => user.email === email)) {
        errorMessage.textContent = 'Email already in use. Please use a different email address.';
        errorMessage.style.display = 'block';
        return;
      }
      
      // Create new user object
      const newUser = {
        id: `user${Date.now()}`,
        name,
        email,
        password,
        userType,
        createdAt: new Date().toISOString()
      };
      
      // Add the new user to the array
      users.push(newUser);
      
      // Save updated users array
      localStorage.setItem('users', JSON.stringify(users));
      
      // Store user info in localStorage (excluding password)
      const userData = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        userType: newUser.userType,
        createdAt: newUser.createdAt
      };
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Redirect to appropriate page
      if (userType === 'host') {
        window.location.href = 'host-dashboard.html';
      } else {
        window.location.href = 'index.html';
      }
    });
  }
});
