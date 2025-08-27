
        document.addEventListener('DOMContentLoaded', function() {
            // Variables principales
            const mainNav = document.querySelector('.main-nav');
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const mobileOverlay = document.getElementById('mobile-overlay');
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('a[href^="#"]');

            // Funcionalidad del menú móvil mejorada
            function toggleMobileMenu() {
                const isOpen = mobileOverlay.classList.contains('active');
                
                if (isOpen) {
                    mobileOverlay.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    document.body.style.overflow = 'auto';
                } else {
                    mobileOverlay.classList.add('active');
                    mobileMenuBtn.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            }

            mobileMenuBtn?.addEventListener('click', toggleMobileMenu);

            // Cerrar menú móvil al hacer click en un enlace
            mobileOverlay?.addEventListener('click', function(e) {
                if (e.target.tagName === 'A' || e.target === mobileOverlay) {
                    toggleMobileMenu();
                }
            });

            // Navegación suave mejorada
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href.startsWith('#') && href !== '#') {
                        e.preventDefault();
                        const targetId = href.substring(1);
                        const targetElement = document.getElementById(targetId) || 
                                            document.querySelector(`section[id="${targetId}"]`);
                        
                        if (targetElement) {
                            const offsetTop = targetElement.offsetTop - 80;
                            window.scrollTo({
                                top: offsetTop,
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            });

            // Efecto de scroll en la navegación
            let lastScrollTop = 0;
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Cambiar estilo de navegación
                if (scrollTop > 100) {
                    mainNav.classList.add('scrolled');
                } else {
                    mainNav.classList.remove('scrolled');
                }

                // Ocultar/mostrar navegación en mobile
                if (window.innerWidth <= 768) {
                    if (scrollTop > lastScrollTop && scrollTop > 200) {
                        mainNav.style.transform = 'translateY(-100%)';
                    } else {
                        mainNav.style.transform = 'translateY(0)';
                    }
                }
                
                lastScrollTop = scrollTop;
            });

            // Observador de intersección para animaciones de secciones
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, observerOptions);

            sections.forEach(section => {
                sectionObserver.observe(section);
            });

            // Funcionalidad de pestañas en experiencia
            const tabButtons = document.querySelectorAll('.tab-button');
            const tabContents = document.querySelectorAll('.tab-content');

            tabButtons.forEach((button, index) => {
                button.addEventListener('click', () => {
                    // Actualizar estados ARIA
                    tabButtons.forEach(btn => btn.setAttribute('aria-selected', 'false'));
                    button.setAttribute('aria-selected', 'true');

                    // Actualizar clases activas
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabContents.forEach(content => content.classList.remove('active'));
                    
                    button.classList.add('active');
                    if (tabContents[index]) {
                        tabContents[index].classList.add('active');
                    }
                });
            });

            // Navegación con teclado para pestañas
            tabButtons.forEach((button, index) => {
                button.addEventListener('keydown', (e) => {
                    let newIndex = index;
                    
                    if (e.key === 'ArrowLeft') {
                        newIndex = index > 0 ? index - 1 : tabButtons.length - 1;
                    } else if (e.key === 'ArrowRight') {
                        newIndex = index < tabButtons.length - 1 ? index + 1 : 0;
                    } else {
                        return;
                    }
                    
                    e.preventDefault();
                    tabButtons[newIndex].click();
                    tabButtons[newIndex].focus();
                });
            });

            // Mejoras de rendimiento para animaciones
            let ticking = false;
            function updateScrollAnimations() {
                // Animaciones relacionadas con scroll
                ticking = false;
            }

            window.addEventListener('scroll', () => {
                if (!ticking) {
                    requestAnimationFrame(updateScrollAnimations);
                    ticking = true;
                }
            });

            // Preload de imágenes importantes
            const importantImages = [
                'https://brittanychiang.com/static/30a645f7db6038f83287d0c6042d3b2b/f9526/me.avif',
                'https://brittanychiang.com/static/36a8a4a4d0ade63e8b45f56dc3d8f055/2f7e7/halcyon.avif',
                'https://brittanychiang.com/static/2a32a9ba0b0f8f5201579c740fb3e48c/2f7e7/demo.avif'
            ];

            importantImages.forEach(src => {
                const img = new Image();
                img.src = src;
            });

            // Manejar cambios de tamaño de ventana
            window.addEventListener('resize', () => {
                // Cerrar menú móvil si se cambia a desktop
                if (window.innerWidth > 768 && mobileOverlay.classList.contains('active')) {
                    toggleMobileMenu();
                }
            });

            // Inicialización final
            console.log('Portafolio cargado correctamente 🚀');
        });