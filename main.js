document.addEventListener('DOMContentLoaded', () => {
    // 1. Reading Progress Bar
    const progressBar = document.getElementById('progress-bar');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) progressBar.style.width = scrolled + "%";
        
        // Active Nav Highlighting
        updateActiveNav();
    });

    // 2. Active Navigation Highlight
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    function updateActiveNav() {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    }

    // 3. Modal Logic
    const overlay = document.getElementById('modal-overlay');
    
    window.openModal = (id) => {
        const modal = document.getElementById(id);
        if (!modal || !overlay) return;
        
        overlay.style.display = 'block';
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; 
        
        setTimeout(() => {
            overlay.style.opacity = '1';
            modal.classList.add('active');
        }, 10);
    };

    window.closeModal = () => {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal && overlay) {
            overlay.style.opacity = '0';
            activeModal.classList.remove('active');
            
            setTimeout(() => {
                overlay.style.display = 'none';
                activeModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    };

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // 4. Link Copy
    const copyBtn = document.getElementById('copy-link');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                const originalText = copyBtn.innerText;
                copyBtn.innerText = '복사 완료!';
                setTimeout(() => {
                    copyBtn.innerText = originalText;
                }, 2000);
            });
        });
    }

    // 5. Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.section, .timeline__item, .project-summary-card, .comp-item');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
        observer.observe(el);
    });

    // Reveal CSS
    const style = document.createElement('style');
    style.textContent = `
        .reveal {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        .nav__link.active {
            color: #FF2100 !important;
        }
    `;
    document.head.appendChild(style);
});
