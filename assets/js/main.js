/* main.js - shared JS for site */

/* 1) Initialize EmailJS - Replace with your EmailJS user ID */
if (typeof emailjs !== 'undefined') {
    // Replace with your EmailJS user ID (found on emailjs.com dashboard)
    // Example: emailjs.init('user_ABC123xyz');
    try { emailjs.init('YOUR_EMAILJS_USER_ID'); } catch(e){ console.warn('EmailJS init warning', e); }
  }
  
  /* Helper: enable Bootstrap form validation styles */
  (function () {
    'use strict';
    const forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener('submit', function (event) {
        // Let our custom handlers run (we attach additional submit listeners below),
        // but still prevent invalid submission default behavior if invalid.
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  })();
  
  /* Contact form submit via EmailJS */
  document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const bookingForm = document.getElementById('bookingForm');
  
    // ---- Contact form handling ----
    if (contactForm) {
      contactForm.addEventListener('submit', function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
  
        if (!contactForm.checkValidity()) {
          contactForm.classList.add('was-validated');
          return;
        }
  
        const contactStatus = document.getElementById('contactStatus');
        contactStatus.textContent = 'Sending…';
  
        // Example using EmailJS - replace serviceID and templateID
        // Create a template in EmailJS with fields matching the form names (from_name, reply_to, message)
        if (typeof emailjs !== 'undefined' && emailjs.send) {
          emailjs.sendForm('YOUR_EMAILJS_SERVICE_ID','YOUR_EMAILJS_CONTACT_TEMPLATE_ID', contactForm)
            .then(function() {
              contactStatus.className = 'text-success';
              contactStatus.textContent = 'Thank you — your message has been sent.';
              contactForm.reset();
              contactForm.classList.remove('was-validated');
            }, function(error) {
              contactStatus.className = 'text-danger';
              contactStatus.textContent = 'Sorry, an error occurred. Please try again later.';
              console.error('EmailJS error:', error);
            });
        } else {
          // If EmailJS not configured, fallback to showing the form data in console
          console.warn('EmailJS not available — configure emailjs.init and service/template IDs.');
          contactStatus.className = 'text-warning';
          contactStatus.textContent = 'Email service not configured. Check console for details.';
          console.log('Contact form values:', new FormData(contactForm));
        }
      });
    }
  
    // ---- Booking form handling ----
    if (bookingForm) {
      bookingForm.addEventListener('submit', function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
  
        if (!bookingForm.checkValidity()) {
          bookingForm.classList.add('was-validated');
          return;
        }
  
        const bookingStatus = document.getElementById('bookingStatus');
        bookingStatus.textContent = 'Sending booking request…';
  
        // Example using EmailJS - replace serviceID and templateID
        if (typeof emailjs !== 'undefined' && emailjs.send) {
          emailjs.sendForm('YOUR_EMAILJS_SERVICE_ID','YOUR_EMAILJS_BOOKING_TEMPLATE_ID', bookingForm)
            .then(function() {
              bookingStatus.className = 'text-success';
              bookingStatus.textContent = 'Booking request sent — we will contact you soon.';
              bookingForm.reset();
              bookingForm.classList.remove('was-validated');
            }, function(error) {
              bookingStatus.className = 'text-danger';
              bookingStatus.textContent = 'Sorry, an error occurred. Please try again later.';
              console.error('EmailJS error:', error);
            });
        } else {
          console.warn('EmailJS not available — configure emailjs.init and service/template IDs.');
          bookingStatus.className = 'text-warning';
          bookingStatus.textContent = 'Email service not configured. Check console for details.';
          console.log('Booking form values:', new FormData(bookingForm));
        }
      });
    }
  });

  // Mobile menu toggle
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");

  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
    btn.setAttribute(
      "aria-expanded",
      menu.classList.contains("hidden") ? "false" : "true"
    );
  });

  // Active link underline
  const currentPage = window.location.pathname.split("/").pop();

  document.querySelectorAll(".nav-item, .mobile-item").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      // underline for desktop
      link.classList.add(
        "after:content-['']",
        "after:absolute",
        "after:left-0",
        "after:-bottom-2",
        "after:w-full",
        "after:h-[3px]",
        "after:bg-white",
        "after:rounded-full"
      );

      // bold for mobile
      link.classList.add("font-semibold");
    }
  });

  