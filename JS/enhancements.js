/* ====== ENHANCEMENTS.JS - Scroll Progress & Back to Top ====== */

(function () {
    'use strict';

    // ===== SCROLL PROGRESS BAR =====
    function createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.setAttribute('aria-hidden', 'true');
        document.body.prepend(progressBar);
        return progressBar;
    }

    function updateProgressBar(progressBar) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${progress}%`;
    }

    // ===== BACK TO TOP BUTTON =====
    function createBackToTop() {
        const btn = document.createElement('button');
        btn.id = 'back-to-top';
        btn.className = 'back-to-top';
        btn.setAttribute('aria-label', 'Scroll to top');
        btn.innerHTML = `<i class='bx bx-chevron-up'></i>`;
        document.body.appendChild(btn);
        return btn;
    }

    function handleBackToTopVisibility(btn) {
        const scrollTop = window.scrollY;
        if (scrollTop > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // ===== PAGE LOADER =====
    function createPageLoader() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <img src="assets/logo.webp" alt="" class="loader-logo" width="60" height="60">
                <div class="loader-spinner"></div>
            </div>
        `;
        document.body.prepend(loader);
        return loader;
    }

    function hidePageLoader(loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.classList.add('page-loaded');
        }, 300);
    }

    // ===== PAGE TRANSITION FADE =====
    function addPageTransition(loader) {
        // Fade out on link clicks to internal pages
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link &&
                link.href &&
                link.href.includes(window.location.host) &&
                !link.href.includes('#') &&
                !link.hasAttribute('download') &&
                !link.target) {
                e.preventDefault();
                loader.classList.remove('hidden');
                document.body.classList.remove('page-loaded');
                setTimeout(() => {
                    window.location.href = link.href;
                }, 300);
            }
        });
    }

    // ===== FORM VALIDATION =====
    function setupFormValidation() {
        const forms = document.querySelectorAll('form');

        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea');

            inputs.forEach(input => {
                input.addEventListener('blur', () => validateInput(input));
                input.addEventListener('input', () => {
                    if (input.classList.contains('invalid')) {
                        validateInput(input);
                    }
                });
            });
        });
    }

    function validateInput(input) {
        const value = input.value.trim();
        const type = input.type;
        const required = input.required;

        // Remove existing classes
        input.classList.remove('valid', 'invalid');

        // Skip if not required and empty
        if (!required && !value) return true;

        let isValid = true;

        // Required check
        if (required && !value) {
            isValid = false;
        }
        // Email validation
        else if (type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
        }
        // Minimum length
        else if (input.minLength > 0 && value.length < input.minLength) {
            isValid = false;
        }

        // Apply class
        input.classList.add(isValid ? 'valid' : 'invalid');
        return isValid;
    }

    // ===== SKIP TO CONTENT LINK =====
    function createSkipLink() {
        // Find main content area
        const mainContent = document.querySelector('main, section, .hero, #about, #projects, #skills, #contact');
        if (!mainContent) return;

        // Ensure main content has an ID
        const mainId = mainContent.id || 'main-content';
        if (!mainContent.id) mainContent.id = mainId;

        // Create skip link
        const skipLink = document.createElement('a');
        skipLink.href = `#${mainId}`;
        skipLink.className = 'skip-to-content';
        skipLink.textContent = 'Skip to main content';
        document.body.prepend(skipLink);
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    function enableSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ===== LAZY LOADING FOR IMAGES =====
    function enableLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');

        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            return;
        }

        // Fallback for browsers that don't support lazy loading
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // ===== INITIALIZE =====
    function init() {
        // Create page loader first
        const loader = createPageLoader();

        // Create other elements
        const progressBar = createProgressBar();
        const backToTopBtn = createBackToTop();

        // Scroll event handler (debounced)
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateProgressBar(progressBar);
                    handleBackToTopVisibility(backToTopBtn);
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Initial update
        updateProgressBar(progressBar);
        handleBackToTopVisibility(backToTopBtn);

        // Back to top click handler
        backToTopBtn.addEventListener('click', scrollToTop);

        // Enable features
        createSkipLink();
        addPageTransition(loader);
        enableSmoothScroll();
        enableLazyLoading();
        setupFormValidation();

        // Hide loader after page is ready
        hidePageLoader(loader);
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

/* ====== COPY CODE BUTTONS ====== */
(function copyCodeButtons() {
    const codeBlocks = document.querySelectorAll('.code-snippet pre');
    if (codeBlocks.length === 0) return;

    codeBlocks.forEach(pre => {
        // Create copy button
        const btn = document.createElement('button');
        btn.className = 'copy-code-btn';
        btn.innerHTML = '<i class="bx bx-copy"></i>';
        btn.setAttribute('aria-label', 'Copy code');
        btn.setAttribute('title', 'Copy to clipboard');

        // Add button to code snippet
        const wrapper = pre.parentElement;
        wrapper.style.position = 'relative';
        wrapper.appendChild(btn);

        btn.addEventListener('click', async () => {
            const code = pre.querySelector('code');
            if (!code) return;

            try {
                await navigator.clipboard.writeText(code.textContent);
                btn.innerHTML = '<i class="bx bx-check"></i>';
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.innerHTML = '<i class="bx bx-copy"></i>';
                    btn.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
    });
})();

/* ====== READING TIME ESTIMATE ====== */
(function readingTime() {
    const caseStudyHero = document.querySelector('.case-study-hero');
    const caseContent = document.querySelector('.case-section');
    if (!caseStudyHero || !caseContent) return;

    // Get all text content from case study
    const allSections = document.querySelectorAll('.case-section, .case-cta');
    let totalWords = 0;
    allSections.forEach(section => {
        const text = section.textContent || '';
        totalWords += text.split(/\s+/).filter(w => w.length > 0).length;
    });

    const wordsPerMinute = 200;
    const minutes = Math.ceil(totalWords / wordsPerMinute);

    // Add reading time to hero meta
    const meta = document.querySelector('.case-meta');
    if (meta) {
        const readingSpan = document.createElement('span');
        readingSpan.innerHTML = `<i class='bx bx-time'></i> ${minutes} min read`;
        meta.appendChild(readingSpan);
    }
})();

/* ====== ANIMATED SKILL METERS ====== */
(function animateSkillMeters() {
    const meters = document.querySelectorAll('.skill-progress-bar');
    if (meters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.dataset.progress || bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease-out';
                    bar.style.width = targetWidth;
                }, 100);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    meters.forEach(meter => observer.observe(meter));
})();
