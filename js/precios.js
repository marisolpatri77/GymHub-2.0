/**
 * GymHub - JavaScript para la página de Precios
 * Implementación de funcionalidades interactivas con jQuery
 */

$(document).ready(function() {
    /********************************************
     * TOGGLE MENSUAL/ANUAL
     ********************************************/
    
    // Inicializar tooltips de Bootstrap
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    
    // Toggle entre plan mensual y anual
    $('#pricing-switch').on('change', function() {
        const isAnnual = $(this).prop('checked');
        
        // Cambiar estilos de las etiquetas
        if (isAnnual) {
            $('.monthly-label').css('opacity', '0.6').css('color', 'var(--text)');
            $('.annual-label').css('opacity', '1').css('color', 'var(--accent)');
        } else {
            $('.monthly-label').css('opacity', '1').css('color', 'var(--accent)');
            $('.annual-label').css('opacity', '0.6').css('color', 'var(--text)');
        }
        
        // Animar el cambio de precios
        if (isAnnual) {
            // Mostrar precios anuales
            $('.price.monthly').fadeOut(300, function() {
                $('.price.monthly').removeClass('active');
                $('.price.annual').addClass('active').fadeIn(300);
            });
            
            // Mostrar fila anual y ocultar fila mensual en la tabla
            $('.monthly-row').fadeOut(300, function() {
                $('.monthly-row').removeClass('active');
                $('.annual-row').addClass('active').fadeIn(300);
            });
        } else {
            // Mostrar precios mensuales
            $('.price.annual').fadeOut(300, function() {
                $('.price.annual').removeClass('active');
                $('.price.monthly').addClass('active').fadeIn(300);
            });
            
            // Mostrar fila mensual y ocultar fila anual en la tabla
            $('.annual-row').fadeOut(300, function() {
                $('.annual-row').removeClass('active');
                $('.monthly-row').addClass('active').fadeIn(300);
            });
        }
    });
    
    // Inicializar los precios correctamente
    $('.price.monthly').addClass('active').css('display', 'block');
$('.price.annual').css('display', 'none');
$('.monthly-row').addClass('active').css('display', 'table-row');
$('.annual-row').css('display', 'none');
    
    /********************************************
     * TABLA CON HOVER
     ********************************************/
    
    // Resaltar fila al pasar el cursor
    $('.comparison-table tbody tr').hover(
        function() {
            $(this).addClass('table-warning');
        },
        function() {
            $(this).removeClass('table-warning');
        }
    );
    
    // Resaltar columna al pasar el cursor sobre el encabezado
    $('.comparison-table th').hover(
        function() {
            const index = $(this).index();
            $('.comparison-table tr').each(function() {
                $(this).find('td:eq(' + index + '), th:eq(' + index + ')').addClass('table-warning');
            });
        },
        function() {
            const index = $(this).index();
            $('.comparison-table tr').each(function() {
                $(this).find('td:eq(' + index + '), th:eq(' + index + ')').removeClass('table-warning');
            });
        }
    );
    
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
    
    // Scroll suave para los enlaces internos
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const target = this.hash;
        const $target = $(target);
        
        if ($target.length) {
            $('html, body').animate({
                scrollTop: $target.offset().top - 100
            }, 800, function() {
                window.location.hash = target;
            });
        }
    });
    
    /********************************************
     * EFECTOS ADICIONALES
     ********************************************/
    
    // Efecto de pulsación en las tarjetas destacadas
    function pulseEffect() {
        $('.pricing-card.featured').animate({
            transform: 'scale(1.07)'
        }, 1000, function() {
            $(this).animate({
                transform: 'scale(1.05)'
            }, 1000, function() {
                pulseEffect();
            });
        });
    }
    
    // Iniciar el efecto de pulsación
    setTimeout(pulseEffect, 2000);
    
    // Preloader
    setTimeout(function() {
        $('#preloader').fadeOut(500);
    }, 500);
});