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
       2. DYNAMIC MODULES FETCH (EXPRESS API: GET /api/modules)
       ========================================================================== */
    const curriculumContainer = document.getElementById('curriculum-accordion-container');

    async function loadCourseModules() {
        if (!curriculumContainer) return;
        try {
            const response = await fetch('/api/modules');
            const result = await response.json();

            if (result.success && result.data && result.data.length > 0) {
                curriculumContainer.innerHTML = '';
                result.data.forEach((mod, index) => {
                    const isActive = index === 0 ? 'active' : '';
                    const itemHtml = `
                        <div class="accordion-item ${isActive}">
                            <button class="accordion-header">
                                <div class="header-left">
                                    <span class="module-number">${mod.moduleNumber || '0' + (index + 1)}</span>
                                    <div>
                                        <h4>${mod.title}</h4>
                                        <span class="module-meta">${mod.metaInfo}</span>
                                    </div>
                                </div>
                                <i class="fa-solid fa-chevron-down accordion-icon"></i>
                            </button>
                            <div class="accordion-content">
                                <ul class="lesson-list">
                                    ${mod.lessons.map(l => `<li><i class="fa-regular fa-circle-play"></i> ${l.title}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    `;
                    curriculumContainer.insertAdjacentHTML('beforeend', itemHtml);
                });

                attachAccordionEvents();
            }
        } catch (error) {
            console.error('Failed to fetch modules:', error);
        }
    }

    function attachAccordionEvents() {
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const accordionItem = header.parentElement;
                const content = accordionItem.querySelector('.accordion-content');
                const isActive = accordionItem.classList.contains('active');

                document.querySelectorAll('.accordion-item').forEach(item => {
                    item.classList.remove('active');
                    const itemContent = item.querySelector('.accordion-content');
                    if (itemContent) itemContent.style.maxHeight = null;
                });

                if (!isActive && content) {
                    accordionItem.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        });

        const activeItem = document.querySelector('.accordion-item.active .accordion-content');
        if (activeItem) {
            activeItem.style.maxHeight = activeItem.scrollHeight + "px";
        }
    }

    attachAccordionEvents();
    loadCourseModules();

    /* ==========================================================================
       3. DYNAMIC REVIEWS FETCH (EXPRESS API: GET /api/reviews)
       ========================================================================== */
    const reviewsContainer = document.getElementById('reviews-grid-container');

    async function loadReviews() {
        if (!reviewsContainer) return;
        try {
            const response = await fetch('/api/reviews');
            const result = await response.json();

            if (result.success && result.data && result.data.length > 0) {
                reviewsContainer.innerHTML = '';
                result.data.forEach(rev => {
                    const starsHtml = '<i class="fa-solid fa-star"></i>'.repeat(rev.rating || 5);
                    const reviewCard = `
                        <div class="review-card glass-card">
                            <div class="review-header">
                                <div class="user-avatar">${rev.avatarInitials || 'ST'}</div>
                                <div>
                                    <h4>${rev.name}</h4>
                                    <span class="user-role">${rev.role}</span>
                                </div>
                            </div>
                            <div class="stars">${starsHtml}</div>
                            <p class="review-text">"${rev.text}"</p>
                        </div>
                    `;
                    reviewsContainer.insertAdjacentHTML('beforeend', reviewCard);
                });
            }
        } catch (error) {
            console.error('Failed to load reviews:', error);
        }
    }

    loadReviews();

    /* ==========================================================================
       4. MOBILE MENU & FAQ ACCORDION
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navBackdrop = document.getElementById('nav-backdrop');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');

    function closeNavMenu() {
        if (navMenu) navMenu.classList.remove('active');
        if (navBackdrop) navBackdrop.classList.remove('active');
        document.body.classList.remove('menu-open');
        if (mobileToggle) {
            mobileToggle.setAttribute('aria-expanded', 'false');
            const icon = mobileToggle.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
        }
    }

    function openNavMenu() {
        if (navMenu) navMenu.classList.add('active');
        if (navBackdrop) navBackdrop.classList.add('active');
        document.body.classList.add('menu-open');
        if (mobileToggle) {
            mobileToggle.setAttribute('aria-expanded', 'true');
            const icon = mobileToggle.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-xmark';
        }
    }

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navMenu.classList.contains('active')) {
                closeNavMenu();
            } else {
                openNavMenu();
            }
        });
    }

    if (navBackdrop) {
        navBackdrop.addEventListener('click', closeNavMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeNavMenu();
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            closeNavMenu();
        }
    });

    const faqHeaders = document.querySelectorAll('.faq-header');
    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const faqItem = header.parentElement;
            const content = faqItem.querySelector('.faq-content');
            const isActive = faqItem.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const itemContent = item.querySelector('.faq-content');
                if (itemContent) itemContent.style.maxHeight = null;
            });

            if (!isActive && content) {
                faqItem.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    /* ==========================================================================
       5. VIDEO MODAL PLAYER
       ========================================================================== */
    const videoTrigger = document.getElementById('video-trigger');
    const videoModal = document.getElementById('video-modal');
    const closeVideoModal = document.getElementById('close-video-modal');
    const youtubeIframe = document.getElementById('youtube-iframe');

    const YOUTUBE_EMBED_URL = "https://www.youtube.com/embed/WNgvWYFwY20?autoplay=1";

    if (videoTrigger && videoModal && closeVideoModal && youtubeIframe) {
        videoTrigger.addEventListener('click', () => {
            youtubeIframe.src = YOUTUBE_EMBED_URL;
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const hideVideoModal = () => {
            youtubeIframe.src = "";
            videoModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        closeVideoModal.addEventListener('click', hideVideoModal);
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) hideVideoModal();
        });
    }

    /* ==========================================================================
       6. CHECKOUT FORM ENROLLMENT (POST /api/enroll)
       ========================================================================== */
    const checkoutTriggers = document.querySelectorAll('.checkout-trigger');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckoutModal = document.getElementById('close-checkout-modal');
    const selectedPlanName = document.getElementById('selected-plan-name');
    const summaryPlan = document.getElementById('summary-plan');
    const summaryPrice = document.getElementById('summary-price');
    const checkoutForm = document.getElementById('checkout-form');
    const submitBtn = document.getElementById('submit-enrollment-btn');

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

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const fullName = document.getElementById('user-name').value;
            const email = document.getElementById('user-email').value;
            const paymentMethod = document.getElementById('payment-method').value;
            const plan = selectedPlanName ? selectedPlanName.textContent : 'LaunchPad Standard';

            if (submitBtn) submitBtn.disabled = true;

            try {
                const response = await fetch('/api/enroll', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fullName, email, paymentMethod, plan })
                });

                const data = await response.json();

                if (data.success) {
                    alert(`🎉 ${data.message}\n\nPlan: ${plan}\nEmail: ${email}\nPayment Option: ${paymentMethod}\nPrice: ${summaryPrice.textContent}`);
                    if (checkoutModal) {
                        checkoutModal.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                    checkoutForm.reset();
                } else {
                    alert('Error: ' + data.message);
                }
            } catch (err) {
                alert('Connection error. Enrollment processed.');
                if (checkoutModal) checkoutModal.classList.remove('active');
            } finally {
                if (submitBtn) submitBtn.disabled = false;
            }
        });
    }

    /* ==========================================================================
       7. FLOATING CHAT & LEAD INQUIRY (POST /api/leads)
       ========================================================================== */
    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const chatPopup = document.getElementById('chat-popup');
    const chatCloseBtn = document.getElementById('chat-close-btn');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatBody = document.querySelector('.chat-body');

    if (chatToggleBtn && chatPopup) {
        chatToggleBtn.addEventListener('click', () => {
            chatPopup.classList.toggle('active');
        });
    }

    if (chatCloseBtn && chatPopup) {
        chatCloseBtn.addEventListener('click', () => {
            chatPopup.classList.remove('active');
        });
    }

    if (chatForm && chatInput && chatBody) {
        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const message = chatInput.value.trim();
            if (!message) return;

            const userMsgHtml = `<div class="chat-bubble right" style="background: rgba(217,63,112,0.2); color: #EFECF6; text-align: right; margin-top: 8px;">${message}</div>`;
            chatBody.insertAdjacentHTML('beforeend', userMsgHtml);
            chatInput.value = '';

            try {
                await fetch('/api/leads', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message, source: 'Website Chat Widget' })
                });

                setTimeout(() => {
                    const replyHtml = `<div class="chat-bubble left" style="margin-top: 8px;">Thanks for reaching out! Sir Muhammad Adeel's team will connect via WhatsApp shortly.</div>`;
                    chatBody.insertAdjacentHTML('beforeend', replyHtml);
                    chatBody.scrollTop = chatBody.scrollHeight;
                }, 600);

            } catch (e) {
                console.log('Lead post fallback');
            }
        });
    }

    /* ==========================================================================
       8. ANIMATED COUNTER ON SCROLL
       ========================================================================== */
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimatedStats = false;

    function animateStats() {
        const statsSection = document.querySelector('.stats-section');
        if (!statsSection) return;

        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.2;

        if (sectionPos < screenPos && !hasAnimatedStats) {
            hasAnimatedStats = true;
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const isCurrency = stat.textContent.includes('$');
                const isPercent = stat.textContent.includes('%');
                const isFraction = stat.textContent.includes('/7');

                let count = 0;
                const speed = target / 50;

                const timer = setInterval(() => {
                    count += speed;
                    if (count >= target) {
                        count = target;
                        clearInterval(timer);
                    }

                    if (isCurrency) {
                        stat.textContent = '$' + (Math.floor(count)).toLocaleString();
                    } else if (isPercent) {
                        stat.textContent = Math.floor(count) + '%';
                    } else if (isFraction) {
                        stat.textContent = Math.floor(count) + '/7';
                    } else {
                        stat.textContent = Math.floor(count).toLocaleString() + '+';
                    }
                }, 30);
            });
        }
    }

    window.addEventListener('scroll', animateStats);

});
