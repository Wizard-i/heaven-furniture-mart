/**
 * Heaven Furniture Mart - Main JavaScript Engine
 * Standard: Native ES6+ (Zero external dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Sticky Header Observer
  initHeaderScroll();

  // 2. Initialize Scroll Reveal Animations (IntersectionObserver)
  initScrollReveal();

  // 3. Initialize Mobile Drawer Menu
  initMobileDrawer();

  // 4. Initialize Bespoke Process Interactive Tabs
  initBespokeTabs();

  // 5. Initialize Lead Consultation Modal
  initLeadModal();

  // 6. Initialize Mobile Sticky CTA Bar (Hide on Scroll Down / Show on Scroll Up)
  initMobileStickyBar();

  // 7. Smooth Anchor Scroll Handling
  initSmoothScroll();
});

/* --------------------------------------------------------------------------
   1. Sticky Header Scroll Observer
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/* --------------------------------------------------------------------------
   2. Scroll Reveal Animations (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
}

/* --------------------------------------------------------------------------
   3. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  const toggleMenu = (show) => {
    const isExpanded = show !== undefined ? show : !drawer.classList.contains('active');
    toggleBtn.classList.toggle('active', isExpanded);
    drawer.classList.toggle('active', isExpanded);
    document.body.style.overflow = isExpanded ? 'hidden' : '';
  };

  toggleBtn.addEventListener('click', () => toggleMenu());

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}

/* --------------------------------------------------------------------------
   4. Bespoke Craftsmanship Process Interactive Tabs
   -------------------------------------------------------------------------- */
function initBespokeTabs() {
  const tabs = document.querySelectorAll('.bespoke-tab');
  const infoPanels = document.querySelectorAll('.bespoke-info');
  const imagePanels = document.querySelectorAll('.bespoke-img');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const stepIndex = tab.getAttribute('data-step');

      // Update active tabs
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update active info panel
      infoPanels.forEach(panel => {
        if (panel.getAttribute('data-step') === stepIndex) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });

      // Update active image panel
      imagePanels.forEach(img => {
        if (img.getAttribute('data-step') === stepIndex) {
          img.classList.add('active');
        } else {
          img.classList.remove('active');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. Lead Consultation Modal Engine
   -------------------------------------------------------------------------- */
function initLeadModal() {
  const modalOverlay = document.getElementById('consultationModal');
  const openBtns = document.querySelectorAll('[data-modal-open]');
  const closeBtns = document.querySelectorAll('[data-modal-close]');
  const form = document.getElementById('leadConsultationForm');

  if (!modalOverlay) return;

  const openModal = () => {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  }));

  closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Handle Form Submission -> Format WhatsApp Message
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('modalName')?.value || '';
      const phone = document.getElementById('modalPhone')?.value || '';
      const room = document.getElementById('modalRoom')?.value || 'Living Room';
      const notes = document.getElementById('modalNotes')?.value || '';

      const textMessage = `Hello Heaven Furniture Mart! My name is ${name} (${phone}). I am interested in custom furniture for my ${room}. ${notes ? 'Details: ' + notes : ''}`;
      const whatsappUrl = `https://wa.me/8801960481983?text=${encodeURIComponent(textMessage)}`;

      closeModal();
      window.open(whatsappUrl, '_blank');
    });
  }
}

/* --------------------------------------------------------------------------
   6. Mobile Sticky CTA Bar Scroll Behavior
   -------------------------------------------------------------------------- */
function initMobileStickyBar() {
  const stickyBar = document.querySelector('.mobile-sticky-bar');
  if (!stickyBar) return;

  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Show when scrolling up, hide when scrolling down near top
    if (currentScrollY > lastScrollY && currentScrollY > 300) {
      stickyBar.classList.add('hide');
    } else {
      stickyBar.classList.remove('hide');
    }

    lastScrollY = currentScrollY;
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   7. Smooth Scrolling
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
