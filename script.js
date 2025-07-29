document.addEventListener('DOMContentLoaded', () => {
  // Footer Year Update
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
  const currentYearGrSpan = document.getElementById('currentYearGr'); // For Greek page
  if (currentYearGrSpan) {
    currentYearGrSpan.textContent = new Date().getFullYear();
  }

  // Mobile Navigation Toggle
  const navbarToggler = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.nav-links'); // Ensure this targets the <ul>

  if (navbarToggler && mainNav) {
    navbarToggler.addEventListener('click', () => {
      const isNavActive = mainNav.classList.toggle('nav-active');
      navbarToggler.classList.toggle('open', isNavActive);
      // The icon change logic for fa-bars/fa-times should be here if it was removed or ensure it is present
      // For example, if your .nav-toggle button contains an <i> element for the icon:
      const icon = navbarToggler.querySelector('i'); // Assuming Font Awesome icon
      if (icon) {
          if (isNavActive) {
              icon.classList.remove('fa-bars');
              icon.classList.add('fa-times');
          } else {
              icon.classList.remove('fa-times');
              icon.classList.add('fa-bars');
          }
      }
      // Ensure aria-expanded is also toggled if you have it
      navbarToggler.setAttribute('aria-expanded', isNavActive ? 'true' : 'false');
    });
  }

  // Scroll-to-top Button Logic
  const scrollToTopBtn = document.querySelector('.scroll-to-top');

  if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) { // Show button after scrolling 300px
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    });

    scrollToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Main Carousel Logic
  const mainCarouselContainer = document.querySelector('#main-carousel .carousel-container');
  const mainSlides = document.querySelectorAll('#main-carousel .carousel-slide');
  const mainPrevBtn = document.getElementById('main-carousel-prev');
  const mainNextBtn = document.getElementById('main-carousel-next');
  let mainCurrentIndex = 0;
  let mainAutoplayInterval;

  if (mainSlides.length > 0) {
    const showMainSlide = (index) => {
      mainSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    };

    const nextMainSlide = () => {
      mainCurrentIndex = (mainCurrentIndex + 1) % mainSlides.length;
      showMainSlide(mainCurrentIndex);
    };

    const prevMainSlide = () => {
      mainCurrentIndex = (mainCurrentIndex - 1 + mainSlides.length) % mainSlides.length;
      showMainSlide(mainCurrentIndex);
    };

    const startMainAutoplay = () => {
      stopMainAutoplay(); // Clear existing interval
      mainAutoplayInterval = setInterval(nextMainSlide, 3000); // Change slide every 3 seconds
    };

    const stopMainAutoplay = () => {
      clearInterval(mainAutoplayInterval);
    };

    if (mainPrevBtn && mainNextBtn) {
      mainPrevBtn.addEventListener('click', () => {
        prevMainSlide();
        stopMainAutoplay(); // Stop autoplay when user manually navigates
        // Optionally restart after a delay: setTimeout(startMainAutoplay, 10000);
      });

      mainNextBtn.addEventListener('click', () => {
        nextMainSlide();
        stopMainAutoplay(); // Stop autoplay when user manually navigates
        // Optionally restart after a delay: setTimeout(startMainAutoplay, 10000);
      });
    }

    if (mainCarouselContainer) {
      mainCarouselContainer.addEventListener('mouseenter', stopMainAutoplay);
      mainCarouselContainer.addEventListener('mouseleave', startMainAutoplay);
    }

    showMainSlide(mainCurrentIndex); // Show the first slide initially
    startMainAutoplay(); // Start the autoplay feature
  }

  // Review Panel Logic
  const reviewSlides = document.querySelectorAll('#reviews .review-slide');
  const reviewPrevBtn = document.getElementById('review-prev-button');
  const reviewNextBtn = document.getElementById('review-next-button');
  let reviewCurrentIndex = 0;

  if (reviewSlides.length > 0 && reviewPrevBtn && reviewNextBtn) {
    const showReviewSlide = (index) => {
      reviewSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    };

    const nextReviewSlide = () => {
      reviewCurrentIndex = (reviewCurrentIndex + 1) % reviewSlides.length;
      showReviewSlide(reviewCurrentIndex);
    };

    const prevReviewSlide = () => {
      reviewCurrentIndex = (reviewCurrentIndex - 1 + reviewSlides.length) % reviewSlides.length;
      showReviewSlide(reviewCurrentIndex);
    };

    reviewPrevBtn.addEventListener('click', prevReviewSlide);
    reviewNextBtn.addEventListener('click', nextReviewSlide);

    showReviewSlide(reviewCurrentIndex); // Show the first review slide initially
  }

  // WOW.js Initialization (if you are using WOW.js)
  if (typeof WOW === 'function') {
    new WOW().init();
  }

  // Flip card functionality for services page
  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach(card => {
    // Find the clickable areas within the card, e.g., the card itself or specific buttons
    // For this example, the entire card is clickable to flip.
    card.addEventListener('click', (event) => {
      // Prevent flipping if a link or button inside the card was clicked
      if (event.target.closest('a, button')) {
        return;
      }
      card.classList.toggle('is-flipped');
    });

    // Optional: Add touch support for hover effects on mobile if not already handled by CSS :hover
    // This can be removed if not adding specific touch-related classes or behaviors
    card.addEventListener('touchstart', () => {
      // Example: card.classList.add('touch-active');
    }, { passive: true });
    // card.addEventListener('touchend', () => {
      // Example: card.classList.remove('touch-active');
    // });
  });

  // FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionButton = item.querySelector('.faq-question');
    const answerDiv = item.querySelector('.faq-answer');
    const toggleIcon = questionButton.querySelector('.toggle-icon');

    if (questionButton && answerDiv && toggleIcon) {
      questionButton.addEventListener('click', () => {
        const isOpen = item.classList.toggle('open');
        answerDiv.style.maxHeight = isOpen ? answerDiv.scrollHeight + "px" : null;
        answerDiv.style.paddingTop = isOpen ? '15px' : '0px'; // Matches CSS transition
        answerDiv.style.paddingBottom = isOpen ? '15px' : '0px'; // Matches CSS transition
        toggleIcon.textContent = isOpen ? '−' : '+';
        // ARIA attributes for accessibility
        questionButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        answerDiv.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      });

      // Initialize ARIA attributes
      const isInitiallyOpen = item.classList.contains('open');
      questionButton.setAttribute('aria-expanded', isInitiallyOpen ? 'true' : 'false');
      answerDiv.setAttribute('aria-hidden', isInitiallyOpen ? 'false' : 'true');
      if (isInitiallyOpen) {
        answerDiv.style.maxHeight = answerDiv.scrollHeight + "px";
        answerDiv.style.paddingTop = '15px';
        answerDiv.style.paddingBottom = '15px';
        toggleIcon.textContent = '−';
      } else {
        answerDiv.style.maxHeight = null;
        answerDiv.style.paddingTop = '0px';
        answerDiv.style.paddingBottom = '0px';
        toggleIcon.textContent = '+';
      }
    }
  });

  // MODIFIED: Flip card logic for .service-flip-card
  document.querySelectorAll('.service-flip-card').forEach(card => {
    const inner = card.querySelector('.flip-card-inner');
    if (!inner) return; // Safety check

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      // For touch devices, toggle on tap
      card.addEventListener('touchstart', (e) => {
        // Prevent flipping if a link or button inside the card was clicked
        if (e.target.closest('a, button')) {
          return;
        }
        inner.classList.toggle('is-flipped');
        // Consider e.preventDefault() if it causes issues with other touch interactions or unwanted clicks
      }, { passive: true }); // Use passive: true if not calling preventDefault
    } else {
      // For non-touch devices (desktops), flip on hover
      card.addEventListener('mouseenter', () => {
        // Don't flip if a button/link is being hovered, though this is less common for mouseenter on the card itself
        if (card.querySelector(':hover') && card.querySelector(':hover').closest('a, button')) {
            return;
        }
        inner.classList.add('is-flipped');
      });
      card.addEventListener('mouseleave', () => {
        inner.classList.remove('is-flipped');
      });
    }
  });

  // RECOMMENDED: Review and remove or comment out the older '.service-card' flip logic (lines 133-149 in your original script)
  // if it's redundant or conflicts with the '.service-flip-card' logic above.
  // The '.service-flip-card' logic targets '.flip-card-inner' which aligns with your CSS for flipping.
  /*
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    // ... old flip logic ...
  });
  */

}); // End of DOMContentLoaded

// Bubble Click Effect
function createBubble(x, y) {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  
  const size = Math.random() * 20 + 10; // Random bubble size
  
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  // Adjust for scroll position to make bubbles appear at the correct click/touch point on the page
  bubble.style.left = `${x + window.scrollX - size / 2}px`;
  bubble.style.top = `${y + window.scrollY - size / 2}px`;

  document.body.appendChild(bubble);

  // Remove bubble after animation
  bubble.addEventListener('animationend', () => {
    bubble.remove();
  });
}

// Handle both mouse and touch
document.addEventListener('click', (e) => {
  // Check if the click is on a scrollbar or other non-content areas if necessary
  // For now, create bubble on any click
  createBubble(e.clientX, e.clientY);
});

document.addEventListener('touchstart', (e) => {
  for (let i = 0; i < e.touches.length; i++) {
    createBubble(e.touches[i].clientX, e.touches[i].clientY);
  }
});
