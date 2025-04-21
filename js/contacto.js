// JavaScript para la página de contacto con jQuery
$(document).ready(() => {
  // Validación en tiempo real
  const forms = document.querySelectorAll(".needs-validation")

  // Validación en tiempo real con jQuery
  $("#contactForm input, #contactForm textarea, #contactForm select").on("input", function () {
    const $this = $(this)
    const isValid = $this[0].checkValidity()

    if (isValid) {
      $this.removeClass("is-invalid").addClass("is-valid")
    } else {
      $this.removeClass("is-valid").addClass("is-invalid")
    }
  })

  // Validación especial para el checkbox de términos
  $("#terminos").on("change", function () {
    const $this = $(this)
    if ($this.is(":checked")) {
      $this.removeClass("is-invalid").addClass("is-valid")
    } else {
      $this.removeClass("is-valid").addClass("is-invalid")
    }
  })

  // Manejar envío del formulario
  $("#contactForm").on("submit", function (e) {
    e.preventDefault()
    e.stopPropagation()
    

    if (this.checkValidity()) {
      // Mostrar spinner y deshabilitar botón
      $(".submit-btn .btn-text").fadeOut(200, () => {
        // Primero quitamos d-none y luego aplicamos fadeIn
        $(".submit-btn .spinner-border").removeClass("d-none").hide().fadeIn(200)
      })
      $(".submit-btn").prop("disabled", true)

      // Simular envío (reemplazar con AJAX real)
      setTimeout(() => {
        // Ocultar spinner y habilitar botón
        $(".submit-btn .spinner-border").fadeOut(200, function () {
          $(this).addClass("d-none")
          $(".submit-btn .btn-text").fadeIn(200)
        })
        $(".submit-btn").prop("disabled", false)

        // Mostrar modal de confirmación
        $("#confirmationModal").modal("show")

        // Resetear formulario y validación
        $("#contactForm").removeClass("was-validated")
        $("#contactForm")[0].reset()
        $("#contactForm input, #contactForm textarea").removeClass("is-valid is-invalid")
      }, 2000)
    } else {
      // Activar validación visual de Bootstrap
      $(this).addClass("was-validated")
    }
  })

  // Cerrar modal al hacer clic en el botón o fuera
  $("#confirmationModal").on("hidden.bs.modal", () => {
    // Acciones adicionales al cerrar el modal si son necesarias
  })

  // Animación al hacer scroll para elementos
  function animateOnScroll() {
    $(".animate-on-scroll").each(function () {
      const elementTop = $(this).offset().top
      const elementHeight = $(this).outerHeight()
      const windowHeight = $(window).height()
      const scrollY = $(window).scrollTop()

      // Si el elemento está en el viewport
      if (scrollY > elementTop - windowHeight + elementHeight / 2) {
        // Aplicar animación según el atributo data-animation
        const animation = $(this).data("animation") || "fadeIn"
        const delay = $(this).data("delay") || 0

        if (!$(this).hasClass("animated")) {
          $(this).addClass("animated")

          setTimeout(() => {
            $(this).addClass("show")
          }, delay)
        }
      }
    })
  }

  // Ejecutar al cargar y al hacer scroll
  animateOnScroll()
  $(window).on("scroll resize", animateOnScroll)

  // Función para verificar si un elemento está en el viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }
})
