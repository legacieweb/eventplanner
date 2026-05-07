// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Custom popup function
    function showPopup(message, type = 'success') {
        const popup = document.createElement('div');
        popup.className = `custom-popup ${type}`;
        
        popup.innerHTML = `
            <div class="popup-icon">${type === 'success' ? '✓' : '!'}</div>
            <div class="popup-message">${message}</div>
            <div class="popup-close">&times;</div>
        `;
        
        document.body.appendChild(popup);
        
        // Force reflow for animation
        popup.offsetHeight;
        
        popup.classList.add('active');
        
        const closeBtn = popup.querySelector('.popup-close');
        const closePopup = () => {
            popup.classList.remove('active');
            setTimeout(() => {
                popup.remove();
            }, 500);
        };
        
        closeBtn.addEventListener('click', closePopup);
        
        // Auto-close after 5 seconds
        setTimeout(closePopup, 5000);
    }

    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for section animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simple form validation
            const name = this.name.value.trim();
            const email = this.email.value.trim();
            const message = this.message.value.trim();

            if (!name || !email || !message) {
                showPopup('Please fill in all fields.', 'error');
                return;
            }

            // Simulate form submission
            showPopup('Thank you for contacting Booktels! We will respond to your inquiry soon.');

            // Reset form
            this.reset();
        });
    }

    // Add subtle hover effects to service cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });

    // Footer link hover effects
    const footerLinks = document.querySelectorAll('footer a');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(3px)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.nav-container-main');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close mobile menu when clicking on a link
        const mobileMenuLinks = document.querySelectorAll('.nav-links a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

});