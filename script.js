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
        startAutoPlay(); // Restart auto-play after manual navigation
    });

    prevButton.addEventListener('click', () => {
        prevSlide();
        stopAutoPlay();
        startAutoPlay(); // Restart auto-play after manual navigation
    });

    // Event listeners for dot indicators
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            moveToSlide(index);
            stopAutoPlay();
            startAutoPlay(); // Restart auto-play after manual navigation
        });
    });

    // Pause auto-play on hover
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        moveToSlide(currentIndex);
    });

    // Start auto-play when page loads
    startAutoPlay();

    console.log('Carousel initialized with', slides.length, 'slides');
}

// CHEESE CAROUSEL FUNCTIONALITY (2 cards per slide)
const cheeseCarouselContainer = document.querySelector('.carousel-container-cheese');

if (cheeseCarouselContainer) {
    const track = cheeseCarouselContainer.querySelector('.carousel-track-cheese');
    const slides = Array.from(track.children);
    const nextButton = cheeseCarouselContainer.querySelector('.carousel-btn-next-cheese');
    const prevButton = cheeseCarouselContainer.querySelector('.carousel-btn-prev-cheese');
    const dotsContainer = cheeseCarouselContainer.querySelector('.carousel-dots-cheese');
    const dots = Array.from(dotsContainer.children);

    let currentIndex = 0;
    let autoPlayInterval;
    const autoPlayDelay = 8000; // 8 seconds (slower for better viewing)
    const totalSlides = slides.length; // 3 slides (each with 2 cards)
    const totalPositions = totalSlides; // 3 positions (one per slide)

    // Get slide width (container width since slides are 100% width in flexbox)
    const getSlideWidth = () => {
        return cheeseCarouselContainer.offsetWidth;
    };

    // Move to target position (each position shows 2 cards)
    const moveToPosition = (positionIndex) => {
        const slideWidth = getSlideWidth();
        const offset = positionIndex * slideWidth;
        track.style.transform = `translateX(-${offset}px)`;
        currentIndex = positionIndex;
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

    // Next position
    const nextPosition = () => {
        const nextIndex = currentIndex === totalPositions - 1 ? 0 : currentIndex + 1;
        moveToPosition(nextIndex);
    };

    // Previous position
    const prevPosition = () => {
        const prevIndex = currentIndex === 0 ? totalPositions - 1 : currentIndex - 1;
        moveToPosition(prevIndex);
    };

    // Auto-play functionality
    const startAutoPlay = () => {
        autoPlayInterval = setInterval(nextPosition, autoPlayDelay);
    };

    const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
    };

    // Event listeners for navigation buttons
    nextButton.addEventListener('click', () => {
        nextPosition();
        stopAutoPlay();
        startAutoPlay(); // Restart auto-play after manual navigation
    });

    prevButton.addEventListener('click', () => {
        prevPosition();
        stopAutoPlay();
        startAutoPlay(); // Restart auto-play after manual navigation
    });

    // Event listeners for dot indicators
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            moveToPosition(index);
            stopAutoPlay();
            startAutoPlay(); // Restart auto-play after manual navigation
        });
    });

    // Pause auto-play on hover over cheese cards
    const cheeseCards = cheeseCarouselContainer.querySelectorAll('.cheese-card');
    cheeseCards.forEach(card => {
        card.addEventListener('mouseenter', stopAutoPlay);
        card.addEventListener('mouseleave', startAutoPlay);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevPosition();
            stopAutoPlay();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            nextPosition();
            stopAutoPlay();
            startAutoPlay();
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        moveToPosition(currentIndex);
    });

    // Start auto-play when page loads
    startAutoPlay();

    console.log('Cheese carousel initialized with', totalSlides, 'slides in', totalPositions, 'positions (2 cards each)');
}

// LIGHTBOX FUNCTIONALITY
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const cheeseImages = document.querySelectorAll('.cheese-image');
const galleryImages = document.querySelectorAll('.gallery-item img');

// Open lightbox when clicking on a cheese image
cheeseImages.forEach(image => {
    image.addEventListener('click', () => {
        lightboxModal.classList.add('active');
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        document.body.classList.add('lightbox-open');
    });
});

// Open lightbox when clicking on a gallery image or its overlay
galleryImages.forEach(image => {
    // Get the parent gallery-item container
    const galleryItem = image.closest('.gallery-item');
    if (galleryItem) {
        // Add click handler to the entire container
        galleryItem.style.cursor = 'pointer';
        galleryItem.addEventListener('click', () => {
            lightboxModal.classList.add('active');
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            document.body.classList.add('lightbox-open');
        });
    }
});

// Close lightbox when clicking the close button
if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

// Close lightbox when clicking outside the image
if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });
}

// Close lightbox with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
    }
});

// Function to close lightbox
function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.classList.remove('lightbox-open');
    // Clear the image src after animation
    setTimeout(() => {
        if (!lightboxModal.classList.contains('active')) {
            if (lightboxImage) {
                lightboxImage.src = '';
                lightboxImage.alt = "Agrandissement de l'image";
            }
        }
    }, 300);
}

console.log('Lightbox initialized for', cheeseImages.length, 'cheese images and', galleryImages.length, 'gallery images');

// PRICE CHART MODAL FUNCTIONALITY
const priceChartModal = document.getElementById('priceChartModal');
const openPriceChartBtn = document.getElementById('openPriceChartBtn');
const priceChartClose = document.getElementById('priceChartClose');

// Open price chart modal when clicking the button
if (openPriceChartBtn && priceChartModal) {
    openPriceChartBtn.addEventListener('click', () => {
        priceChartModal.classList.add('active');
        document.body.classList.add('lightbox-open');
    });
}

// Close price chart modal when clicking the close button
if (priceChartClose && priceChartModal) {
    priceChartClose.addEventListener('click', () => {
        priceChartModal.classList.remove('active');
        document.body.classList.remove('lightbox-open');
    });
}

// Close price chart modal when clicking outside the image
if (priceChartModal) {
    priceChartModal.addEventListener('click', (e) => {
        if (e.target === priceChartModal) {
            priceChartModal.classList.remove('active');
            document.body.classList.remove('lightbox-open');
        }
    });
}

// Close price chart modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && priceChartModal && priceChartModal.classList.contains('active')) {
        priceChartModal.classList.remove('active');
        document.body.classList.remove('lightbox-open');
    }
});

console.log('Price chart modal initialized');

// RACLETTE CHART MODAL FUNCTIONALITY
const racletteChartModal = document.getElementById('racletteChartModal');
const openRacletteChartBtn = document.getElementById('openRacletteChartBtn');
const racletteChartClose = document.getElementById('racletteChartClose');

// Open raclette chart modal when clicking the button
if (openRacletteChartBtn && racletteChartModal) {
    openRacletteChartBtn.addEventListener('click', () => {
        racletteChartModal.classList.add('active');
        document.body.classList.add('lightbox-open');
    });
}

// Close raclette chart modal when clicking the close button
if (racletteChartClose && racletteChartModal) {
    racletteChartClose.addEventListener('click', () => {
        racletteChartModal.classList.remove('active');
        document.body.classList.remove('lightbox-open');
    });
}

// Close raclette chart modal when clicking outside the image
if (racletteChartModal) {
    racletteChartModal.addEventListener('click', (e) => {
        if (e.target === racletteChartModal) {
            racletteChartModal.classList.remove('active');
            document.body.classList.remove('lightbox-open');
        }
    });
}

// Close raclette chart modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && racletteChartModal && racletteChartModal.classList.contains('active')) {
        racletteChartModal.classList.remove('active');
        document.body.classList.remove('lightbox-open');
    }
});

console.log('Raclette chart modal initialized');

// Fondue Chart Modal
const fondueChartModal = document.getElementById('fondueChartModal');
const openFondueChartBtn = document.getElementById('openFondueChartBtn');
const fondueChartClose = document.getElementById('fondueChartClose');

if (openFondueChartBtn && fondueChartModal) {
    openFondueChartBtn.addEventListener('click', () => {
        fondueChartModal.classList.add('active');
        document.body.classList.add('lightbox-open');
    });

    fondueChartClose.addEventListener('click', () => {
        fondueChartModal.classList.remove('active');
        document.body.classList.remove('lightbox-open');
    });

    fondueChartModal.addEventListener('click', (e) => {
        if (e.target === fondueChartModal) {
            fondueChartModal.classList.remove('active');
            document.body.classList.remove('lightbox-open');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && fondueChartModal.classList.contains('active')) {
            fondueChartModal.classList.remove('active');
            document.body.classList.remove('lightbox-open');
        }
    });
}

console.log('Fondue chart modal initialized');

// GIFT CARD MODAL FUNCTIONALITY
const giftCardModal = document.getElementById('giftCardModal');
const openGiftCardModalBtn = document.getElementById('openGiftCardModal');
const giftCardClose = document.getElementById('giftCardClose');

// Open gift card modal when clicking the button
if (openGiftCardModalBtn && giftCardModal) {
    openGiftCardModalBtn.addEventListener('click', () => {
        giftCardModal.classList.add('active');
        document.body.classList.add('lightbox-open');
    });
}

// Close gift card modal when clicking the close button
if (giftCardClose && giftCardModal) {
    giftCardClose.addEventListener('click', () => {
        giftCardModal.classList.remove('active');
        document.body.classList.remove('lightbox-open');
    });
}

// Close gift card modal when clicking outside the content
if (giftCardModal) {
    giftCardModal.addEventListener('click', (e) => {
        if (e.target === giftCardModal) {
            giftCardModal.classList.remove('active');
            document.body.classList.remove('lightbox-open');
        }
    });
}

// Close gift card modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && giftCardModal && giftCardModal.classList.contains('active')) {
        giftCardModal.classList.remove('active');
        document.body.classList.remove('lightbox-open');
    }
});

console.log('Gift card modal initialized');

// Cookie Banner Logic
function initCookieBanner() {
    // Check if user already gave consent
    if (localStorage.getItem('cookieConsent')) return;

    // Create the banner HTML
    const bannerHTML = `
    <div id="cookieBanner" class="cookie-banner">
        <div class="cookie-banner-container">
            <div class="cookie-content">
                <h3>Ce site web utilise des cookies</h3>
                <p>Les cookies nous permettent de personnaliser le contenu et les annonces, d'offrir des fonctionnalités relatives aux médias sociaux et d'analyser notre trafic. Nous partageons aussi des informations sur l'utilisation de notre site avec nos partenaires de médias sociaux, de publicité et d'analyse.</p>
            </div>
            <div class="cookie-options">
                <label class="cookie-option">
                    <input type="checkbox" checked disabled> Nécessaires
                </label>
                <label class="cookie-option">
                    <input type="checkbox" id="cookiePrefs" checked> Préférences
                </label>
                <label class="cookie-option">
                    <input type="checkbox" id="cookieStats" checked> Statistiques
                </label>
                <label class="cookie-option">
                    <input type="checkbox" id="cookieMarketing" checked> Marketing
                </label>
            </div>
            <div class="cookie-buttons">
                <button id="denyCookies" class="cookie-btn cookie-btn-secondary">Uniquement nécessaires</button>
                <button id="allowSelection" class="cookie-btn cookie-btn-secondary">Autoriser la sélection</button>
                <button id="allowAllCookies" class="cookie-btn cookie-btn-primary">Autoriser tous les cookies</button>
            </div>
        </div>
    </div>
    `;

    // Inject into body
    document.body.insertAdjacentHTML('beforeend', bannerHTML);

    const banner = document.getElementById('cookieBanner');
    const allowAllBtn = document.getElementById('allowAllCookies');
    const allowSelectionBtn = document.getElementById('allowSelection');
    const denyBtn = document.getElementById('denyCookies');

    // Show banner with delay
    setTimeout(() => {
        banner.style.display = 'block';
    }, 1000);

    // Event Listeners
    allowAllBtn.addEventListener('click', () => {
        saveConsent(true, true, true);
    });

    allowSelectionBtn.addEventListener('click', () => {
        const prefs = document.getElementById('cookiePrefs').checked;
        const stats = document.getElementById('cookieStats').checked;
        const marketing = document.getElementById('cookieMarketing').checked;
        saveConsent(prefs, stats, marketing);
    });

    denyBtn.addEventListener('click', () => {
        saveConsent(false, false, false);
    });

    function saveConsent(prefs, stats, marketing) {
        const consent = {
            date: new Date().toISOString(),
            essential: true,
            preferences: prefs,
            statistics: stats,
            marketing: marketing
        };
        localStorage.setItem('cookieConsent', JSON.stringify(consent));
        banner.style.animation = 'slideDown 0.5s ease-in forwards';
        setTimeout(() => {
            banner.style.display = 'none';
        }, 500);
    }
}

// Ensure the function runs after DOM content is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieBanner);
} else {
    initCookieBanner();
}

// Add slideDown animation to CSS via JS if not already there or just use classes
const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideDown {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

