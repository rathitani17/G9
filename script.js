// Theme Toggle
function toggleTheme() {
    const html = document.documentElement;
    const themeIcon = document.getElementById('themeIcon');
    
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        html.classList.add('light');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.remove('light');
        html.classList.add('dark');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const nav = document.getElementById('navMenu');
    const icon = document.getElementById('mobileMenuIcon');
    
    nav.classList.toggle('active');
    
    if (nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// Show Section
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
    
    // Update nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
    
    // Close mobile menu
    const nav = document.getElementById('navMenu');
    const icon = document.getElementById('mobileMenuIcon');
    nav.classList.remove('active');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update URL hash without scrolling
    history.pushState(null, null, '#' + sectionId);
}

// Filter Vehicles
function filterVehicles(type) {
    const vehicles = document.querySelectorAll('.vehicle-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Update active button
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter vehicles
    vehicles.forEach(vehicle => {
        if (type === 'all') {
            vehicle.style.display = 'block';
        } else {
            if (vehicle.getAttribute('data-type') === type) {
                vehicle.style.display = 'block';
            } else {
                vehicle.style.display = 'none';
            }
        }
    });
}

// Update Price Range
function updatePrice(value) {
    document.getElementById('priceValue').textContent = `$0 - $${parseInt(value).toLocaleString()}`;
}

// Show Vehicle Detail (placeholder)
function showVehicleDetail(id) {
    alert('Vehicle detail page - This would show full details of vehicle #' + id);
}

// Handle Sell Form Submit
function handleSellSubmit(event) {
    event.preventDefault();
    alert('Thank you! Your vehicle listing has been submitted. We will contact you shortly.');
    event.target.reset();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        document.getElementById('themeIcon').classList.remove('fa-moon');
        document.getElementById('themeIcon').classList.add('fa-sun');
    }
    
    // Check URL hash on load
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        showSection(hash);
    }
    
    // Handle browser back/forward
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            showSection(hash);
        } else {
            showSection('home');
        }
    });
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .vehicle-card, .category-card, .service-premium-card');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Prevent default on all anchor clicks
    document.querySelectorAll('a[href^="javascript:void(0)"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
        });
    });
});

// Smooth scroll behavior
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});
