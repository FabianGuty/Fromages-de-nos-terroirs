// Smooth Scroll Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');

            // Close mobile menu if open
            navList.classList.remove('active');
        }
    });
});

// Shrinking Navbar on Scroll
const header = document.querySelector('.header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add/remove scrolled class - CSS handles all visual transitions
    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop;
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');

navToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
});

// Chatbot Functionality
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotBadge = document.querySelector('.chatbot-badge');

// Toggle chatbot window
if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
        if (chatbotWindow.classList.contains('active')) {
            if (chatbotInput) chatbotInput.focus();
            if (chatbotBadge) chatbotBadge.style.display = 'none';
        }
    });
}

// Close chatbot
if (chatbotClose && chatbotWindow) {
    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
    });
}


// Send message function
function sendMessage(message) {
    if (!message.trim()) return;

    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'chatbot-message user-message';
    userMessage.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-user"></i>
        </div>
        <div class="message-content">
            <p>${message}</p>
            <span class="message-time">Maintenant</span>
        </div>
    `;
    chatbotMessages.appendChild(userMessage);

    // Clear input
    chatbotInput.value = '';

    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    // Simulate bot response
    setTimeout(() => {
        const botResponse = getBotResponse(message);
        const botMessage = document.createElement('div');
        botMessage.className = 'chatbot-message bot-message';
        botMessage.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>${botResponse}</p>
                <span class="message-time">Maintenant</span>
            </div>
        `;
        chatbotMessages.appendChild(botMessage);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }, 1000);
}

// Get bot response based on message
function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('horaire') || lowerMessage.includes('ouvert') || lowerMessage.includes('heure')) {
        return 'Nos boutiques sont ouvertes du mardi au samedi. Pour les horaires précis, je vous invite à nous contacter directement au 02 97 38 09 88 (Pontivy) ou 02 97 63 06 40 (Vannes). 🕐';
    } else if (lowerMessage.includes('commander') || lowerMessage.includes('commande')) {
        return 'Vous pouvez passer commande directement en boutique ou nous contacter par téléphone. Nous préparons votre sélection avec soin! 🧀';
    } else if (lowerMessage.includes('fromage') || lowerMessage.includes('conseil')) {
        return 'Notre équipe d\'experts est là pour vous conseiller! Nous avons une large sélection de fromages régionaux affinés et français. Venez nous rendre visite pour une dégustation personnalisée! 😊';
    } else if (lowerMessage.includes('vin')) {
        return 'Nous proposons plus de 100 références de vins soigneusement sélectionnés pour accompagner nos fromages. Notre équipe peut vous conseiller les meilleurs accords! 🍷';
    } else if (lowerMessage.includes('adresse') || lowerMessage.includes('où') || lowerMessage.includes('localisation')) {
        return 'Nous avons deux boutiques: à Pontivy (5 B rue Colette Besson) et à Vannes (55 avenue Borgnis Desbordes). Consultez la section Contact pour plus de détails! 📍';
    } else if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes('hello')) {
        return 'Bonjour! Comment puis-je vous aider aujourd\'hui? N\'hésitez pas à me poser vos questions sur nos fromages, vins ou boutiques! 👋';
    } else if (lowerMessage.includes('merci')) {
        return 'Avec plaisir! N\'hésitez pas si vous avez d\'autres questions. Au plaisir de vous accueillir en boutique! 😊';
    } else {
        return 'Merci pour votre message! Pour une réponse personnalisée, n\'hésitez pas à nous contacter directement au 02 97 38 09 88 (Pontivy) ou 02 97 63 06 40 (Vannes). Notre équipe sera ravie de vous aider! 📞';
    }
}


// Send message on button click
if (chatbotSend) {
    chatbotSend.addEventListener('click', () => {
        sendMessage(chatbotInput.value);
    });
}

// Send message on Enter key
if (chatbotInput) {
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage(chatbotInput.value);
        }
    });
}

// Quick replies
if (chatbotMessages) {
    document.querySelectorAll('.quick-reply').forEach(button => {
        button.addEventListener('click', () => {
            sendMessage(button.textContent);
        });
    });
}


// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            // Unobserve after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.value-card, .product-card, .gallery-item, .contact-card').forEach(el => {
    observer.observe(el);
});

console.log('Navigation script loaded v1.1.0');

// Active Navigation Highlighting
function updateNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const currentUrl = new URL(window.location.href);
    const currentPath = currentUrl.pathname.replace(/\/$/, '') || '/index.html';

    // 1. Identify current page
    navLinks.forEach(link => {
        const linkUrl = new URL(link.href, window.location.origin);
        const linkPath = linkUrl.pathname.replace(/\/$/, '') || '/index.html';

        // Exact path match (ignoring traling slashes)
        if (linkPath === currentPath && !linkUrl.hash) {
            link.dataset.isPage = "true";
            link.classList.add('active');
        }
    });

    // 2. Scroll Listener
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            const isPage = link.dataset.isPage === "true";
            const linkUrl = new URL(link.href, window.location.origin);
            const hash = linkUrl.hash.substring(1);

            // Always keep the current page link active
            if (isPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }

            // Also highlight section links (ScrollSpy)
            if (current && hash === current) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize on load
updateNavigation();

// Show welcome message after delay
if (chatbotWindow && chatbotBadge) {
    setTimeout(() => {
        if (!chatbotWindow.classList.contains('active')) {
            chatbotBadge.style.display = 'flex';
        }
    }, 5000);
}

// Modal Functionality for SAVOIR+ button
const openProduitsModalBtn = document.getElementById('openProduitsModal');
const produitsModal = document.getElementById('produitsModal');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');

// Open modal function
function openModal() {
    if (produitsModal) {
        produitsModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

// Close modal function
function closeModal() {
    if (produitsModal) {
        produitsModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Event listeners for modal
if (openProduitsModalBtn) {
    openProduitsModalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openModal();
    });
}

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
}

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && produitsModal && produitsModal.classList.contains('active')) {
        closeModal();
    }
});

// Modal Functionality for Environnement SAVOIR+ button
const openEnvironnementModalBtn = document.getElementById('openEnvironnementModal');
const environnementModal = document.getElementById('environnementModal');

// Event listener for environnement modal
if (openEnvironnementModalBtn && environnementModal) {
    openEnvironnementModalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        environnementModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Close environnement modal with close button and overlay
if (environnementModal) {
    const environnementModalClose = environnementModal.querySelector('.modal-close');
    const environnementModalOverlay = environnementModal.querySelector('.modal-overlay');

    if (environnementModalClose) {
        environnementModalClose.addEventListener('click', () => {
            environnementModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (environnementModalOverlay) {
        environnementModalOverlay.addEventListener('click', () => {
            environnementModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
}

// Close environnement modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (environnementModal && environnementModal.classList.contains('active')) {
            environnementModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Modal Functionality for Implication SAVOIR+ button
const openImplicationModalBtn = document.getElementById('openImplicationModal');
const implicationModal = document.getElementById('implicationModal');

if (openImplicationModalBtn && implicationModal) {
    openImplicationModalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        implicationModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Close implication modal with close button and overlay
if (implicationModal) {
    const implicationModalClose = implicationModal.querySelector('.modal-close');
    const implicationModalOverlay = implicationModal.querySelector('.modal-overlay');

    if (implicationModalClose) {
        implicationModalClose.addEventListener('click', () => {
            implicationModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (implicationModalOverlay) {
        implicationModalOverlay.addEventListener('click', () => {
            implicationModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
}

// Close implication modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (implicationModal && implicationModal.classList.contains('active')) {
            implicationModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Order Form Modal Functionality
const orderFormModal = document.getElementById('orderFormModal');
const openOrderFormBtn = document.getElementById('openOrderForm');
const orderForm = document.getElementById('orderForm');
const racletteCheckbox = document.getElementById('raclette');
const fondueCheckbox = document.getElementById('fondue');
const remarquesField = document.getElementById('remarques');
const remarquesRequired = document.getElementById('remarquesRequired');

// Open order form modal
if (openOrderFormBtn && orderFormModal) {
    openOrderFormBtn.addEventListener('click', () => {
        orderFormModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Close order form modal
if (orderFormModal) {
    const modalCloseBtn = orderFormModal.querySelector('.modal-close');
    const modalOverlay = orderFormModal.querySelector('.modal-overlay');

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            orderFormModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', () => {
            orderFormModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && orderFormModal.classList.contains('active')) {
            orderFormModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Conditional validation for raclette/fondue
function updateRemarquesValidation() {
    const racletteChecked = racletteCheckbox ? racletteCheckbox.checked : false;
    const fondueChecked = fondueCheckbox ? fondueCheckbox.checked : false;

    if (remarquesField && remarquesRequired) {
        if (racletteChecked || fondueChecked) {
            remarquesField.setAttribute('required', 'required');
            remarquesRequired.style.display = 'inline';
        } else {
            remarquesField.removeAttribute('required');
            remarquesRequired.style.display = 'none';
        }
    }
}

if (racletteCheckbox) {
    racletteCheckbox.addEventListener('change', updateRemarquesValidation);
}

if (fondueCheckbox) {
    fondueCheckbox.addEventListener('change', updateRemarquesValidation);
}

// Toast Notification Logic
function showToast(message, type = 'success') {
    // Create container if it doesn't exist
    let container = document.querySelector('.toast-container');
    let backdrop = document.querySelector('.toast-backdrop');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'toast-backdrop';
        document.body.appendChild(backdrop);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    // Use Font Awesome icons if available
    const iconClass = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';

    toast.innerHTML = `
        <i class="fas ${iconClass} toast-icon" style="font-size: 3rem; margin-bottom: 15px;"></i>
        <div class="toast-content" style="font-size: 1.25rem; font-weight: 600;">${message}</div>
        <button class="btn-primary" style="margin-top: 15px; padding: 10px 25px; cursor: pointer; border-radius: 50px;">D'accord</button>
    `;

    const closeToast = () => {
        toast.classList.remove('active');
        backdrop.classList.remove('active');
        setTimeout(() => {
            toast.remove();
            if (container.children.length === 0) {
                container.remove();
                if (backdrop) backdrop.remove();
            }
        }, 400);
    };

    const closeBtn = toast.querySelector('button');
    if (closeBtn) closeBtn.onclick = closeToast;

    container.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.classList.add('active');
        if (backdrop) backdrop.classList.add('active');
    }, 10);

    setTimeout(closeToast, 10000);
}

// Form submission
// EmailJS Configuration (Client needs to fill these)
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY',
    SERVICE_ID: 'YOUR_SERVICE_ID',
    TEMPLATE_ID_BUSINESS: 'YOUR_BUSINESS_TEMPLATE_ID',
    TEMPLATE_ID_CLIENT: 'YOUR_CLIENT_TEMPLATE_ID'
};

// Initialize EmailJS
if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    console.log('EmailJS initialized (ready for client keys)');
}

if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate at least one product selected
        const productCheckboxes = orderForm.querySelectorAll('input[name="products"]:checked');
        if (productCheckboxes.length === 0) {
            showToast('Veuillez sélectionner au moins un produit ou une formule.', 'error');
            return;
        }

        // Show loading state
        const submitBtn = orderForm.querySelector('.btn-submit');
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

        // Collect form data
        const formData = new FormData(orderForm);
        const data = {};

        // Regular fields
        for (let [key, value] of formData.entries()) {
            if (key === 'products') {
                if (!data.products) data.products = [];
                // Transform internal value to human-readable (simple version)
                data.products.push(value.replace(/_/g, ' '));
            } else {
                data[key] = value;
            }
        }

        // Add additional info for EmailJS
        const templateParams = {
            from_name: `${data.prenom} ${data.nom}`,
            from_email: data.email,
            phone: data.telephone,
            request_type: data.requestType === 'commande' ? 'COMMANDE' : 'DEMANDE DE DEVIS',
            products: data.products ? data.products.join(', ') : 'Aucun',
            notes: data.remarques || 'Aucune',
            pickup_location: data.boutique === 'pontivy' ? 'Pontivy' : 'Vannes',
            payment_method: data.paiement,
            pickup_date: data.dateRetrait,
            pickup_time: data.heureRetrait
        };

        // If keys are not set, fallback to console log or alert for dev
        if (EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
            console.log('Simulation EmailJS Submission:', templateParams);
            setTimeout(() => {
                showToast('Simulation : La commande a été validée avec succès.', 'success');
                finalizeForm();
            }, 1500);
            return;
        }

        // 1. Send to Business
        emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID_BUSINESS, templateParams)
            .then(() => {
                // 2. Send Auto-confirmation to Client
                return emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID_CLIENT, templateParams);
            })
            .then(() => {
                showToast('Merci ! Votre demande a été envoyée avec succès.', 'success');
                finalizeForm();
            })
            .catch((error) => {
                console.error('EmailJS Error:', error);
                showToast('Une erreur est survenue lors de l\'envoi.', 'error');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
            });

        function finalizeForm() {
            orderForm.reset();
            if (typeof updateRemarquesValidation === 'function') updateRemarquesValidation();
            orderFormModal.classList.remove('active');
            document.body.style.overflow = '';
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
        }
    });
}


// ========================================
// CAROUSEL FUNCTIONALITY
// ========================================

// Initialize carousel only if carousel container exists
const carouselContainer = document.querySelector('.carousel-container');

if (carouselContainer) {
    const track = carouselContainer.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = carouselContainer.querySelector('.carousel-btn-next');
    const prevButton = carouselContainer.querySelector('.carousel-btn-prev');
    const dotsContainer = carouselContainer.querySelector('.carousel-dots');
    const dots = Array.from(dotsContainer.children);

    let currentIndex = 0;
    let autoPlayInterval;
    const autoPlayDelay = 6000; // 6 seconds

    // Get slide width (container width since slides are 100% width in flexbox)
    const getSlideWidth = () => {
        return carouselContainer.offsetWidth;
    };

    // Move to target slide using translateX
    const moveToSlide = (targetIndex) => {
        const slideWidth = getSlideWidth();
        const offset = targetIndex * slideWidth;
        track.style.transform = `translateX(-${offset}px)`;
        currentIndex = targetIndex;
        updateDots();
    };

    // Update dot indicators
    const updateDots = () => {
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    // Next slide
    const nextSlide = () => {
        const nextIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
        moveToSlide(nextIndex);
    };

    // Previous slide
    const prevSlide = () => {
        const prevIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
        moveToSlide(prevIndex);
    };

    // Auto-play functionality
    const startAutoPlay = () => {
        autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
    };

    const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
    };

    // Event listeners for navigation buttons
    nextButton.addEventListener('click', () => {
        nextSlide();
        stopAutoPlay();
     
