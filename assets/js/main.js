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
  
    // ---- Contact form handling ----
    document.getElementById('bookingForm').addEventListener('submit', function(e) {
      e.preventDefault(); // Stop the page from refreshing
    
      // 1. Capture the data from the form
      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());
    
      // 2. Send the data as JSON
      fetch('action="https://formspree.io/f/xojvvojd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // This tells the server JSON is coming
          'Accept': 'application/json'
        },
        body: JSON.stringify(data) // This converts the data to a JSON string
      })
      .then(response => {
        if (response.ok) {
          alert('Message sent successfully!');
          this.reset();
        } else {
          alert('Something went wrong. Please try again.');
        }
      })
      .catch(error => console.error('Error:', error));
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

  