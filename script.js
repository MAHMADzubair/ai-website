document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. COUNTDOWN TIMER
       ========================================================================== */
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    let totalSeconds = (8 * 3600) + (42 * 60) + 19;

    function updateTimer() {
        if (totalSeconds <= 0) totalSeconds = 24 * 3600;

        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;

        if (hoursEl) hoursEl.textContent = String(hrs).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(mins).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(secs).padStart(2, '0');

        totalSeconds--;
    }

    setInterval(updateTimer, 1000);
    updateTimer();

    /* ==========================================================================
       2. CHECKOUT FORM ENROLLMENT
       ========================================================================== */
    const checkoutTriggers = document.querySelectorAll('.checkout-trigger');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckoutModal = document.getElementById('close-checkout-modal');
    const selectedPlanName = document.getElementById('selected-plan-name');
    const summaryPlan = document.getElementById('summary-plan');
    const summaryPrice = document.getElementById('summary-price');
    const checkoutForm = document.getElementById('checkout-form');

    checkoutTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const plan = btn.getAttribute('data-plan') || 'LaunchPad Standard';
            
            if (selectedPlanName) selectedPlanName.textContent = plan;
            if (summaryPlan) summaryPlan.textContent = plan;
            
            if (plan.includes('Mentorship')) {
                if (summaryPrice) summaryPrice.textContent = 'PKR 25,000';
            } else {
                if (summaryPrice) summaryPrice.textContent = 'PKR 8,999';
            }

            if (checkoutModal) {
                checkoutModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (closeCheckoutModal && checkoutModal) {
        const hideCheckout = () => {
            checkoutModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        closeCheckoutModal.addEventListener('click', hideCheckout);
        checkoutModal.addEventListener('click', (e) => {
            if (e.target === checkoutModal) hideCheckout();
        });
    }

});
