/**
 * GymHub - JavaScript para la página de Clases
 * Implementación de funcionalidades interactivas con jQuery
 */

$(document).ready(function() {
    /********************************************
     * FILTROS DE CATEGORÍA CON JQUERY
     ********************************************/
    
    // Inicializar todas las tarjetas con animación
    function initGalleryItems() {
        $('.gallery-item').each(function(index) {
            const $item = $(this);
            setTimeout(function() {
                $item.addClass('show');
            }, 100 * index);
        });
    }
    
    // Ejecutar al cargar la página
    initGalleryItems();
    
    // Filtrar elementos por categoría
    $('.btn-filter').on('click', function() {
        const filterValue = $(this).data('filter');
        
        // Actualizar botón activo
        $('.btn-filter').removeClass('active');
        $(this).addClass('active');
        
        // Si es "todos", mostrar todos los elementos
        if (filterValue === 'all') {
            $('.gallery-item').fadeOut(300, function() {
                $('.gallery-item').fadeIn(300).addClass('show');
            });
            return;
        }
        
        // Ocultar todos los elementos
        $('.gallery-item').fadeOut(300, function() {
            // Mostrar solo los elementos de la categoría seleccionada
            $(`.gallery-item[data-category="${filterValue}"]`).fadeIn(300).addClass('show');
        });
    });
    
    /********************************************
     * EFECTOS PARA TARJETAS DE CLASES
     ********************************************/
    
    // Efecto hover avanzado para las tarjetas
    $('.class-card').hover(
        function() {
            const $card = $(this);
            const $overlay = $card.find('.class-overlay');
            const $content = $card.find('.overlay-content');
            
            // Animar overlay
            $overlay.stop().animate({
                opacity: 1
            }, 300);
            
            // Animar contenido
            $content.stop().animate({
                transform: 'translateY(0)'
            }, 300);
        },
        function() {
            const $card = $(this);
            const $overlay = $card.find('.class-overlay');
            const $content = $card.find('.overlay-content');
            
            // Ocultar overlay
            $overlay.stop().animate({
                opacity: 0
            }, 300);
            
            // Resetear posición del contenido
            $content.stop().animate({
                transform: 'translateY(20px)'
            }, 300);
        }
    );
    
    /********************************************
     * TABLA DE HORARIOS INTERACTIVA
     ********************************************/
    
    // Inicializar tooltips de Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Efecto hover para celdas de la tabla
    $('.schedule-table td').not(':empty').not(':contains("-")').hover(
        function() {
            const className = $(this).attr('class');
            if (className) {
                // Resaltar todas las celdas de la misma clase
                $('.' + className.split(' ')[0]).addClass('highlight-cell');
            }
        },
        function() {
            const className = $(this).attr('class');
            if (className) {
                // Quitar resaltado
                $('.' + className.split(' ')[0]).removeClass('highlight-cell');
            }
        }
    );
    
    // Efecto de click para mostrar información adicional
    $('.schedule-table td').not(':empty').not(':contains("-")').on('click', function() {
        const className = $(this).attr('class').split(' ')[0];
        const classType = $(this).text();
        
        // Mostrar un toast con información de la clase
        $('.toast').remove(); // Eliminar toasts anteriores
        
        // Crear un nuevo toast
        const toast = `
            <div class="toast position-fixed bottom-0 end-0 m-3" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header ${className}">
                    <strong class="me-auto">${classType}</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    Haz click en RESERVAR para apartar tu lugar en esta clase.
                    <div class="mt-2 pt-2 border-top">
                        <button type="button" class="btn btn-primary btn-sm">RESERVAR AHORA</button>
                    </div>
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
    });
    
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
                        $(this).addClass(animation);
                    }, delay);
                }
            }
        });
    }
    
    // Ejecutar al cargar y al hacer scroll
    animateOnScroll();
    $(window).on('scroll resize', animateOnScroll);
    

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
});