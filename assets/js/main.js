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
  
  // ---- Contact form handling (contact page only) ----
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());

      if (Object.keys(data).length === 0) {
        console.error("Form data is empty. Check your 'name' attributes.");
        return;
      }

      fetch('https://formspree.io/f/xojvrrln', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (response.ok) {
            alert('Message sent successfully!');
            this.reset();
          } else {
            return response.json().then(errData => {
              console.error("Server Error:", errData);
              alert('Error: ' + (errData.error || 'Something went wrong.'));
            });
          }
        })
        .catch(error => {
          console.error('Fetch Error:', error);
        });
    });
  }

  // Mobile menu toggle (Tailwind nav: index, gallery, contact, etc.)
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.setAttribute(
      'aria-expanded',
      mobileMenu.classList.contains('hidden') ? 'false' : 'true'
    );

    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      menuBtn.setAttribute(
        'aria-expanded',
        mobileMenu.classList.contains('hidden') ? 'false' : 'true'
      );
    });
  }

  // Active link underline
  const currentPage = window.location.pathname.split("/").pop() || 'index.html';

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

  