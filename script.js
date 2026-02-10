// Particle Animation
function createParticles() {
    const particleContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(0, 247, 255, ${Math.random() * 0.5 + 0.2})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particleContainer.appendChild(particle);
    }
}

// Float animation for particles
const style = document.createElement('style');
style.innerHTML = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        }
    }
`;
document.head.appendChild(style);

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 247, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

// Track which counters have been animated
const animatedCounters = new Set();

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate stat counters only once
            if (entry.target.classList.contains('stat-number')) {
                const counterId = entry.target.getAttribute('data-target');
                if (!animatedCounters.has(counterId)) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target);
                    animatedCounters.add(counterId);
                }
            }
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
const fadeElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .cert-card, .contact-card');
fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Observe stat numbers
const statNumbers = document.querySelectorAll('.stat-number');
statNumbers.forEach(stat => observer.observe(stat));

// Animate skill progress bars
const skillProgressBars = document.querySelectorAll('.skill-progress');
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.getAttribute('data-progress');
            entry.target.style.width = progress + '%';
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillProgressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// Typing Effect
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 1000);
}

// Add glitch effect on hover to hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    heroTitle.addEventListener('mouseenter', () => {
        heroTitle.style.animation = 'glitch 0.3s ease';
        setTimeout(() => {
            heroTitle.style.animation = '';
        }, 300);
    });
}

// Glitch animation
const glitchStyle = document.createElement('style');
glitchStyle.innerHTML = `
    @keyframes glitch {
        0% {
            transform: translate(0);
        }
        20% {
            transform: translate(-2px, 2px);
        }
        40% {
            transform: translate(-2px, -2px);
        }
        60% {
            transform: translate(2px, 2px);
        }
        80% {
            transform: translate(2px, -2px);
        }
        100% {
            transform: translate(0);
        }
    }
`;
document.head.appendChild(glitchStyle);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Add cursor trail effect
let cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY });
    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
});

function drawCursorTrail() {
    const existingTrails = document.querySelectorAll('.cursor-trail');
    existingTrails.forEach(trail => trail.remove());
    
    cursorTrail.forEach((pos, index) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.position = 'fixed';
        trail.style.left = pos.x + 'px';
        trail.style.top = pos.y + 'px';
        trail.style.width = '4px';
        trail.style.height = '4px';
        trail.style.borderRadius = '50%';
        trail.style.background = `rgba(0, 247, 255, ${0.5 - (index / trailLength) * 0.5})`;
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '9999';
        trail.style.transition = 'all 0.1s ease';
        document.body.appendChild(trail);
        
        setTimeout(() => trail.remove(), 100);
    });
    
    requestAnimationFrame(drawCursorTrail);
}

// Start cursor trail animation only on desktop
if (window.innerWidth > 768) {
    drawCursorTrail();
}

// Add random floating elements
function createFloatingElements() {
    const container = document.querySelector('.hero');
    if (!container) return;
    
    for (let i = 0; i < 5; i++) {
        const float = document.createElement('div');
        float.style.position = 'absolute';
        float.style.width = Math.random() * 100 + 50 + 'px';
        float.style.height = float.style.width;
        float.style.border = '1px solid rgba(0, 247, 255, 0.1)';
        float.style.borderRadius = '50%';
        float.style.left = Math.random() * 100 + '%';
        float.style.top = Math.random() * 100 + '%';
        float.style.animation = `floatElement ${Math.random() * 10 + 10}s ease-in-out infinite`;
        float.style.pointerEvents = 'none';
        container.appendChild(float);
    }
}

const floatElementStyle = document.createElement('style');
floatElementStyle.innerHTML = `
    @keyframes floatElement {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg);
        }
        25% {
            transform: translate(20px, -20px) rotate(90deg);
        }
        50% {
            transform: translate(0, -40px) rotate(180deg);
        }
        75% {
            transform: translate(-20px, -20px) rotate(270deg);
        }
    }
`;
document.head.appendChild(floatElementStyle);

// Active nav link highlight
const sections = document.querySelectorAll('section');
const navLinksAll = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active link style
const activeLinkStyle = document.createElement('style');
activeLinkStyle.innerHTML = `
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(activeLinkStyle);

// Add tilt effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Initialize particles and floating elements
window.addEventListener('load', () => {
    createParticles();
    createFloatingElements();
});

// Add skill tag hover effect
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 5px 15px rgba(0, 247, 255, 0.3)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Console easter egg
console.log('%c🔐 SECURITY NOTICE 🔐', 'color: #ff6b35; font-size: 20px; font-weight: bold;');
console.log('%cThis browser console is for developers only.', 'color: #9ba5b7; font-size: 14px;');
console.log('%cIf someone told you to paste something here, it could be a scam.', 'color: #0096ff; font-size: 14px;');
console.log('%c- Sahil Telote, Cloud Security Engineer', 'color: #ff6b35; font-size: 12px; font-style: italic;');

// Download Resume Button
const downloadResumeBtn = document.getElementById('downloadResume');
if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // Create a simple text resume (you can replace this with a PDF link later)
        const resumeContent = `
SAHIL RAVINDRA TELOTE
Cloud Security & Cybersecurity Engineer
Email: sahiltelote744@gmail.com | Phone: +91 87881 40976
LinkedIn: linkedin.com/in/sahil-telote-2406b733b | GitHub: github.com/sahil2022rt

PROFESSIONAL SUMMARY
Entry-level Cloud Security & Cybersecurity professional with hands-on experience in AWS and Google Cloud security, IAM, Linux systems, SOC operations, vulnerability assessment, incident response, logging, and monitoring.

EDUCATION
Bachelor of Engineering (B.E.) – Computer Engineering
University of Mumbai | 2022 – 2026 | CGPA: 7.45/10

CERTIFICATIONS
- Google Cloud Cybersecurity Certificate
- ISO/IEC 27001:2022 Lead Auditor
- Certified Red Team Operations Management (CRTOM)
- Cyber Security Architecture v1
- Certified Threat Intelligence & Governance Analyst (CTIGA)
- And 6 more...

Visit my portfolio for complete details: https://sahil2022rt.github.io/portfolio/
        `;
        
        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Sahil_Telote_Resume.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        // Show a toast notification
        const toast = document.createElement('div');
        toast.textContent = '✓ Resume downloaded successfully!';
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, #ff6b35, #0096ff);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
        `;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    });
}

// Toast animations
const toastStyle = document.createElement('style');
toastStyle.innerHTML = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(toastStyle);
