
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  const errorMessage = document.getElementById('error-message');
  
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const userType = document.querySelector('input[name="user-type"]:checked').value;
      
      // Simple login logic - in a real app this would connect to a backend
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(user => user.email === email && user.password === password && user.userType === userType);
      
      if (user) {
        // Store user info in localStorage (excluding password)
        const userData = {
          id: user.id,
          name: user.name,
          email: user.email,
          userType: user.userType,
          createdAt: user.createdAt
        };
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Redirect to appropriate page
        if (userType === 'host') {
          window.location.href = 'host-dashboard.html';
        } else {
          window.location.href = 'index.html';
        }
      } else {
        // Show error message
        errorMessage.textContent = 'Invalid credentials. Please try again.';
        errorMessage.style.display = 'block';
      }
    });
  }
});
