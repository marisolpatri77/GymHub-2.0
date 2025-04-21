/**
 * GymHub - JavaScript para la página de Entrenadores
 * Implementación de funcionalidades interactivas con jQuery
 */

$(document).ready(function() {
    /********************************************
     * EFECTO FLIP EN TARJETAS
     ********************************************/
    
    // Inicializar todas las tarjetas con animación
    function initTrainerCards() {
        $('.trainer-card').each(function(index) {
            const $card = $(this);
            setTimeout(function() {
                $card.addClass('show');
            }, 100 * index);
        });
    }
    
    // Ejecutar al cargar la página
    initTrainerCards();
    
    // Mejorar el efecto flip con jQuery
    $('.trainer-card').hover(
        function() {
            $(this).find('.trainer-card-inner').css('transform', 'rotateY(180deg)');
            
            // Animar las barras de habilidades cuando la tarjeta se voltea
            setTimeout(function() {
                animateSkillBars($(this));
            }.bind(this), 400);
        },
        function() {
            $(this).find('.trainer-card-inner').css('transform', 'rotateY(0deg)');
            
            // Resetear las barras de habilidades cuando la tarjeta vuelve
            $(this).find('.progress-bar').css('width', '0%');
            $(this).find('.skill-percentage').text('0%');
        }
    );
    
    // Permitir que el Tab también active el flip para accesibilidad
    $('.trainer-card').on('focus', function() {
        $(this).find('.trainer-card-inner').css('transform', 'rotateY(180deg)');
        setTimeout(function() {
            animateSkillBars($(this));
        }.bind(this), 400);
    });
    
    $('.trainer-card').on('blur', function() {
        $(this).find('.trainer-card-inner').css('transform', 'rotateY(0deg)');
        $(this).find('.progress-bar').css('width', '0%');
        $(this).find('.skill-percentage').text('0%');
    });
    
    /********************************************
     * BARRAS DE HABILIDADES ANIMADAS
     ********************************************/
    
    // Función para animar las barras de habilidades
    function animateSkillBars($card) {
        $card.find('.progress-bar').each(function(index) {
            const $bar = $(this);
            const skillValue = $bar.data('skill');
            const $percentage = $bar.closest('.skill').find('.skill-percentage');
            
            // Retraso escalonado para cada barra
            setTimeout(function() {
                // Animar la barra
                $bar.css('width', skillValue + '%');
                
                // Animar el porcentaje
                $({ value: 0 }).animate({ value: skillValue }, {
                    duration: 1500,
                    easing: 'swing',
                    step: function(now) {
                        $percentage.text(Math.ceil(now) + '%');
                    }
                });
            }, 200 * index);
        });
    }
    
    // Animar las barras cuando se hace scroll a la sección
    $(window).on('scroll', function() {
        $('.trainer-card-back:visible').each(function() {
            if (isElementInViewport(this)) {
                animateSkillBars($(this).closest('.trainer-card'));
            }
        });
    });
    
    /********************************************
     * SISTEMA DE RATING CON ESTRELLAS
     ********************************************/
    
    // Inicializar las estrellas según el rating
    $('.stars-display').each(function() {
        const rating = parseFloat($(this).data('rating'));
        updateStarsDisplay($(this), rating);
    });
    
    // Manejar el hover en las estrellas
    $('.stars-input label').hover(
        function() {
            const $container = $(this).closest('.stars-container');
            const $starsDisplay = $container.find('.stars-display');
            const value = $(this).prev('input').val();
            
            // Mostrar estrellas según el hover
            updateStarsDisplay($starsDisplay, value);
        },
        function() {
            const $container = $(this).closest('.stars-container');
            const $starsDisplay = $container.find('.stars-display');
            const currentRating = parseFloat($starsDisplay.data('rating'));
            
            // Volver al rating original
            updateStarsDisplay($starsDisplay, currentRating);
        }
    );
    
    // Manejar el click en las estrellas
    $('.stars-input input').on('change', function() {
        const $container = $(this).closest('.stars-container');
        const $starsDisplay = $container.find('.stars-display');
        const $ratingText = $(this).closest('.trainer-rating').find('.rating-text');
        const value = parseFloat($(this).val());
        
        // Actualizar el rating
        $starsDisplay.data('rating', value);
        $ratingText.text(value.toFixed(1));
        
        // Mostrar un toast con el nuevo rating
        showRatingToast($(this).closest('.trainer-card').find('.trainer-info h3').text(), value);
    });
    
    // Función para actualizar la visualización de estrellas
    function updateStarsDisplay($starsDisplay, rating) {
        const $stars = $starsDisplay.find('i');
        
        $stars.removeClass('fas fa-star fa-star-half-alt far active').addClass('far fa-star');
        
        for (let i = 0; i < 5; i++) {
            if (rating >= i + 1) {
                $stars.eq(i).removeClass('far fa-star fa-star-half-alt').addClass('fas fa-star active');
            } else if (rating >= i + 0.5) {
                $stars.eq(i).removeClass('far fa-star fas fa-star').addClass('fas fa-star-half-alt active');
            }
        }
    }
    
    // Función para mostrar un toast con el nuevo rating
    function showRatingToast(trainerName, rating) {
        // Eliminar toasts anteriores
        $('.toast').remove();
        
        // Crear un nuevo toast
        const toast = `
            <div class="toast position-fixed bottom-0 end-0 m-3" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header bg-warning text-dark">
                    <strong class="me-auto">Calificación enviada</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    Has calificado a ${trainerName} con ${rating.toFixed(1)} estrellas. ¡Gracias por tu opinión!
                </div>
            </div>
        `;
        
        // Agregar el toast al body
        $('body').append(toast);
        
        // Mostrar el toast
        const toastEl = document.querySelector('.toast');
        const toast_instance = new bootstrap.Toast(toastEl, {
            autohide: true,
            delay: 3000
        });
        toast_instance.show();
    }
    
    /********************************************
     * EFECTOS DE SCROLL Y NAVEGACIÓN
     ********************************************/
    
    // Animación al hacer scroll para elementos
    function animateOnScroll() {
        $('.animate-on-scroll').each(function() {
            const elementTop = $(this).offset().top;
            const elementHeight = $(this).outerHeight();
            const windowHeight = $(window).height();
            const scrollY = $(window).scrollTop();
            
            // Si el elemento está en el viewport
            if (scrollY > elementTop - windowHeight + elementHeight / 2) {
                // Aplicar animación según el atributo data-animation
                const animation = $(this).data('animation') || 'fadeIn';
                const delay = $(this).data('delay') || 0;
                
                if (!$(this).hasClass('animated')) {
                    $(this).addClass('animated');
                    
                    setTimeout(() => {
                        $(this).addClass('show');
                    }, delay);
                }
            }
        });
    }
    
    // Ejecutar al cargar y al hacer scroll
    animateOnScroll();
    $(window).on('scroll resize', animateOnScroll);
    
    // Función para verificar si un elemento está en el viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Scroll suave para los enlaces internos
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const target = this.hash;
        const $target = $(target);
        
        if ($target.length) {
            $('html, body').animate({
                scrollTop: $target.offset().top - 100
            }, 800, 'easeInOutQuart', function() {
                window.location.hash = target;
            });
        }
    });
});