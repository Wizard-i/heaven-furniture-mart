/**
 * HEAVEN FURNITURE MART — MASTER CLIENT ENGINE
 * Bespoke Architecture & Furniture Studio | Chattogram, Bangladesh
 * Native ES6+ | Zero Build Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientMouseGlow();
  initStickyHeader();
  initMobileDrawer();
  initDraggableProductRail();
  initWoodStudioSwatches();
  initScrollAnimations();
  initCard3DTilt();
  initAnimatedCounters();
  initVideoMarqueeStream();
  initShowroomAtelierExperience();
});

/* --------------------------------------------------------------------------
   1. AMBIENT MOUSE GLOW (Subtle Background Follower)
   -------------------------------------------------------------------------- */
function initAmbientMouseGlow() {
  const glow = document.querySelector('.ambient-mouse-glow');
  if (!glow) return;

  window.addEventListener('mousemove', (e) => {
    glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   2. STICKY HEADER OBSERVER
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const navLinks = document.querySelectorAll('.nav-links .nav-item');
  const sections = [
    { id: 'video-stream', link: document.querySelector('.nav-links a[href="#video-stream"]') },
    { id: 'rites', link: document.querySelector('.nav-links a[href="#rites"]') },
    { id: 'materials', link: document.querySelector('.nav-links a[href="#materials"]') },
    { id: 'showroom', link: document.querySelector('.nav-links a[href="#showroom"]') }
  ];
  const homeLink = document.querySelector('.nav-links a[href="index.html"]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Dynamic Navigation Scroll Spy
    if (navLinks.length && sections.length) {
      const scrollPos = window.scrollY + 180;
      let currentActive = null;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sections[i].id);
        if (sec && sec.offsetTop <= scrollPos) {
          currentActive = sections[i].link;
          break;
        }
      }

      if (!currentActive && window.scrollY < 600 && homeLink) {
        currentActive = homeLink;
      }

      if (currentActive) {
        navLinks.forEach(item => item.classList.remove('active'));
        currentActive.classList.add('active');
      }
    }

    // Scroll Cue Indicator Fade
    const scrollCue = document.getElementById('scrollCueIndicator');
    if (scrollCue) {
      if (window.scrollY > 180) {
        scrollCue.classList.add('scrolled-past');
      } else {
        scrollCue.classList.remove('scrolled-past');
      }
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   3. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle-btn');
  const drawer = document.querySelector('.mobile-menu-drawer');
  const backdrop = document.querySelector('.mobile-drawer-backdrop');
  const closeBtn = document.querySelector('.mobile-drawer-close');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  function openMenu() {
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  navLinks.forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   4. DRAGGABLE HORIZONTAL PRODUCT RAIL
   -------------------------------------------------------------------------- */
function initDraggableProductRail() {
  const rail = document.querySelector('.rail-container');
  if (!rail) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  rail.addEventListener('mousedown', (e) => {
    isDown = true;
    rail.classList.add('grabbing');
    startX = e.pageX - rail.offsetLeft;
    scrollLeft = rail.scrollLeft;
  });

  rail.addEventListener('mouseleave', () => {
    isDown = false;
    rail.classList.remove('grabbing');
  });

  rail.addEventListener('mouseup', () => {
    isDown = false;
    rail.classList.remove('grabbing');
  });

  rail.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - rail.offsetLeft;
    const walk = (x - startX) * 1.6;
    rail.scrollLeft = scrollLeft - walk;
  });
}

/* --------------------------------------------------------------------------
   5. INTERACTIVE WOOD & MATERIAL FINISHES STUDIO
   -------------------------------------------------------------------------- */
const woodStudioData = {
  'burma-teak': {
    title: 'Burma Teak (Solid Segun Heartwood)',
    characteristics: 'World-renowned golden-honey timber saturated with natural organic resins. Impervious to moisture, rot, and Chattogram coastal humidity. Develops an extraordinary warm amber glow over decades.',
    image: 'assets/images/atelier/study-desk-closeup.png',
    pills: ['100% Solid Heartwood', 'Natural Oil Finish', 'Termite Proof', 'Heirloom Grade']
  },
  'chittagong-teak': {
    title: 'Chittagong Teak (Hill Tracts Harvest)',
    characteristics: 'Deep, rich chocolate & espresso grain patterns harvested from sustainably managed Chattogram hill regions. Dense structural integrity with exquisite responsiveness to hand carving.',
    image: 'assets/images/atelier/workshop-main.jpg',
    pills: ['Locally Harvested', 'Dark Walnut Stain', 'Kiln Seasoned', 'Hand-Polished']
  },
  'gamari-blonde': {
    title: 'Chittagong Gamari Wood',
    characteristics: 'Silky smooth, light honey-blonde timber with fine straight grain. Exceptionally stable and warp-resistant, perfect for contemporary minimalist Scandinavian-Japanese interiors.',
    image: 'assets/images/atelier/chair-crafting.png',
    pills: ['Silky Light Texture', 'Warp Resistant', 'Matte Lacquer Finish', 'Modern Minimalist']
  },
  'cane-weave': {
    title: 'Natural Hand-Woven Rattan Cane',
    characteristics: 'Artisanal open-weave cane webbing hand-threaded by Chattogram craftsmen. Provides breathable ergonomic resilience, tactile vintage warmth, and subtle acoustic absorption.',
    image: 'assets/images/products/woven-egg-chair.png',
    pills: ['100% Natural Cane', 'Hand-Threaded', 'Breathable Comfort', 'Organic Texture']
  },
  'antique-brass': {
    title: 'Brushed Antique Brass Accents',
    characteristics: 'Solid architectural brass hardware and inlays treated with a proprietary beeswax aging process. Accents drawer pulls, table feet caps, and minimalist architectural joinery.',
    image: 'assets/images/products/heritage-nightstand.png',
    pills: ['Solid Architectural Brass', 'Hand-Brushed Patina', 'Tarnish Resistant', 'Luxury Inlays']
  }
};

function initWoodStudioSwatches() {
  const swatchButtons = document.querySelectorAll('.swatch-btn');
  const previewImg = document.getElementById('studioPreviewImg');
  const previewTitle = document.getElementById('studioPreviewTitle');
  const previewDesc = document.getElementById('studioPreviewDesc');
  const previewPills = document.getElementById('studioPreviewPills');

  if (!swatchButtons.length || !previewImg) return;

  swatchButtons.forEach(button => {
    button.addEventListener('click', () => {
      swatchButtons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');

      const key = button.getAttribute('data-swatch');
      const data = woodStudioData[key];
      if (!data) return;

      previewImg.style.opacity = '0.3';
      previewImg.style.transform = 'scale(0.96)';

      setTimeout(() => {
        previewImg.src = data.image;
        previewTitle.textContent = data.title;
        previewDesc.textContent = data.characteristics;

        previewPills.innerHTML = data.pills
          .map(pill => `<span class="spec-pill">${pill}</span>`)
          .join('');

        previewImg.style.opacity = '1';
        previewImg.style.transform = 'scale(1)';
      }, 150);
    });
  });
}

/* --------------------------------------------------------------------------
   5.5 HIGH-IMPACT SCROLL REVEAL OBSERVER
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal, .reveal-stagger');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  });

  reveals.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   6. 3D CARD PERSPECTIVE TILT EFFECT
   -------------------------------------------------------------------------- */
function initCard3DTilt() {
  const tiltCards = document.querySelectorAll('.card-3d-tilt, .hero-main-card, .founder-photo-frame, .pillar-card, .movement-card, .catalog-card, .timeline-card, .matrix-wrap, .product-main-view');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/* --------------------------------------------------------------------------
   7. ANIMATED STATS COUNTER
   -------------------------------------------------------------------------- */
function initAnimatedCounters() {
  const counterElements = document.querySelectorAll('[data-counter-target]');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-counter-target'), 10);
        const prefix = el.getAttribute('data-counter-prefix') || '';
        const suffix = el.getAttribute('data-counter-suffix') || '';
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 45));

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = `${prefix}${current}${suffix}`;
        }, 25);

        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   8. VIDEO MARQUEE STREAM CONTROLLER
   -------------------------------------------------------------------------- */
function initVideoMarqueeStream() {
  const streamVideos = document.querySelectorAll('.stream-video-card video');
  
  streamVideos.forEach(vid => {
    vid.muted = true;
    vid.loop = true;
    vid.play().catch(() => {});
  });

  const cards = document.querySelectorAll('.stream-video-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const vid = card.querySelector('video');
      if (vid) {
        if (vid.paused) {
          vid.play();
        } else {
          vid.pause();
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   9. SCROLL REVEAL OBSERVER
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   10. SHOWROOM VIP ATELIER CONTROLLER
   -------------------------------------------------------------------------- */
function initShowroomAtelierExperience() {
  const showroomSection = document.querySelector('.showroom-section');
  if (!showroomSection) return;

  // 1. Tab Switching
  const tabBtns = showroomSection.querySelectorAll('.showroom-tab-btn');
  const tabPanels = showroomSection.querySelectorAll('.showroom-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab-target');
      
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // 2. Interactive Hotspot Pins
  const hotspotPins = showroomSection.querySelectorAll('.hotspot-pin');
  const cueText = document.getElementById('showroomHotspotCueText');

  const cueDescriptions = {
    '1': 'Inspecting: Solid Segun Heritage Suite with hand-carved motifs & Belgian linen',
    '2': 'Inspecting: Italian Carrara Marble Table with architectural fluted brass pedestal',
    '3': 'Inspecting: Master Carver Consultation Bar with 12 timber swatches & moisture tests'
  };

  hotspotPins.forEach(pin => {
    const spotId = pin.getAttribute('data-spot');

    pin.addEventListener('mouseenter', () => {
      hotspotPins.forEach(p => p.classList.remove('active'));
      pin.classList.add('active');
      if (cueText && cueDescriptions[spotId]) {
        cueText.textContent = cueDescriptions[spotId];
      }
    });

    const btn = pin.querySelector('.hotspot-btn');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = pin.classList.contains('active');
        hotspotPins.forEach(p => p.classList.remove('active'));
        if (!isActive) {
          pin.classList.add('active');
          if (cueText && cueDescriptions[spotId]) {
            cueText.textContent = cueDescriptions[spotId];
          }
        }
      });
    }
  });

  // 3. VIP Booking Chips Interactivity
  let selectedDay = 'Today';
  let selectedTime = '11:30 AM (Morning)';
  let selectedFocus = 'Full Residence Suite';

  function updateVipWhatsAppUrl() {
    const btn = document.getElementById('vipBookingWhatsAppBtn');
    if (!btn) return;
    const msg = `Hello Heaven Furniture Mart, I would like to reserve a VIP Private Showroom Walkthrough on *${selectedDay}* at *${selectedTime}* regarding *${selectedFocus}*. Please confirm availability.`;
    btn.href = `https://wa.me/8801960481983?text=${encodeURIComponent(msg)}`;
  }

  // Setup chip group listeners
  function setupChipGroup(containerId, onSelect) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const chips = container.querySelectorAll('.vip-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        onSelect(chip.textContent.trim());
        updateVipWhatsAppUrl();
      });
    });
  }

  setupChipGroup('vipDayChips', val => { selectedDay = val; });
  setupChipGroup('vipTimeChips', val => { selectedTime = val; });
  setupChipGroup('vipFocusChips', val => { selectedFocus = val; });
  updateVipWhatsAppUrl();
}

