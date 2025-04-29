
document.addEventListener('DOMContentLoaded', function() {
    const checkInDateInput = document.getElementById('CheckInDate');
    const checkOutDateInput = document.getElementById('CheckOutDate');
    const pricePerNight = parseFloat(document.querySelector('.price').textContent.replace('$', '').split(' ')[0]);
    const totalPriceSpan = document.getElementById('total-price');
    const totalPriceInput = document.getElementById('TotalPrice');

    function calculateTotal() {
        if (checkInDateInput.value && checkOutDateInput.value) {
            const checkInDate = new Date(checkInDateInput.value);
            const checkOutDate = new Date(checkOutDateInput.value);
            
            if (checkOutDate > checkInDate) {
                const nights = Math.floor((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
                const total = nights * pricePerNight;
                
                totalPriceSpan.textContent = '$' + total.toFixed(2);
                totalPriceInput.value = total.toFixed(2);
            } else {
                totalPriceSpan.textContent = '$0';
                totalPriceInput.value = 0;
            }
        }
    }

    if (checkInDateInput && checkOutDateInput) {
        checkInDateInput.addEventListener('change', calculateTotal);
        checkOutDateInput.addEventListener('change', calculateTotal);
    }
});
