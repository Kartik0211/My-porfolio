document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initContactForm();
    initChatbot();
    initThemeToggle();
    initNavigationHighlight();
    initSkillsAnimation();
    initBackToTopButton();
    initMobileMenu();
});

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                alert('Message sent successfully!');
                contactForm.reset();
            } else {
                alert('Please fill out all fields.');
            }
        });
    }
}

// Chatbot functionality
function initChatbot() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    
    if (!chatbotToggle || !chatbotContainer) return;
    
    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', function() {
        chatbotContainer.classList.toggle('active');
    });
    
    // Close chatbot
    chatbotClose.addEventListener('click', function() {
        chatbotContainer.classList.remove('active');
    });
    
    // Send message when clicking send button
    chatbotSend.addEventListener('click', sendMessage);
    
    // Send message when pressing Enter key
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    function sendMessage() {
        const message = chatbotInput.value.trim();
        
        if (message) {
            // Add user message to chat
            addMessage(message, 'user');
            
            // Clear input
            chatbotInput.value = '';
            
            // Generate and add bot response after a short delay
            setTimeout(() => {
                const botResponse = generateResponse(message);
                addMessage(botResponse, 'bot');
                
                // Scroll to bottom of chat
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }, 500);
        }
    }
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        
        const messageP = document.createElement('p');
        messageP.textContent = text;
        
        messageDiv.appendChild(messageP);
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll to bottom of chat
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function generateResponse(userMessage) {
        // Convert user message to lowercase for easier matching
        const message = userMessage.toLowerCase();
        
        // Simple response logic
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! How can I help you today?";
        } else if (message.includes('about') || message.includes('who are you')) {
            return "I'm an AI assistant for Kartik's portfolio. I can answer questions about his skills and projects.";
        } else if (message.includes('skill') || message.includes('technology')) {
            return "Kartik has skills in Python, Java, JavaScript, HTML, CSS, Node.js, Express, Socket.io, Data Visualization, and MySQL.";
        } else if (message.includes('project') || message.includes('work')) {
            return "Kartik has worked on several projects including Student Performance Analysis, Sales Visualization Dashboard, and Real-Time Chat Application.";
        } else if (message.includes('contact') || message.includes('email') || message.includes('hire')) {
            return "You can contact Kartik through his LinkedIn profile or GitHub account linked in the About section.";
        } else if (message.includes('education') || message.includes('student')) {
            return "Kartik is an Engineering student with strong foundations in web development and data analysis.";
        } else if (message.includes('thank') || message.includes('thanks')) {
            return "You're welcome! Is there anything else you'd like to know?";
        } else {
            // Default response for unrecognized queries
            const defaultResponses = [
                "I'm not sure I understand. Could you try asking about Kartik's skills, projects, or background?",
                "That's an interesting question. I'm designed to answer questions about Kartik's portfolio.",
                "I'm still learning. Try asking about the projects or skills mentioned in this portfolio."
            ];
            return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
        }
    }
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    
    if (!themeToggle || !themeIcon) return;
    
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Navigation highlight functionality
function initNavigationHighlight() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
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
}

// Skills animation functionality
function initSkillsAnimation() {
    const skillSection = document.querySelector('.skills-section');
    const progressBars = document.querySelectorAll('.progress');
    
    if (!skillSection || progressBars.length === 0) return;
    
    function animateSkills() {
        progressBars.forEach(bar => {
            const percent = bar.style.width;
            bar.parentElement.setAttribute('data-percent', percent);
            bar.style.setProperty('--skill-level', percent);
        });
    }

    // Intersection Observer to trigger animation when skills section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(skillSection);
}

// Back to top button functionality
function initBackToTopButton() {
    const backToTopButton = document.createElement('button');
    backToTopButton.classList.add('back-to-top');
    backToTopButton.innerHTML = '↑';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    });
}