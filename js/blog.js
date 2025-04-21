/**
 * GymHub - JavaScript para la página de Blog
 * Implementación de funcionalidades interactivas con jQuery
 */

$(document).ready(function() {
    /********************************************
     * INICIALIZACIÓN DE COMPONENTES
     ********************************************/
    
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
    
    // Preloader
    setTimeout(function() {
        $('#preloader').fadeOut(500);
    }, 500);
    
    /********************************************
     * FILTROS POR CATEGORÍA
     ********************************************/
    
    // Filtrar artículos por categoría
    $('.filter-btn').on('click', function() {
        const filter = $(this).data('filter');

        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        $('.blog-article').hide();
        if (filter === 'all') {
            $('.blog-article').fadeIn(400);
            $('#no-results').addClass('d-none');
        } else {
            const $filteredArticles = $('.blog-article').filter(function() {
                return $(this).data('category') === filter;
            });
            $filteredArticles.length > 0 ? $filteredArticles.fadeIn(400) : $('#no-results').removeClass('d-none');
        }
    });
    
    // Resetear filtros
    $('#reset-filter').on('click', function() {
        $('.filter-btn[data-filter="all"]').click();
    });
    
    /********************************************
     * SISTEMA DE COMENTARIOS
     ********************************************/
    
    // Validación de formulario de comentarios
    $('#comment-form').on('submit', function(e) {
        e.preventDefault();
        
        // Validar formulario usando Bootstrap
        if (!this.checkValidity()) {
            e.stopPropagation();
            $(this).addClass('was-validated');
            return;
        }
        
        // Mostrar spinner
        $('#comment-spinner').removeClass('d-none');
        $('#submit-comment').prop('disabled', true);
        
        // Simular envío de comentario (en producción, esto sería una llamada AJAX)
        setTimeout(function() {
            // Obtener datos del formulario
            const name = $('#comment-name').val();
            const email = $('#comment-email').val();
            const comment = $('#comment-text').val();
            
            // Crear nuevo comentario
            const newComment = createCommentElement(name, comment);
            
            // Añadir el nuevo comentario al principio de la lista
            $('.comments-list').prepend(newComment);
            
            // Actualizar contador de comentarios
            updateCommentCount();
            
            // Resetear formulario
            $('#comment-form').removeClass('was-validated')[0].reset();
            
            // Ocultar spinner
            $('#comment-spinner').addClass('d-none');
            $('#submit-comment').prop('disabled', false);
            
            // Mostrar mensaje de éxito
            showNotification('Comentario publicado correctamente', 'success');
        }, 1500);
    });
    
    // Función para crear un nuevo elemento de comentario
    function createCommentElement(name, text) {
        const date = new Date().toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        
        const initial = name.charAt(0).toUpperCase();
        const commentId = 'comment-' + (new Date().getTime());
        
        return `
            <div class="comment" id="${commentId}" data-aos="fade-up">
                <div class="comment-avatar" data-initial="${initial}"></div>
                <div class="comment-content">
                    <div class="comment-header">
                        <h4>${name}</h4>
                        <span class="comment-date">${date}</span>
                    </div>
                    <p>${text}</p>
                    <div class="comment-actions">
                        <button class="btn-link comment-reply-btn" data-comment-id="${commentId}"><i class="fas fa-reply me-1"></i>Responder</button>
                        <button class="btn-link comment-like-btn" data-comment-id="${commentId}"><i class="far fa-heart me-1"></i><span class="like-count">0</span></button>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Actualizar contador de comentarios
    function updateCommentCount() {
        const count = $('.comment').not('.comment-reply').length;
        $('#comments-count, #comment-count').text(count);
    }
    
    // Mostrar formulario de respuesta al hacer clic en "Responder"
    $(document).on('click', '.comment-reply-btn', function() {
        const commentId = $(this).data('comment-id');
        
        // Mover el formulario de respuesta después del comentario
        $('#reply-form')
            .removeClass('d-none')
            .insertAfter(`#${commentId}`);
        
        // Guardar el ID del comentario padre
        $('#parent-comment-id').val(commentId);
        
        // Enfocar el campo de nombre
        $('#reply-name').focus();
    });
    
    // Cancelar respuesta
    $('#cancel-reply').on('click', function() {
        $('#reply-form').addClass('d-none');
        $('#comment-reply-form').removeClass('was-validated')[0].reset();
    });
    
    // Enviar respuesta
    $('#comment-reply-form').on('submit', function(e) {
        e.preventDefault();
        
        // Validar formulario
        if (!this.checkValidity()) {
            e.stopPropagation();
            $(this).addClass('was-validated');
            return;
        }
        
        // Mostrar spinner
        $('#reply-spinner').removeClass('d-none');
        $('#submit-reply').prop('disabled', true);
        
        // Simular envío de respuesta
        setTimeout(function() {
            // Obtener datos del formulario
            const name = $('#reply-name').val();
            const text = $('#reply-text').val();
            const parentId = $('#parent-comment-id').val();
            
            // Crear nueva respuesta
            const newReply = createReplyElement(name, text);
            
            // Añadir la respuesta después del comentario padre
            $(newReply).insertAfter(`#${parentId}`);
            
            // Ocultar formulario de respuesta
            $('#reply-form').addClass('d-none');
            $('#comment-reply-form').removeClass('was-validated')[0].reset();
            
            // Ocultar spinner
            $('#reply-spinner').addClass('d-none');
            $('#submit-reply').prop('disabled', false);
            
            // Mostrar mensaje de éxito
            showNotification('Respuesta publicada correctamente', 'success');
        }, 1500);
    });
    
    // Función para crear un nuevo elemento de respuesta
    function createReplyElement(name, text) {
        const date = new Date().toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        
        const initial = name.charAt(0).toUpperCase();
        const replyId = 'reply-' + (new Date().getTime());
        
        return `
            <div class="comment comment-reply" id="${replyId}" data-aos="fade-up">
                <div class="comment-avatar" data-initial="${initial}"></div>
                <div class="comment-content">
                    <div class="comment-header">
                        <h4>${name}</h4>
                        <span class="comment-date">${date}</span>
                    </div>
                    <p>${text}</p>
                </div>
            </div>
        `;
    }
    
    // Sistema de "Me gusta" en comentarios
    $(document).on('click', '.comment-like-btn', function() {
        const $likeCount = $(this).find('.like-count');
        const currentLikes = parseInt($likeCount.text());
        
        // Alternar estado de "Me gusta"
        if ($(this).hasClass('liked')) {
            $likeCount.text(currentLikes - 1);
            $(this).removeClass('liked');
            $(this).find('i').removeClass('fas').addClass('far');
        } else {
            $likeCount.text(currentLikes + 1);
            $(this).addClass('liked');
            $(this).find('i').removeClass('far').addClass('fas');
        }
    });
    
    // Cargar más comentarios
    $('#load-more-comments').on('click', function() {
        $(this).prop('disabled', true);
        $(this).html('<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Cargando...');
        
        // Simular carga de más comentarios
        setTimeout(function() {
            // Crear comentarios adicionales
            const additionalComments = [
                {
                    id: 'comment-4',
                    name: 'Miguel Ángel',
                    initial: 'M',
                    date: '14 de Abril, 2025',
                    text: 'Gracias por compartir esta información tan valiosa. Estoy empezando mi rutina de entrenamiento y estos consejos me vienen genial.',
                    likes: 2
                },
                {
                    id: 'comment-5',
                    name: 'Patricia Vega',
                    initial: 'P',
                    date: '13 de Abril, 2025',
                    text: '¿Qué opinas sobre entrenar en ayunas? He leído opiniones contradictorias sobre este tema.',
                    likes: 4
                }
            ];
            
            // Añadir comentarios a la lista
            $.each(additionalComments, function(index, comment) {
                const commentHtml = `
                    <div class="comment" id="${comment.id}" data-aos="fade-up">
                        <div class="comment-avatar" data-initial="${comment.initial}"></div>
                        <div class="comment-content">
                            <div class="comment-header">
                                <h4>${comment.name}</h4>
                                <span class="comment-date">${comment.date}</span>
                            </div>
                            <p>${comment.text}</p>
                            <div class="comment-actions">
                                <button class="btn-link comment-reply-btn" data-comment-id="${comment.id}"><i class="fas fa-reply me-1"></i>Responder</button>
                                <button class="btn-link comment-like-btn" data-comment-id="${comment.id}"><i class="far fa-heart me-1"></i><span class="like-count">${comment.likes}</span></button>
                            </div>
                        </div>
                    </div>
                `;
                
                // Insertar antes del botón "Ver más comentarios"
                $('.load-more-comments').before(commentHtml);
            });
            
            // Actualizar contador de comentarios
            updateCommentCount();
            
            // Ocultar botón de cargar más
            $('.load-more-comments').hide();
            
            // Reinicializar AOS para nuevos elementos
            AOS.refresh();
        }, 1500);
    });
    
    /********************************************
     * EFECTOS DE SCROLL Y NAVEGACIÓN
     ********************************************/
    
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
     * UTILIDADES
     ********************************************/
    
    // Función para mostrar notificaciones
    function showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = $(`
            <div class="notification notification-${type}">
                <div class="notification-icon">
                    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
                </div>
                <div class="notification-content">
                    ${message}
                </div>
            </div>
        `);
        
        // Añadir al DOM
        $('body').append(notification);
        
        // Mostrar con animación
        setTimeout(() => {
            notification.addClass('show');
            
            // Ocultar después de 3 segundos
            setTimeout(() => {
                notification.removeClass('show');
                
                // Eliminar del DOM después de la animación
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 3000);
        }, 100);
    }
    
    // Estilos CSS para las notificaciones
    const notificationStyles = `
        <style>
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                display: flex;
                align-items: center;
                background-color: var(--card-bg);
                border-left: 4px solid #2196F3;
                padding: 15px;
                border-radius: 4px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 9999;
                transform: translateX(120%);
                transition: transform 0.3s ease;
                max-width: 350px;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-success {
                border-left-color: #4CAF50;
            }
            
            .notification-error {
                border-left-color: #F44336;
            }
            
            .notification-icon {
                margin-right: 15px;
                font-size: 1.5rem;
            }
            
            .notification-success .notification-icon {
                color: #4CAF50;
            }
            
            .notification-error .notification-icon {
                color: #F44336;
            }
            
            .notification-info .notification-icon {
                color: #2196F3;
            }
        </style>
    `;
    
    // Añadir estilos al DOM
    $('head').append(notificationStyles);

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