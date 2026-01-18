document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initProcessNodes();
    initSmoothScroll();
    initButtonEffects();
    initDataFlowAnimation();
});

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const processNodes = document.querySelectorAll('.process-node');
    processNodes.forEach(node => {
        observer.observe(node);
    });

    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        observer.observe(card);
    });

    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        observer.observe(item);
    });
}

function initProcessNodes() {
    const processNodes = document.querySelectorAll('.process-node');
    
    processNodes.forEach((node, index) => {
        node.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.node-icon');
            icon.style.transform = 'scale(1.1)';
            icon.style.boxShadow = '0 0 30px rgba(15, 122, 234, 0.5)';
        });

        node.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.node-icon');
            icon.style.transform = 'scale(1)';
            icon.style.boxShadow = 'none';
        });
    });
}

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-hero-primary, .btn-cta-primary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                width: 100px;
                height: 100px;
                left: ${x - 50}px;
                top: ${y - 50}px;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

function initDataFlowAnimation() {
    const dataFlowBg = document.querySelector('.data-flow-bg');
    
    if (dataFlowBg) {
        const particles = [];
        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(15, 122, 234, 0.3);
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            dataFlowBg.appendChild(particle);
            particles.push({
                element: particle,
                x: Math.random() * 100,
                y: Math.random() * 100,
                speedX: (Math.random() - 0.5) * 0.1,
                speedY: (Math.random() - 0.5) * 0.1
            });
        }

        function animateParticles() {
            particles.forEach(particle => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                if (particle.x < 0) particle.x = 100;
                if (particle.x > 100) particle.x = 0;
                if (particle.y < 0) particle.y = 100;
                if (particle.y > 100) particle.y = 0;

                particle.element.style.left = particle.x + '%';
                particle.element.style.top = particle.y + '%';
                particle.element.style.opacity = Math.random() * 0.5 + 0.2;
            });

            requestAnimationFrame(animateParticles);
        }

        animateParticles();
    }
}

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '%+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '%+';
        }
    }
    
    updateCounter();
}

function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

document.addEventListener('DOMContentLoaded', initStatCounters);

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        }
        
        lastScroll = currentScroll;
    });
}

document.addEventListener('DOMContentLoaded', initNavbarScroll);

function initProcessTimeline() {
    const timeline = document.querySelector('.process-timeline');
    
    if (timeline) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const nodes = entry.target.querySelectorAll('.process-node');
                    nodes.forEach((node, index) => {
                        setTimeout(() => {
                            node.classList.add('visible');
                        }, index * 100);
                    });
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(timeline);
    }
}

document.addEventListener('DOMContentLoaded', initProcessTimeline);

function initFeatureCards() {
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

document.addEventListener('DOMContentLoaded', initFeatureCards);

function initHeroAnimations() {
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 200);
    }
    
    if (heroVisual) {
        heroVisual.style.opacity = '0';
        heroVisual.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroVisual.style.transition = 'all 0.8s ease';
            heroVisual.style.opacity = '1';
            heroVisual.style.transform = 'translateY(0)';
        }, 400);
    }
}

document.addEventListener('DOMContentLoaded', initHeroAnimations);

function initMouseParallax() {
    const hero = document.querySelector('.hero');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (hero && heroVisual) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            heroVisual.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
        });
        
        hero.addEventListener('mouseleave', () => {
            heroVisual.style.transform = 'translate(0, 0)';
        });
    }
}

document.addEventListener('DOMContentLoaded', initMouseParallax);

function initAgentIcons() {
    const agentIcons = document.querySelectorAll('.agent-icon');
    
    agentIcons.forEach((icon, index) => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

document.addEventListener('DOMContentLoaded', initAgentIcons);

function initCTASection() {
    const ctaSection = document.querySelector('.cta-section');
    
    if (ctaSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.3 });
        
        ctaSection.style.opacity = '0';
        ctaSection.style.transform = 'translateY(30px)';
        ctaSection.style.transition = 'all 0.8s ease';
        
        observer.observe(ctaSection);
    }
}

document.addEventListener('DOMContentLoaded', initCTASection);

function initFooterAnimations() {
    const footer = document.querySelector('.footer');
    
    if (footer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.2 });
        
        footer.style.opacity = '0';
        footer.style.transform = 'translateY(30px)';
        footer.style.transition = 'all 0.6s ease';
        
        observer.observe(footer);
    }
}

document.addEventListener('DOMContentLoaded', initFooterAnimations);

function initLoadingAnimation() {
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0A0A0F;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 60px;
        height: 60px;
        border: 3px solid rgba(15, 122, 234, 0.1);
        border-top-color: #0F7AEA;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    loader.appendChild(spinner);
    document.body.appendChild(loader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 500);
    });
}

document.addEventListener('DOMContentLoaded', initLoadingAnimation);

function initMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navCenter = document.querySelector('.nav-center');
    
    if (window.innerWidth <= 768) {
        const menuButton = document.createElement('button');
        menuButton.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        `;
        menuButton.style.cssText = `
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
        `;
        
        const navContainer = document.querySelector('.nav-container');
        navContainer.insertBefore(menuButton, navCenter);
        
        menuButton.addEventListener('click', () => {
            navCenter.style.display = navCenter.style.display === 'flex' ? 'none' : 'flex';
            navCenter.style.position = 'absolute';
            navCenter.style.top = '100%';
            navCenter.style.left = '0';
            navCenter.style.right = '0';
            navCenter.style.background = 'rgba(10, 10, 15, 0.95)';
            navCenter.style.flexDirection = 'column';
            navCenter.style.padding = '1rem';
            navCenter.style.gap = '1rem';
        });
    }
}

document.addEventListener('DOMContentLoaded', initMobileMenu);

function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #0F7AEA, #9D4EDD);
        z-index: 1001;
        width: 0%;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

document.addEventListener('DOMContentLoaded', initScrollProgress);

function initConsoleInteractions() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    const consoleBtns = document.querySelectorAll('.console-btn');
    
    consoleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    const agentItems = document.querySelectorAll('.agent-item');
    
    agentItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(4px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    const taskItems = document.querySelectorAll('.task-item');
    
    taskItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(4px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

document.addEventListener('DOMContentLoaded', initConsoleInteractions);

function initConsoleAnimations() {
    const consoleSection = document.querySelector('.console');
    
    if (consoleSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const consoleLayout = entry.target.querySelector('.console-layout');
                    if (consoleLayout) {
                        consoleLayout.style.opacity = '0';
                        consoleLayout.style.transform = 'translateY(30px)';
                        
                        setTimeout(() => {
                            consoleLayout.style.transition = 'all 0.8s ease';
                            consoleLayout.style.opacity = '1';
                            consoleLayout.style.transform = 'translateY(0)';
                        }, 200);
                    }
                    
                    const statCards = entry.target.querySelectorAll('.console-stat-card');
                    statCards.forEach((card, index) => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            card.style.transition = 'all 0.6s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 300 + index * 100);
                    });
                    
                    const consoleCards = entry.target.querySelectorAll('.console-card');
                    consoleCards.forEach((card, index) => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            card.style.transition = 'all 0.6s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 700 + index * 150);
                    });
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(consoleSection);
    }
}

document.addEventListener('DOMContentLoaded', initConsoleAnimations);