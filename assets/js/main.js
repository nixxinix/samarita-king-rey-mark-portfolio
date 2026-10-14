/* ==========================================================================
   Portfolio Template - main.js
   Plain JavaScript, no libraries. Every feature checks that its elements
   exist, so you can delete a section from a page without breaking the rest.

   1  Header shadow and back-to-top button
   2  Side menu
   3  Scroll reveal (rise from the bottom)
   4  Project filters
   5  Picture viewer
   6  Tools strip
   7  Certificate carousel
   8  Contact form
   9  Footer year
   ========================================================================== */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var reduceMotion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };

  function $(selector, scope) { return (scope || doc).querySelector(selector); }
  function $$(selector, scope) { return Array.prototype.slice.call((scope || doc).querySelectorAll(selector)); }
  function scrollBehavior() { return reduceMotion.matches ? 'auto' : 'smooth'; }

  // Declare panel early so the scroll handler can check if it is open.
  var panel = $('#site-nav');


  /* 1. Header shadow, hide-on-scroll, and back-to-top button ------------- */
  var header = $('.site-header');
  var toTop = $('.to-top');
  var lastY = window.pageYOffset || root.scrollTop;
  var headerHeight = header ? header.offsetHeight : 72;

  function onScroll() {
    var y = window.pageYOffset || root.scrollTop;
    if (header) {
      header.classList.toggle('is-scrolled', y > 8);
      if (!panel || !panel.classList.contains('is-open')) {
        if (y > headerHeight && y > lastY) {
          header.classList.add('is-hidden');
        } else {
          header.classList.remove('is-hidden');
        }
      }
    }
    if (toTop) { toTop.classList.toggle('is-visible', y > 480); }
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: scrollBehavior() });
    });
  }


  /* 2. Side menu --------------------------------------------------------- */
  var menuBtn = $('.menu-btn');
  var closeBtn = $('.panel-close');

  if (menuBtn && panel && closeBtn) {
    var scrollY = 0;

    var setMenu = function (open, returnFocus) {
      panel.classList.toggle('is-open', open);
      closeBtn.classList.toggle('is-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));

      if (open) {
        scrollY = window.pageYOffset || root.scrollTop;
        doc.body.style.top = '-' + scrollY + 'px';
        doc.body.classList.add('no-scroll');
        if (header) { header.classList.remove('is-hidden'); }
        closeBtn.focus();
      } else {
        // Must set scrollTop BEFORE removing position:fixed, then clear top
        doc.body.style.top = '';
        doc.body.classList.remove('no-scroll');
        root.scrollTop = scrollY;
        document.documentElement.scrollTop = scrollY;
        window.scrollTo(0, scrollY);
        lastY = scrollY;
        if (returnFocus) { menuBtn.focus(); }
      }
    };

    menuBtn.addEventListener('click', function () { setMenu(true); });
    closeBtn.addEventListener('click', function () { setMenu(false, true); });

    doc.addEventListener('keydown', function (event) {
      if (!panel.classList.contains('is-open')) { return; }
      if (event.key === 'Escape') { setMenu(false, true); return; }
      if (event.key === 'Tab') {
        var items = $$('a[href], button:not([disabled])', panel);
        var focusables = [closeBtn].concat(items);
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (event.shiftKey && doc.activeElement === first) {
          event.preventDefault(); last.focus();
        } else if (!event.shiftKey && doc.activeElement === last) {
          event.preventDefault(); first.focus();
        }
      }
    });
  }


  /* 3. Scroll reveal ----------------------------------------------------- */
  // Elements with data-reveal start slightly lower and transparent, then rise
  // into place once. Items that appear together are staggered a little.
  var revealItems = $$('[data-reveal]');

  if (!('IntersectionObserver' in window) || reduceMotion.matches) {
    revealItems.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      var showing = entries
        .filter(function (entry) { return entry.isIntersecting; })
        .sort(function (a, b) {
          return (a.boundingClientRect.top - b.boundingClientRect.top) ||
                 (a.boundingClientRect.left - b.boundingClientRect.left);
        });

      showing.forEach(function (entry, index) {
        entry.target.style.setProperty('--reveal-delay', Math.min(index, 4) * 90 + 'ms');
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

    revealItems.forEach(function (el) { observer.observe(el); });
  }


  /* 4. Project filters --------------------------------------------------- */
  var filterBar = $('.filters');
  var projects = $$('.project');

  if (filterBar && projects.length) {
    var filterButtons = $$('.filter', filterBar);
    var filterStatus = $('#filter-status');
    filterBar.hidden = false;   // hidden in the HTML so it never shows without JavaScript

    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        var wanted = button.getAttribute('data-filter');
        var shown = 0;

        filterButtons.forEach(function (b) {
          b.setAttribute('aria-pressed', String(b === button));
        });

        projects.forEach(function (project) {
          var categories = (project.getAttribute('data-category') || '').split(' ');
          var match = wanted === 'all' || categories.indexOf(wanted) !== -1;
          project.hidden = !match;

          var card = $('.card', project);
          if (match && card) {
            shown += 1;
            if (!reduceMotion.matches) {
              card.classList.remove('pop');
              void card.offsetWidth;          // restart the animation
              card.classList.add('pop');
            }
          }
        });

        if (filterStatus) {
          filterStatus.textContent = 'Showing ' + shown + (shown === 1 ? ' project' : ' projects') +
            (wanted === 'all' ? '.' : ' in ' + button.textContent.trim() + '.');
        }
      });
    });
  }


  /* 5. Picture viewer ---------------------------------------------------- */
  var lightbox = $('#lightbox');

  if (lightbox) {
    var lightboxImg = $('img', lightbox);
    var lightboxCaption = $('figcaption', lightbox);

    doc.addEventListener('click', function (event) {
      var trigger = event.target.closest('[data-lightbox]');
      if (!trigger) { return; }

      var src = trigger.getAttribute('data-lightbox');
      if (typeof lightbox.showModal !== 'function') {
        window.open(src, '_blank', 'noopener');   // very old browsers
        return;
      }
      lightboxImg.src = src;
      lightboxImg.alt = trigger.getAttribute('data-alt') || '';
      lightboxCaption.textContent = trigger.getAttribute('data-caption') || '';
      lightbox.showModal();
    });

    lightbox.addEventListener('click', function (event) {
      // Clicking the dark area around the picture, or the close button.
      if (event.target === lightbox || event.target.closest('[data-close]')) { lightbox.close(); }
    });
  }


  /* 6. Tools strip ------------------------------------------------------- */
  // Scrolls slowly on its own. It pauses on hover or keyboard focus, has a
  // Pause button, and stays still (as a tidy wrapped list) when the visitor
  // has asked their device for reduced motion.
  var marquee = $('.marquee');

  if (marquee && !reduceMotion.matches) {
    var track = $('.marquee-track', marquee);
    var list = $('.marquee-list', marquee);
    var pauseBtn = $('.marquee-pause');

    if (track && list) {
      var copy = list.cloneNode(true);
      copy.setAttribute('aria-hidden', 'true');
      track.appendChild(copy);
      marquee.classList.add('is-running');

      if (pauseBtn) {
        pauseBtn.hidden = false;
        pauseBtn.addEventListener('click', function () {
          var paused = marquee.classList.toggle('is-paused');
          pauseBtn.textContent = paused ? 'Play moving tools' : 'Pause moving tools';
          pauseBtn.setAttribute('aria-pressed', String(paused));
        });
      }
    }
  }


  /* 7. Certificate carousel ---------------------------------------------- */
  var carousel = $('.carousel');

  if (carousel) {
    var viewport = $('.carousel-viewport', carousel);
    var slides = $$('.slide', carousel);
    var controls = $('.carousel-controls', carousel);
    var prev = $('.carousel-prev', carousel);
    var next = $('.carousel-next', carousel);
    var dotsWrap = $('.dots', carousel);
    var dots = [];
    var ticking = false;

    var currentIndex = function () {
      if (!viewport.clientWidth) { return 0; }
      return Math.round(viewport.scrollLeft / viewport.clientWidth);
    };
    var goTo = function (i) {
      i = Math.max(0, Math.min(slides.length - 1, i));
      viewport.scrollTo({ left: i * viewport.clientWidth, behavior: scrollBehavior() });
    };
    var update = function () {
      var i = currentIndex();
      dots.forEach(function (dot, n) { dot.setAttribute('aria-current', String(n === i)); });
      prev.disabled = i <= 0;
      next.disabled = i >= slides.length - 1;
    };

    slides.forEach(function (slide, i) {
      var dot = doc.createElement('button');
      dot.type = 'button';
      dot.className = 'dot';
      dot.setAttribute('aria-label', 'Show certificate ' + (i + 1) + ' of ' + slides.length);
      dot.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });

    prev.addEventListener('click', function () { goTo(currentIndex() - 1); });
    next.addEventListener('click', function () { goTo(currentIndex() + 1); });

    viewport.addEventListener('scroll', function () {
      if (ticking) { return; }
      ticking = true;
      window.requestAnimationFrame(function () { update(); ticking = false; });
    }, { passive: true });
    window.addEventListener('resize', update);

    viewport.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowRight') { event.preventDefault(); goTo(currentIndex() + 1); }
      if (event.key === 'ArrowLeft')  { event.preventDefault(); goTo(currentIndex() - 1); }
    });

    controls.hidden = false;
    update();
  }


  /* 8. Contact form ------------------------------------------------------ */
  // Set data-endpoint on the <form> to a form service address (for example a
  // Formspree URL) to send messages directly. Without it, the visitor's email
  // app opens with the message ready to send to data-email.
  var form = $('#contact-form');

  if (form) {
    var status = $('#form-status');
    var fields = [
      { id: 'name',    message: 'Please enter your name.' },
      { id: 'email',   message: 'Please enter a valid email address, like name@example.com.',
        test: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); } },
      { id: 'message', message: 'Please write a short message.' }
    ];

    var setStatus = function (text, kind) {
      status.textContent = text;
      status.className = 'form-status' + (kind ? ' is-' + kind : '');
    };

    var validate = function (field) {
      var input = doc.getElementById(field.id);
      var error = doc.getElementById('error-' + field.id);
      var value = input.value.trim();
      var ok = field.test ? field.test(value) : value.length > 0;

      input.setAttribute('aria-invalid', String(!ok));
      error.textContent = ok ? '' : field.message;
      error.hidden = ok;
      return ok;
    };

    fields.forEach(function (field) {
      var input = doc.getElementById(field.id);
      input.addEventListener('blur', function () { if (input.value) { validate(field); } });
      input.addEventListener('input', function () {
        if (input.getAttribute('aria-invalid') === 'true') { validate(field); }
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      setStatus('', '');

      var firstBad = null;
      fields.forEach(function (field) {
        if (!validate(field) && !firstBad) { firstBad = doc.getElementById(field.id); }
      });
      if (firstBad) {
        firstBad.focus();
        setStatus('Please fix the highlighted fields and try again.', 'error');
        return;
      }

      // Hidden spam trap: real people never fill this in.
      if (form.elements._gotcha && form.elements._gotcha.value) { return; }

      var endpoint = form.getAttribute('data-endpoint');
      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var subject = form.elements.subject.value.trim();
      var message = form.elements.message.value.trim();

      if (endpoint) {
        setStatus('Sending your message...', '');
        fetch(endpoint, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        }).then(function (response) {
          if (!response.ok) { throw new Error('Request failed'); }
          form.reset();
          setStatus('Thank you. Your message was sent.', 'success');
        }).catch(function () {
          setStatus('Sorry, the message could not be sent. Please email me directly instead.', 'error');
        });
      } else {
        var to = form.getAttribute('data-email') || '';
        var body = 'Name: ' + name + '\nEmail: ' + email + '\n\n' + message;
        window.location.href = 'mailto:' + to +
          '?subject=' + encodeURIComponent(subject || 'Message from my portfolio') +
          '&body=' + encodeURIComponent(body);
        setStatus('Your email app should open with the message ready to send.', 'success');
      }
    });
  }


  /* 9. Footer year ------------------------------------------------------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
