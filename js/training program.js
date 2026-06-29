/* ============================================================
   MEMBER 2 — programs.js
   Handles:
     1. Dark mode toggle (reads saved preference)
     2. Filter tabs — show/hide cards by category
     3. Search input  — live search across card titles & skills
     4. Combined filter + search logic
     5. "No results" message
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     1. DARK MODE TOGGLE
     Reads the theme saved by Member 1's script (same key).
     Add a dark-toggle button to programs.html if needed.
  ---------------------------------------------------------- */
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);

  const darkToggle = document.getElementById('darkToggle');
  if (darkToggle) {
    darkToggle.textContent = savedTheme === 'dark' ? '☀' : '☾';

    darkToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next    = current === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      darkToggle.textContent = next === 'dark' ? '☀' : '☾';
    });
  }


  /* ----------------------------------------------------------
     2. REFERENCES
  ---------------------------------------------------------- */
  const cards      = document.querySelectorAll('.program-card');  // all cards
  const filterTabs = document.querySelectorAll('.filter-tab');    // category buttons
  const searchInput = document.getElementById('searchInput');     // text search
  const noResults  = document.getElementById('noResults');        // empty state message

  let activeFilter = 'all';   // currently selected category
  let searchQuery  = '';      // current search string


  /* ----------------------------------------------------------
     3. FILTER TABS
     Each tab has data-filter="category" (or "all").
     Cards have data-category="category".
  ---------------------------------------------------------- */
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab style
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      activeFilter = tab.getAttribute('data-filter');
      applyFilters();
    });
  });


  /* ----------------------------------------------------------
     4. SEARCH INPUT
     Runs applyFilters() on every keystroke.
  ---------------------------------------------------------- */
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value.trim().toLowerCase();
      applyFilters();
    });
  }


  /* ----------------------------------------------------------
     5. APPLY FILTERS
     Shows a card only if it matches BOTH the active category
     filter AND the search query.
  ---------------------------------------------------------- */
  function applyFilters() {
    let visibleCount = 0;

    cards.forEach(card => {
      const category   = card.getAttribute('data-category') || '';
      const titleEl    = card.querySelector('h3');
      const descEl     = card.querySelector('.card-desc');
      const skillItems = card.querySelectorAll('.skills-list li');

      // Build a searchable text blob from the card
      const searchText = [
        titleEl  ? titleEl.textContent  : '',
        descEl   ? descEl.textContent   : '',
        ...[...skillItems].map(li => li.textContent),
      ].join(' ').toLowerCase();

      const matchesFilter = activeFilter === 'all' || category === activeFilter;
      const matchesSearch = searchQuery === '' || searchText.includes(searchQuery);

      if (matchesFilter && matchesSearch) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    // Show/hide "no results" message
    if (noResults) {
      noResults.classList.toggle('hidden', visibleCount > 0);
    }
  }


  /* ----------------------------------------------------------
     OPTIONAL: Smooth scroll to #programs when a filter tab
     is clicked (useful if the page header is tall).
  ---------------------------------------------------------- */
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const programsSection = document.getElementById('programs');
      if (programsSection) {
        programsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});


/* ============================================================
   MEMBER 1 — script.js
   Handles:
     1. Dark mode toggle
     2. Hamburger / mobile menu
     3. Navbar shadow on scroll
     4. Active nav link on scroll
     5. Scroll-triggered animations (.fade-up / .fade-in)
     6. Stats counter animation
     7. Newsletter form feedback
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     1. DARK MODE TOGGLE
     Reads saved preference from localStorage on load.
     Clicking the button toggles data-theme on <html>.
  ---------------------------------------------------------- */
  const html       = document.documentElement;
  const darkToggle = document.getElementById('darkToggle');

  // Apply saved theme on load
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  updateToggleIcon(savedTheme);

  darkToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateToggleIcon(next);
  });

  function updateToggleIcon(theme) {
    // Replace with your preferred icon text or SVG
    darkToggle.textContent = theme === 'dark' ? '☀' : '☾';
  }


  /* ----------------------------------------------------------
     2. HAMBURGER / MOBILE MENU
     Toggles .nav-open on <body> to show/hide mobile nav.
  ---------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');

  hamburger.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
  });

  // Close menu when a nav link is clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
    });
  });


  /* ----------------------------------------------------------
     3. NAVBAR SHADOW ON SCROLL
     Adds .scrolled to .navbar when page is scrolled down.
  ---------------------------------------------------------- */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });


  /* ----------------------------------------------------------
     4. ACTIVE NAV LINK ON SCROLL
     Highlights the nav link matching the visible section.
  ---------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach(section => sectionObserver.observe(section));


  /* ----------------------------------------------------------
     5. SCROLL-TRIGGERED ANIMATIONS
     Adds .animate to elements with .fade-up or .fade-in
     when they enter the viewport.
     Add these classes in HTML to opt any element in.
  ---------------------------------------------------------- */
  const animatedEls = document.querySelectorAll('.fade-up, .fade-in');

  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        animObserver.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.15 });

  animatedEls.forEach(el => animObserver.observe(el));


  /* ----------------------------------------------------------
     6. STATS COUNTER ANIMATION
     Each .stat-number element needs a data-target attribute
     with the final number value.
     Example: <span class="stat-number" data-target="500"></span>
  ---------------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el     = entry.target;
      const target = +el.getAttribute('data-target');
      const suffix = el.getAttribute('data-suffix') || ''; // e.g. "+" or "%"
      const duration = 1800; // ms
      const step   = Math.ceil(target / (duration / 16));
      let current  = 0;

      el.classList.add('animate');

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          el.textContent = target + suffix;
          clearInterval(timer);
        } else {
          el.textContent = current + suffix;
        }
      }, 16);

      statObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statObserver.observe(el));


  /* ----------------------------------------------------------
     7. NEWSLETTER FORM
     Basic feedback — replace with real API call if needed.
  ---------------------------------------------------------- */
  const newsletterBtn   = document.getElementById('newsletterBtn');
  const newsletterEmail = document.getElementById('newsletterEmail');

  if (newsletterBtn) {
    newsletterBtn.addEventListener('click', () => {
      const email = newsletterEmail.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        showToast('Please enter your email address.', 'error');
        return;
      }
      if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      // TODO: replace with real API call
      showToast('You\'re subscribed! 🎉', 'success');
      newsletterEmail.value = '';
    });
  }


  /* ----------------------------------------------------------
     HELPER: Toast notification
     Creates a small toast message at the bottom of the screen.
  ---------------------------------------------------------- */
  function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;

    Object.assign(toast.style, {
      position:     'fixed',
      bottom:       '2rem',
      right:        '2rem',
      padding:      '0.75rem 1.5rem',
      borderRadius: '8px',
      fontSize:     '0.875rem',
      fontWeight:   '600',
      color:        '#fff',
      background:   type === 'success' ? '#16a34a' : '#dc2626',
      boxShadow:    '0 4px 16px rgba(0,0,0,0.15)',
      zIndex:       '9999',
      transition:   'opacity 0.3s',
    });

    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; }, 3000);
    setTimeout(() => toast.remove(), 3350);
  }

});
