$(document).ready(() => {
  // Cambio de tema (oscuro/claro)
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    $("body").removeClass("dark-mode light-mode").addClass(savedTheme)
  } else {
    // Verificar preferencia del sistema
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    $("body").addClass(prefersDark ? "dark-mode" : "light-mode")
  }

  // Botón de cambio de tema (original)
  $("#theme-toggle").on("click", function () {
    toggleTheme()
  })
  
  // Agregar evento para el botón de tema móvil si existe
  $("#theme-toggle-mobile").on("click", function() {
    toggleTheme()
  })
  
  // Función para cambiar el tema
  function toggleTheme() {
    if ($("body").hasClass("dark-mode")) {
      $("body").removeClass("dark-mode").addClass("light-mode")
      localStorage.setItem("theme", "light-mode")
      $("#theme-toggle, #theme-toggle-mobile").attr("aria-pressed", "false")
    } else {
      $("body").removeClass("light-mode").addClass("dark-mode")
      localStorage.setItem("theme", "dark-mode")
      $("#theme-toggle, #theme-toggle-mobile").attr("aria-pressed", "true")
    }
    
    // Actualizar header si es necesario
    updateHeader()
  }

  // Header transparente que cambia al hacer scroll
  function updateHeader() {
    if ($(window).scrollTop() > 100) {
      // En pantallas móviles, siempre mantener el fondo oscuro
      if ($(window).width() <= 768) {
        $(".header").css("backgroundColor", "rgba(0, 0, 0, 0.9)")
      } else {
        $(".header").css(
          "backgroundColor",
          $("body").hasClass("dark-mode") ? "rgba(0, 0, 0, 0.9)" : "rgba(0, 0, 0, 0.8)",
        )
      }
      $(".header").css("color", "#FFFFFF")
    } else {
      // En pantallas móviles, siempre mantener el fondo oscuro
      if ($(window).width() <= 768) {
        $(".header").css("backgroundColor", "rgba(0, 0, 0, 0.9)")
      } else {
        $(".header").css("backgroundColor", "transparent")
      }
      $(".header").css("color", "#FFFFFF")
    }
  }

  // Ejecutar al cargar la página
  updateHeader()

  // Ejecutar al hacer scroll
  $(window).scroll(updateHeader)

  // Ejecutar también cuando cambia el tamaño de la ventana
  $(window).resize(updateHeader)

  // Mega menú con hover
  if ($(window).width() > 992) {
    $(".dropdown").hover(
      function () {
        $(this).find(".dropdown-menu").stop(true, true).fadeIn(300)
      },
      function () {
        $(this).find(".dropdown-menu").stop(true, true).fadeOut(300)
      },
    )
  }
  
  // Solucionar problema del botón de tema en modo móvil
  $(".navbar-toggler").on("click", function() {
    setTimeout(() => {
      if ($("#navbarNav").hasClass("show")) {
        $("#theme-toggle, #theme-toggle-mobile").css({
          "opacity": "0",
          "pointer-events": "none"
        })
      } else {
        $("#theme-toggle, #theme-toggle-mobile").css({
          "opacity": "1",
          "pointer-events": "auto"
        })
      }
    }, 10)
  })

  // Contador animado
  function startCounter() {
    $(".counter").each(function () {
      var $this = $(this)
      var countTo = Number.parseInt($this.attr("data-count"))

      $({ countNum: 0 }).animate(
        {
          countNum: countTo,
        },
        {
          duration: 2000,
          easing: "swing",
          step: function () {
            $this.text(Math.floor(this.countNum))
          },
          complete: function () {
            $this.text(this.countNum)
          },
        },
      )
    })
  }

  // Iniciar el contador cuando el elemento sea visible
  function isInViewport(element) {
    const rect = element[0].getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  function checkCounters() {
    if ($(".about-stats").length && isInViewport($(".about-stats")) && !$(".counter").hasClass("counted")) {
      $(".counter").addClass("counted")
      startCounter()
    }
  }

  // Ejecutar al cargar y al hacer scroll
  checkCounters()
  $(window).scroll(checkCounters)

  // Efectos en las tarjetas de clases
  $(".class-card").hover(
    function () {
      $(this).find("img").css("transform", "scale(1.1)")
    },
    function () {
      $(this).find("img").css("transform", "scale(1)")
    },
  )

  // Carrusel de testimonios con pausa al hover
  $("#testimonialCarousel").carousel({
    interval: 5000,
  })

  $("#testimonialCarousel").hover(
    function () {
      $(this).carousel("pause")
    },
    function () {
      $(this).carousel("cycle")
    },
  )

  // Validación del formulario de newsletter
  $("#newsletter-form").submit(function (e) {
    e.preventDefault()

    var form = $(this)
    var isValid = form[0].checkValidity()

    if (!isValid) {
      e.stopPropagation()
      form.addClass("was-validated")
      return
    }

    // Mostrar spinner
    $("#newsletter-spinner").removeClass("d-none")
    $("#newsletter-text").text("ENVIANDO...")

    // Simular envío (reemplazar con AJAX real)
    setTimeout(() => {
      $("#newsletter-spinner").addClass("d-none")
      $("#newsletter-text").text("SUSCRIBIR")

      // Mostrar modal de confirmación
      var modal = new bootstrap.Modal(document.getElementById("newsletterModal"))
      modal.show()

      // Resetear formulario
      form[0].reset()
      form.removeClass("was-validated")
    }, 1500)
  })

   /********************************************
     * EFECTOS DE SCROLL Y NAVEGACIÓN
     ********************************************/
   // Botón volver arriba
    $(window).scroll(function() {
      if ($(this).scrollTop() > 300) {
          $('#back-to-top').addClass('show');
      } else {
          $('#back-to-top').removeClass('show');
      }
    });

  $('#back-to-top').click(function(e) {
      e.preventDefault();
      $('html, body').animate({
          scrollTop: 0
      }, 800);
  });
  

})