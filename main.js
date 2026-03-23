document.addEventListener('DOMContentLoaded', () => {
    // 1. Reading Progress Bar
    const progressBar = document.getElementById('progress-bar');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });

    // 2. Modal Logic
    const overlay = document.getElementById('modal-overlay');
    
    window.openModal = (id) => {
        const modal = document.getElementById(id);
        overlay.style.display = 'block';
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scroll
        
        setTimeout(() => {
            overlay.style.opacity = '1';
            modal.classList.add('active');
        }, 10);
    };

    window.closeModal = () => {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            overlay.style.opacity = '0';
            activeModal.classList.remove('active');
            
            setTimeout(() => {
                overlay.style.display = 'none';
                activeModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    };

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // 3. Copy Link Functionality
    const copyBtn = document.getElementById('copy-link');
    copyBtn.addEventListener('click', () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = '복사 완료!';
            copyBtn.classList.add('btn--primary');
            copyBtn.classList.remove('btn--outline');
            
            setTimeout(() => {
                copyBtn.innerText = originalText;
                copyBtn.classList.remove('btn--primary');
                copyBtn.classList.add('btn--outline');
            }, 2000);
        });
    });

    // 4. Reveal Animations
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

    const revealElements = document.querySelectorAll('.section, .timeline__item, .project-summary-card');
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Add CSS for reveal via JS
    const style = document.createElement('style');
    style.textContent = `
        .reveal {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
