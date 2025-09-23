import './style.css'

document.addEventListener('DOMContentLoaded', function() {

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            document.body.classList.toggle('menu-open');
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                document.body.classList.remove('menu-open');
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Header background on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- SISTEMA DE ANIMAÇÃO CORRIGIDO ---

    // 1. Observador para animações GERAIS (fade-in, slide-up)
    const generalObserver = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observerInstance.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observa todos os elementos GERAIS
    document.querySelectorAll('.about-card, .stat-item, .contact-item, .skill-category').forEach(el => {
        generalObserver.observe(el);
    });

    // 2. Observador DEDICADO para a animação das barras de HABILIDADES
    const skillsSection = document.querySelector('#habilidades');
    const skillsObserver = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observerInstance.unobserve(entry.target); // Roda a animação das barras apenas uma vez
            }
        });
    }, { threshold: 0.3 }); // Aciona quando 30% da seção estiver visível

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // Função que anima as barras de progresso
    function animateSkills() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const progress = bar.dataset.progress;
                bar.style.width = progress + '%';
            }, index * 150);
        });
    }

    // Parallax effect for hero elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-elements .element');
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.05;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });

        const architectIcon = document.querySelector('.architect-svg');
        if (architectIcon) {
            architectIcon.style.transform = `rotate(${scrolled * 0.1}deg)`;
        }
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            if (!name || !email || !subject || !message) {
                showNotification('Por favor, preencha todos os campos.', 'error');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Por favor, insira um email válido.', 'error');
                return;
            }
            
            showNotification('Mensagem enviada com sucesso! Retornarei em breve.', 'success');
            contactForm.reset();
            
            document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
                field.blur();
            });
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `<div class="notification-content"><span class="notification-message">${message}</span><button class="notification-close">&times;</button></div>`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
        
        setTimeout(() => {
            if (document.contains(notification)) {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Inject necessary CSS for notification and other dynamic styles
    const style = document.createElement('style');
    style.textContent = `
        /* Estilos dinâmicos para notificação e menu mobile */
        .notification { position: fixed; top: 20px; right: 20px; color: white; padding: 16px 20px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.2); z-index: 10000; opacity: 0; transform: translateX(100px); transition: all 0.3s ease; max-width: 300px; font-family: var(--font-primary); }
        .notification.notification-success { background: #4CAF50; }
        .notification.notification-error { background: #f44336; }
        .notification.notification-info { background: #2196F3; }
        .notification.show { opacity: 1; transform: translateX(0); }
        .notification-content { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .notification-close { background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0; transition: background 0.2s; border-radius: 50%; width: 24px; height: 24px; }
        .notification-close:hover { background: rgba(255,255,255,0.2); }
        .header.scrolled { background: rgba(255, 255, 255, 0.98); backdrop-filter: blur(15px); box-shadow: 0 2px 20px rgba(139, 69, 19, 0.1); }
        @media (max-width: 768px) {
            .nav-menu { position: fixed; left: -100%; top: 0; gap: 0; flex-direction: column; background-color: white; width: 100%; height: 100vh; text-align: center; transition: 0.3s; justify-content: center; }
            .nav-menu.active { left: 0; }
            .nav-link { font-size: 1.5rem; padding: 1rem 0; display: block; }
            .hamburger.active span:nth-child(2) { opacity: 0; }
            .hamburger.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
            .hamburger.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
            body.menu-open { overflow: hidden; }
        }
    `;
    document.head.appendChild(style);
});