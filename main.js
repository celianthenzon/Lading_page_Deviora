// Deviora — Agence Digitale (Vanilla JavaScript)

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initServicesTabs();
  initPlatformTabs();
  initPortfolio();
  initContactForm();
  initFaqAccordion();
});

/**
 * 1. Gestion du thème (Blanc / Noir) avec fidélité à la vidéo (bouton pill interactif)
 */
function initTheme() {
  const root = document.documentElement;
  const storedTheme = localStorage.getItem('deviora_theme');

  // Par défaut mode sombre si non spécifié
  if (storedTheme === 'light') {
    root.classList.remove('dark');
  } else {
    root.classList.add('dark');
  }

  updateToggleButtons();

  // Écouteur pour tous les boutons de bascule directe (bouton pill type vidéo)
  const toggleButtons = document.querySelectorAll('[data-theme-toggle], #theme-toggle-btn, #mobile-theme-toggle-btn');
  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isCurrentlyDark = root.classList.contains('dark');
      if (isCurrentlyDark) {
        root.classList.remove('dark');
        localStorage.setItem('deviora_theme', 'light');
      } else {
        root.classList.add('dark');
      }
      if (!isCurrentlyDark) {
        localStorage.setItem('deviora_theme', 'dark');
      }
      updateToggleButtons();
    });
  });

  // Écouteurs pour sélection explicite
  const lightButtons = document.querySelectorAll('[data-set-theme="light"]');
  const darkButtons = document.querySelectorAll('[data-set-theme="dark"]');

  lightButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      root.classList.remove('dark');
      localStorage.setItem('deviora_theme', 'light');
      updateToggleButtons();
    });
  });

  darkButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      root.classList.add('dark');
      localStorage.setItem('deviora_theme', 'dark');
      updateToggleButtons();
    });
  });
}

function updateToggleButtons() {
  const isDark = document.documentElement.classList.contains('dark');
  
  // Boutons simples de bascule (style vidéo : "☀️ Blanc" en mode sombre, "🌙 Noir" en mode clair)
  const toggleButtons = document.querySelectorAll('[data-theme-toggle], #theme-toggle-btn, #mobile-theme-toggle-btn');
  toggleButtons.forEach((btn) => {
    const iconSpan = btn.querySelector('.theme-icon');
    const textSpan = btn.querySelector('.theme-text');
    
    if (isDark) {
      if (iconSpan) iconSpan.textContent = '☀️';
      if (textSpan) textSpan.textContent = 'Blanc';
      btn.className = 'px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all flex items-center gap-1.5 cursor-pointer bg-zinc-900/90 text-zinc-100 border-zinc-700/80 hover:border-[#E06800] hover:text-[#E06800] active:scale-95';
    } else {
      if (iconSpan) iconSpan.textContent = '🌙';
      if (textSpan) textSpan.textContent = 'Noir';
      btn.className = 'px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all flex items-center gap-1.5 cursor-pointer bg-white text-zinc-900 border-zinc-300 hover:border-[#E06800] hover:text-[#E06800] active:scale-95';
    }
  });

  const lightBtns = document.querySelectorAll('[data-set-theme="light"]');
  const darkBtns = document.querySelectorAll('[data-set-theme="dark"]');

  lightBtns.forEach((btn) => {
    if (!isDark) {
      btn.className = 'px-3 py-1 text-xs font-bold rounded-full transition-all bg-white text-zinc-900 border border-zinc-300 flex items-center gap-1.5';
    } else {
      btn.className = 'px-3 py-1 text-xs font-medium rounded-full transition-all text-zinc-400 hover:text-white flex items-center gap-1.5';
    }
  });

  darkBtns.forEach((btn) => {
    if (isDark) {
      btn.className = 'px-3 py-1 text-xs font-bold rounded-full transition-all bg-[#E06800] text-black flex items-center gap-1.5';
    } else {
      btn.className = 'px-3 py-1 text-xs font-medium rounded-full transition-all text-zinc-600 hover:text-zinc-900 flex items-center gap-1.5';
    }
  });
}

/**
 * 2. Menu Mobile
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const menuLinks = menu ? menu.querySelectorAll('a, button') : [];

  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

/**
 * 3. Onglets des Services (Pôles 01, 02, 03)
 */
function initServicesTabs() {
  const tabBtns = document.querySelectorAll('[data-pole-tab]');
  const panels = document.querySelectorAll('[data-pole-panel]');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetPole = btn.getAttribute('data-pole-tab');

      // Update button active states
      tabBtns.forEach((b) => {
        const isTarget = b.getAttribute('data-pole-tab') === targetPole;
        if (isTarget) {
          b.classList.add('bg-white', 'dark:bg-[#18181C]', 'text-zinc-900', 'dark:text-white', 'border-b-2', 'border-b-[#EA7200]');
          b.classList.remove('text-zinc-600', 'dark:text-zinc-400');
        } else {
          b.classList.remove('bg-white', 'dark:bg-[#18181C]', 'text-zinc-900', 'dark:text-white', 'border-b-2', 'border-b-[#EA7200]');
          b.classList.add('text-zinc-600', 'dark:text-zinc-400');
        }
      });

      // Update panels visibility
      panels.forEach((panel) => {
        if (panel.getAttribute('data-pole-panel') === targetPole) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      });
    });
  });

  // Boutons "Demander ce service" préremplissant le devis
  const requestButtons = document.querySelectorAll('[data-service-select]');
  requestButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const serviceName = btn.getAttribute('data-service-select');
      const serviceField = document.getElementById('form-service');
      const descField = document.getElementById('form-message');
      
      if (serviceField) {
        serviceField.value = serviceName;
      }
      if (descField && !descField.value) {
        descField.value = `Bonjour Deviora, je souhaite obtenir une estimation pour le service : ${serviceName}.`;
      }

      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/**
 * 4. Démo interactive de la plateforme Deviora Projets
 */
function initPlatformTabs() {
  const screenBtns = document.querySelectorAll('[data-platform-tab]');
  const screens = document.querySelectorAll('[data-platform-screen]');
  const deviceDesktop = document.getElementById('device-desktop');
  const deviceMobile = document.getElementById('device-mobile');
  const frameDesktop = document.getElementById('frame-desktop');
  const frameMobile = document.getElementById('frame-mobile');

  screenBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-platform-tab');

      screenBtns.forEach((b) => {
        const isCurrent = b.getAttribute('data-platform-tab') === tabId;
        if (isCurrent) {
          b.classList.add('bg-zinc-900', 'border-[#EA7200]', 'text-white');
          b.classList.remove('bg-zinc-900/40', 'border-zinc-800', 'text-zinc-400');
        } else {
          b.classList.remove('bg-zinc-900', 'border-[#EA7200]', 'text-white');
          b.classList.add('bg-zinc-900/40', 'border-zinc-800', 'text-zinc-400');
        }
      });

      screens.forEach((screen) => {
        if (screen.getAttribute('data-platform-screen') === tabId) {
          screen.classList.remove('hidden');
        } else {
          screen.classList.add('hidden');
        }
      });
    });
  });

  if (deviceDesktop && deviceMobile && frameDesktop && frameMobile) {
    deviceDesktop.addEventListener('click', () => {
      deviceDesktop.classList.add('bg-[#EA7200]', 'text-black', 'font-bold');
      deviceDesktop.classList.remove('text-zinc-400');
      deviceMobile.classList.remove('bg-[#EA7200]', 'text-black', 'font-bold');
      deviceMobile.classList.add('text-zinc-400');

      frameDesktop.classList.remove('hidden');
      frameMobile.classList.add('hidden');
    });

    deviceMobile.addEventListener('click', () => {
      deviceMobile.classList.add('bg-[#EA7200]', 'text-black', 'font-bold');
      deviceMobile.classList.remove('text-zinc-400');
      deviceDesktop.classList.remove('bg-[#EA7200]', 'text-black', 'font-bold');
      deviceDesktop.classList.add('text-zinc-400');

      frameMobile.classList.remove('hidden');
      frameDesktop.classList.add('hidden');
    });
  }
}

/**
 * 5. Filtres et modale des Réalisations (Portfolio)
 */
function initPortfolio() {
  const filterBtns = document.querySelectorAll('[data-portfolio-filter]');
  const projectCards = document.querySelectorAll('[data-portfolio-item]');
  const modal = document.getElementById('project-modal');
  const closeModalBtn = document.getElementById('close-project-modal');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-portfolio-filter');

      filterBtns.forEach((b) => {
        const isCurrent = b.getAttribute('data-portfolio-filter') === filter;
        if (isCurrent) {
          b.classList.add('bg-white', 'dark:bg-[#18181C]', 'text-zinc-900', 'dark:text-white', 'border', 'border-zinc-300', 'dark:border-zinc-700', 'font-bold');
          b.classList.remove('text-zinc-600', 'dark:text-zinc-400');
        } else {
          b.classList.remove('bg-white', 'dark:bg-[#18181C]', 'text-zinc-900', 'dark:text-white', 'border', 'border-zinc-300', 'dark:border-zinc-700', 'font-bold');
          b.classList.add('text-zinc-600', 'dark:text-zinc-400');
        }
      });

      projectCards.forEach((card) => {
        const pole = card.getAttribute('data-pole');
        if (filter === 'all' || pole === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Modal handlers
  projectCards.forEach((card) => {
    card.addEventListener('click', () => {
      const title = card.getAttribute('data-title');
      const desc = card.getAttribute('data-desc');
      const client = card.getAttribute('data-client');
      const img = card.getAttribute('data-img');
      const cat = card.getAttribute('data-cat');

      if (!modal) return;
      document.getElementById('modal-img').src = img;
      document.getElementById('modal-cat').textContent = cat;
      document.getElementById('modal-title').textContent = title;
      document.getElementById('modal-desc').textContent = desc;
      document.getElementById('modal-client').textContent = client;

      modal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    });
  });

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }
    });
  }
}

/**
 * 6. Formulaire de contact et devis
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successBox = document.getElementById('form-success');
  const errorBox = document.getElementById('form-error');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      if (errorBox) {
        errorBox.textContent = 'Veuillez remplir tous les champs obligatoires.';
        errorBox.classList.remove('hidden');
      }
      return;
    }

    if (errorBox) errorBox.classList.add('hidden');

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Transmission en cours...';
    }

    setTimeout(() => {
      if (form) form.classList.add('hidden');
      if (successBox) successBox.classList.remove('hidden');
    }, 800);
  });
}

/**
 * 7. FAQ Accordion
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('[data-faq-item]');

  faqItems.forEach((item) => {
    const trigger = item.querySelector('[data-faq-trigger]');
    const content = item.querySelector('[data-faq-content]');
    const icon = item.querySelector('[data-faq-icon]');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isExpanded = !content.classList.contains('hidden');

      // Close all
      faqItems.forEach((other) => {
        const otherContent = other.querySelector('[data-faq-content]');
        const otherIcon = other.querySelector('[data-faq-icon]');
        if (otherContent) otherContent.classList.add('hidden');
        if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
      });

      if (!isExpanded) {
        content.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}
