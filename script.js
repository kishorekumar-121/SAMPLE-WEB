/**
 * Nexus Platform - Interactive Website Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Dark / Light mode)
  const themeToggle = document.getElementById('themeToggle');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');
  
  // Check persisted theme preference
  const savedTheme = localStorage.getItem('nexus_theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
  }

  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    if (isLight) {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
      localStorage.setItem('nexus_theme', 'light');
      showToast('Switched to Light Theme ☀️');
    } else {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
      localStorage.setItem('nexus_theme', 'dark');
      showToast('Switched to Dark Theme 🌙');
    }
  });

  // 2. Mobile Drawer Navigation
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    // Close mobile drawer when clicking any link
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // 3. Interactive Live Demo Tab Switching
  const tabButtons = document.querySelectorAll('.demo-tab-btn');
  const panes = document.querySelectorAll('.demo-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      panes.forEach(pane => pane.classList.remove('active'));

      button.classList.add('active');
      const targetTab = button.getAttribute('data-tab');
      const targetPane = document.getElementById(`pane-${targetTab}`);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // 4. Annual / Monthly Pricing Switcher
  const pricingToggle = document.getElementById('pricingToggle');
  const priceValues = document.querySelectorAll('.price-value');
  const billingNotes = document.querySelectorAll('.billing-note');

  if (pricingToggle) {
    pricingToggle.addEventListener('change', (e) => {
      const isAnnual = e.target.checked;
      
      priceValues.forEach(priceEl => {
        const monthlyPrice = priceEl.getAttribute('data-monthly');
        const annualPrice = priceEl.getAttribute('data-annual');
        
        // Simple scale animation
        priceEl.style.transform = 'scale(0.85)';
        priceEl.style.opacity = '0.5';
        
        setTimeout(() => {
          priceEl.textContent = isAnnual ? annualPrice : monthlyPrice;
          priceEl.style.transform = 'scale(1)';
          priceEl.style.opacity = '1';
        }, 150);
      });

      billingNotes.forEach(note => {
        note.textContent = isAnnual ? 'Billed annually (20% saved)' : 'Billed monthly';
      });

      showToast(isAnnual ? 'Annual discount applied! (Save 20%) 🎉' : 'Switched to monthly billing');
    });
  }

  // 5. Get Started Modal Logic
  const openModalButtons = document.querySelectorAll('.open-modal-btn');
  const demoModal = document.getElementById('demoModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const signupModalForm = document.getElementById('signupModalForm');

  const openModal = () => {
    if (demoModal) {
      demoModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (demoModal) {
      demoModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  openModalButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (demoModal) {
    demoModal.addEventListener('click', (e) => {
      if (e.target === demoModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && demoModal.classList.contains('open')) {
        closeModal();
      }
    });
  }

  if (signupModalForm) {
    signupModalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('modalEmail').value;
      closeModal();
      signupModalForm.reset();
      showToast(`🚀 Sandbox initialized for ${email}! Check your inbox.`);
    });
  }

  // 6. Contact Form Validation and Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const nameInput = document.getElementById('nameInput');
      const emailInput = document.getElementById('emailInput');
      const messageInput = document.getElementById('messageInput');

      // Validate Name
      if (!nameInput.value.trim()) {
        nameInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        nameInput.parentElement.classList.remove('has-error');
      }

      // Validate Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        emailInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        emailInput.parentElement.classList.remove('has-error');
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        messageInput.parentElement.classList.remove('has-error');
      }

      if (isValid) {
        const userName = nameInput.value.trim();
        contactForm.reset();
        showToast(`✉️ Thank you, ${userName}! Our engineers will contact you shortly.`);
      }
    });
  }

  // 7. Toast Notification Utility
  function showToast(message) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${message}</span>`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  // 8. Dynamic Navbar Shadow on Scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    } else {
      header.style.boxShadow = 'none';
    }
  });

  // Welcome Toast
  setTimeout(() => {
    showToast('✨ Welcome to the Nexus sample platform demo!');
  }, 800);
});
