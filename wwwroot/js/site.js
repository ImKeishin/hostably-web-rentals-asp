
// Common JavaScript functions for the Hostably site

document.addEventListener('DOMContentLoaded', function() {
    // Initialize star rating system on review creation pages
    initStarRating();
    
    // Initialize date validation for booking forms
    initDateValidation();
});

// Star rating initialization
function initStarRating() {
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('Rating');
    
    if (stars.length > 0 && ratingInput) {
        stars.forEach(star => {
            star.addEventListener('click', () => {
                const rating = parseInt(star.getAttribute('data-rating'));
                ratingInput.value = rating;
                
                // Update visual state
                stars.forEach(s => {
                    const starRating = parseInt(s.getAttribute('data-rating'));
                    if (starRating <= rating) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });
            
            // Hover effects
            star.addEventListener('mouseenter', () => {
                const rating = parseInt(star.getAttribute('data-rating'));
                
                stars.forEach(s => {
                    const starRating = parseInt(s.getAttribute('data-rating'));
                    if (starRating <= rating) {
                        s.style.color = 'gold';
                    }
                });
            });
            
            star.addEventListener('mouseleave', () => {
                const currentRating = parseInt(ratingInput.value) || 0;
                
                stars.forEach(s => {
                    const starRating = parseInt(s.getAttribute('data-rating'));
                    if (starRating <= currentRating) {
                        s.style.color = 'gold';
                    } else {
                        s.style.color = '';
                    }
                });
            });
        });
    }
}

// Date validation for booking forms
function initDateValidation() {
    const checkInDate = document.getElementById('CheckInDate');
    const checkOutDate = document.getElementById('CheckOutDate');
    
    if (checkInDate && checkOutDate) {
        // Set min date to today for both inputs
        const today = new Date().toISOString().split('T')[0];
        checkInDate.min = today;
        
        // Update checkout min date when checkin changes
        checkInDate.addEventListener('change', () => {
            checkOutDate.min = checkInDate.value;
            
            // If checkout is before checkin, reset it
            if (checkOutDate.value && checkOutDate.value < checkInDate.value) {
                checkOutDate.value = '';
            }
        });
    }
}
