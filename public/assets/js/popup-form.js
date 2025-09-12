document.addEventListener("DOMContentLoaded", function () {
    const popupTriggers = document.querySelectorAll(".cta-button, .popup-trigger");
    const modal = document.getElementById("popup-form");
    const backArrow = document.querySelector(".back-arrow");
    const form = document.getElementById("contact-form");
    const navMenu = document.getElementById("navMenu");

    // 1) We MUST define toggleMenu()
    window.toggleMenu = function() {
      // Toggle between display none & block
      if (navMenu.style.display === "block") {
        navMenu.style.display = "none";
      } else {
        navMenu.style.display = "block";
      }
    };

    // 2) closeMenu() is already defined:
    window.closeMenu = function () {
      navMenu.style.display = "none";
    };

    // Check if required elements exist
    if (!modal || !backArrow || !form) {
      console.error("One or more elements are missing. Check your HTML structure.");
      return;
    }

    // Hide modal by default
    modal.style.display = "none";

    // Open modal when clicking any popup trigger
    popupTriggers.forEach(trigger => {
      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        modal.style.display = "flex";
      });
    });

    // Close modal on back arrow
    backArrow.addEventListener("click", function () {
      modal.style.display = "none";
    });

    // Close modal if clicking outside content
    window.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });

    // Prevent closing on modal-content clicks
    document.querySelector(".modal-content").addEventListener("click", function (e) {
      e.stopPropagation();
    });

    // Handle form submission
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let formData = new FormData(form);
      fetch("/send-email.php", {
        method: "POST",
        body: formData,
      })
      .then(response => response.text())
      .then(data => {
        document.getElementById("form-response").innerHTML = data;
        form.reset();
      })
      .catch(error => console.error("Error:", error));
    });
  });