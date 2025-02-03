// Typed Text Effect for Home Section
document.addEventListener('DOMContentLoaded', () => {
    const typedTextEl = document.querySelector('.typed-text');
    const texts = ['Developer', 'Software Engineer', 'Creative Thinker'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedTextEl.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextEl.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }

    type();
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            burger.classList.remove('toggle');
        });
    });
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    emailjs.init("F4gyEzxXPEK5-mtJa");

    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Disable submit button during submission
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        // Collect form data
        const formData = {
            from_name: form.name.value, 
            from_email: form.email.value,  
            message: form.message.value 
        };

        console.log('Form Data:', formData); 

        emailjs.send("portfolioservice", "portfoliotemplate", formData)
            .then((response) => {
                console.log('Success:', response); 
                alert('Message sent successfully!');
                form.reset();
            }, (error) => {
                console.error('Email send failed:', error);
                alert('Failed to send message. Please try again.');
            })
            .finally(() => {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            });
    });
});

// Active Navigation Link Highlighting
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.id = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '🌓';
    document.body.appendChild(darkModeToggle);

    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('dark-mode');
    if (savedDarkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Save preference
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            localStorage.setItem('dark-mode', 'disabled');
        }
    });
});
