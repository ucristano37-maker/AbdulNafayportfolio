/* ==========================================================================
   FARHAN — PORTFOLIO SCRIPT
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     CONFIG
     ------------------------------------------------------------------ */

  // Web3Forms Access Key
  var WEB3FORMS_ACCESS_KEY = '6afcd818-2f8d-4bbe-8944-740dca3afb64';

  var SKILLS = [
    { name: 'HTML', level: 96 },
    { name: 'CSS', level: 93 },
    { name: 'JavaScript', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Python', level: 87 },
    { name: 'Prompt Engineering', level: 94 },
    { name: 'N8N', level: 86 },
    { name: 'Zapier', level: 88 },
    { name: 'Modern Python Web Dev', level: 84 },
    { name: 'Web Development', level: 92 },
    { name: 'API Integration', level: 88 },
    { name: 'AI Chatbot Development', level: 89 },
    { name: 'Full Stack Development', level: 86 },
    { name: 'Backend Development', level: 85 },
    { name: 'Frontend Development', level: 90 }
  ];

  var PLACEHOLDER_GRADS = [
    'linear-gradient(135deg, #0ea5e9, #6366f1)',
    'linear-gradient(135deg, #8b5cf6, #d946ef)',
    'linear-gradient(135deg, #f43f5e, #f59e0b)',
    'linear-gradient(135deg, #10b981, #0ea5e9)',
    'linear-gradient(135deg, #6366f1, #ec4899)',
    'linear-gradient(135deg, #f59e0b, #ef4444)'
  ];

  var reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  var $ = function (sel, ctx) {
    return (ctx || document).querySelector(sel);
  };

  var $$ = function (sel, ctx) {
    return Array.prototype.slice.call(
      (ctx || document).querySelectorAll(sel)
    );
  };

  /* ------------------------------------------------------------------
     PRELOADER
     ------------------------------------------------------------------ */

  function initPreloader() {
    var preloader = $('#preloader');
    if (!preloader) return;

    var hide = function () {
      preloader.classList.add('done');
    };

    var fallback = setTimeout(hide, 3500);

    window.addEventListener('load', function () {
      clearTimeout(fallback);
      setTimeout(hide, 350);
    });
  }

  /* ------------------------------------------------------------------
     HEADER — scrolled state + mobile menu
     ------------------------------------------------------------------ */

  function initHeader() {
    var header = $('#header');
    var toggle = $('#navToggle');
    var menu = $('#navMenu');

    if (header) {
      function onScroll() {
        if (window.scrollY > 40) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }

      window.addEventListener('scroll', onScroll, {
        passive: true
      });

      onScroll();
    }

    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');

      toggle.classList.toggle('open', open);

      toggle.setAttribute(
        'aria-expanded',
        open ? 'true' : 'false'
      );

      toggle.setAttribute(
        'aria-label',
        open ? 'Close menu' : 'Open menu'
      );
    });

    $$('.nav-link', menu).forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', function (e) {
      if (
        menu.classList.contains('open') &&
        !menu.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        menu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (
        e.key === 'Escape' &&
        menu.classList.contains('open')
      ) {
        menu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ------------------------------------------------------------------
     SCROLLSPY
     ------------------------------------------------------------------ */

  function initScrollspy() {
    var sections = $$('main section[id]');
    var links = $$('.nav-link[href^="#"]');

    if (!sections.length || !links.length) return;

    function update() {
      var pos = window.scrollY + 140;
      var currentId = sections[0].id;

      sections.forEach(function (sec) {
        if (sec.offsetTop <= pos) {
          currentId = sec.id;
        }
      });

      links.forEach(function (link) {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + currentId
        );
      });
    }

    window.addEventListener('scroll', update, {
      passive: true
    });

    update();
  }

  /* ------------------------------------------------------------------
     TYPING ANIMATION
     ------------------------------------------------------------------ */

  function initTyping() {
    var typedText = $('#typedText');
    var revealLine = $('#revealLine');

    if (!typedText || !revealLine) return;

    var fullText =
      'Hi, I am Farhan. I am 30 years old.';

    function showAll() {
      typedText.textContent = fullText;
      revealLine.classList.add('show');
    }

    if (reduceMotion) {
      showAll();
      return;
    }

    typedText.textContent = '';

    var i = 0;

    function charDelay() {
      var base = 52;

      if (i > 0) {
        var prev = fullText[i - 1];

        if (prev === '.' || prev === ',') {
          return 340 + Math.random() * 380;
        }
      }

      return base + Math.random() * 46;
    }

    function typeTick() {
      if (i >= fullText.length) {
        setTimeout(function () {
          revealLine.classList.add('show');
        }, 450);

        return;
      }

      i++;

      typedText.textContent =
        fullText.slice(0, i);

      if (
        Math.random() < 0.045 &&
        i > 4 &&
        i < fullText.length - 2
      ) {
        setTimeout(function () {
          typedText.textContent =
            fullText.slice(0, i - 2);

          setTimeout(typeTick, 90);
        }, 70);

        return;
      }

      setTimeout(typeTick, charDelay());
    }

    setTimeout(typeTick, 500);
  }

  /* ------------------------------------------------------------------
     REVEAL ON SCROLL
     ------------------------------------------------------------------ */

  function initReveal() {
    var els = $$('.reveal');

    if (!els.length) return;

    els.forEach(function (el) {
      var delay = parseInt(
        el.getAttribute('data-delay'),
        10
      );

      if (!isNaN(delay) && delay > 0) {
        el.style.transitionDelay =
          delay * 0.12 + 's';
      }
    });

    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) {
        el.classList.add('visible');
      });

      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    els.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ------------------------------------------------------------------
     SKILLS
     ------------------------------------------------------------------ */

  function initSkills() {
    var grid = $('#skillsGrid');

    if (!grid) return;

    var items = SKILLS.map(function (skill) {
      var label =
        skill.level >= 90
          ? 'Expert'
          : skill.level >= 75
          ? 'Advanced'
          : skill.level >= 55
          ? 'Intermediate'
          : 'Beginner';

      var el = document.createElement('div');

      el.className = 'skill-item reveal';

      el.innerHTML =
        '<div class="skill-head">' +
          '<span class="skill-name">' +
            '<span class="skill-dot"></span>' +
            escapeHtml(skill.name) +
          '</span>' +

          '<span class="skill-level">' +
            skill.level +
            '% · ' +
            label +
          '</span>' +
        '</div>' +

        '<div class="skill-bar">' +
          '<span class="skill-bar-fill" data-level="' +
          skill.level +
          '"></span>' +
        '</div>';

      return el;
    });

    items.forEach(function (el) {
      grid.appendChild(el);
    });

    function animate(item) {
      var fill = $('.skill-bar-fill', item);

      if (fill) {
        fill.style.width =
          fill.getAttribute('data-level') + '%';
      }
    }

    if (
      !('IntersectionObserver' in window) ||
      reduceMotion
    ) {
      items.forEach(animate);

      items.forEach(function (el) {
        el.classList.add('visible');
      });

      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animate(entry.target);
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.25
      }
    );

    items.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ------------------------------------------------------------------
     PROJECTS
     ------------------------------------------------------------------ */

  function initProjects() {
    var grid = $('#projectsGrid');

    if (!grid) return;

    if (
      typeof PROJECTS === 'undefined' ||
      !PROJECTS.length
    ) {
      grid.innerHTML =
        '<p class="projects-note" ' +
        'style="grid-column:1/-1;color:var(--text-muted)">' +
        'No projects found. Open ' +
        '<code>js/projects.js</code> and add your projects.' +
        '</p>';

      return;
    }

    PROJECTS.forEach(function (project, idx) {
      var card = document.createElement('article');

      card.className = 'project-card reveal';

      card.setAttribute(
        'data-delay',
        idx % 3
      );

      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');

      card.setAttribute(
        'aria-label',
        'View details: ' + project.title
      );

      var tags = (project.tags || [])
        .slice(0, 3)
        .map(function (t) {
          return (
            '<span class="tag">' +
            escapeHtml(t) +
            '</span>'
          );
        })
        .join('');

      card.innerHTML =
        '<div class="project-media">' +
          '<span class="project-img-skeleton"></span>' +
          '<img class="project-img" loading="lazy" alt="' +
          escapeAttr(project.title) +
          '" />' +
        '</div>' +

        '<div class="project-body">' +
          '<h3 class="project-title">' +
            escapeHtml(project.title) +
          '</h3>' +

          '<p class="project-desc">' +
            escapeHtml(project.description || '') +
          '</p>' +

          (
            tags
              ? '<div class="project-tags">' +
                tags +
                '</div>'
              : ''
          ) +

          '<div class="project-meta">' +
            '<span>Click to view details</span>' +
            '<span class="open-link">Details →</span>' +
          '</div>' +
        '</div>';

      var img = $('.project-img', card);
      var skeleton =
        $('.project-img-skeleton', card);

      function setupImage(src) {
        img.onload = function () {
          if (skeleton) skeleton.remove();
        };

        img.onerror = function () {
          if (skeleton) skeleton.remove();

          showImageFallback(
            card,
            project.title
          );
        };

        img.src = src || '';
      }

      if (project.image) {
        setupImage(project.image);
      } else {
        if (skeleton) skeleton.remove();

        showImageFallback(
          card,
          project.title
        );
      }

      function openDetail() {
        openProjectModal(project);
      }

      card.addEventListener(
        'click',
        openDetail
      );

      card.addEventListener(
        'keydown',
        function (e) {
          if (
            e.key === 'Enter' ||
            e.key === ' '
          ) {
            e.preventDefault();
            openDetail();
          }
        }
      );

      grid.appendChild(card);
    });

    initReveal();
  }

  function showImageFallback(card, title) {
    var media = $('.project-media', card);

    if (!media) return;

    var fallback =
      document.createElement('div');

    fallback.className =
      'project-img-fallback';

    fallback.style.background =
      PLACEHOLDER_GRADS[
        Math.abs(hashStr(title)) %
        PLACEHOLDER_GRADS.length
      ];

    fallback.textContent =
      title.charAt(0).toUpperCase();

    media.appendChild(fallback);
  }

  function hashStr(str) {
    var h = 0;

    for (var i = 0; i < str.length; i++) {
      h =
        ((h << 5) -
          h +
          str.charCodeAt(i)) |
        0;
    }

    return h;
  }

  /* ------------------------------------------------------------------
     MODAL
     ------------------------------------------------------------------ */

  var modalEl = null;
  var lastFocused = null;

  function initModal() {
    modalEl = $('#projectModal');

    if (!modalEl) return;

    var modalClose = $('#modalClose');
    var modalCloseAlt = $('#modalCloseAlt');

    if (modalClose) {
      modalClose.addEventListener(
        'click',
        closeProjectModal
      );
    }

    if (modalCloseAlt) {
      modalCloseAlt.addEventListener(
        'click',
        closeProjectModal
      );
    }

    modalEl.addEventListener(
      'click',
      function (e) {
        if (e.target === modalEl) {
          closeProjectModal();
        }
      }
    );

    document.addEventListener(
      'keydown',
      function (e) {
        if (
          e.key === 'Escape' &&
          modalEl.classList.contains('active')
        ) {
          closeProjectModal();
        }
      }
    );
  }

  function openProjectModal(project) {
    if (!modalEl) return;

    lastFocused = document.activeElement;

    modalEl.hidden = false;

    void modalEl.offsetWidth;

    modalEl.classList.add('active');

    document.body.style.overflow = 'hidden';

    var img = $('#modalImage');
    var media = $('#modalMedia');

    var skeleton =
      $('.modal-img-skeleton', media);

    var fallback =
      $('.modal-img-fallback', media);

    if (!img || !media) return;

    img.classList.remove('loaded');

    if (skeleton) {
      skeleton.style.display = '';
    }

    if (fallback) {
      fallback.remove();
    }

    img.onload = null;
    img.onerror = null;

    var tagsBox = $('#modalTags');

    if (tagsBox) {
      tagsBox.innerHTML =
        (project.tags || [])
          .map(function (t) {
            return (
              '<span class="tag">' +
              escapeHtml(t) +
              '</span>'
            );
          })
          .join('');
    }

    var modalTitle = $('#modalTitle');
    var modalDesc = $('#modalDesc');

    if (modalTitle) {
      modalTitle.textContent =
        project.title;
    }

    if (modalDesc) {
      modalDesc.textContent =
        project.longDescription ||
        project.description ||
        '';
    }

    img.alt = project.title;

    if (project.image) {
      img.onload = function () {
        var containerW =
          media.clientWidth;

        var cap = Math.min(
          img.naturalWidth ||
            containerW,
          containerW
        );

        img.style.maxWidth =
          cap + 'px';

        img.classList.add('loaded');

        if (skeleton) {
          skeleton.style.display =
            'none';
        }
      };

      img.onerror = function () {
        if (skeleton) {
          skeleton.style.display =
            'none';
        }

        showModalImageFallback(
          project.title
        );
      };

      img.src = project.image;
    } else {
      if (skeleton) {
        skeleton.style.display =
          'none';
      }

      showModalImageFallback(
        project.title
      );
    }

    setTimeout(function () {
      var closeBtn = $('#modalClose');

      if (closeBtn) {
        closeBtn.focus();
      }
    }, 50);
  }

  function showModalImageFallback(title) {
    if (!modalEl) return;

    var media = $('#modalMedia');

    if (!media) return;

    var existing =
      $('.modal-img-fallback', media);

    if (existing) {
      existing.remove();
    }

    var fallback =
      document.createElement('div');

    fallback.className =
      'modal-img-fallback';

    fallback.style.background =
      PLACEHOLDER_GRADS[
        Math.abs(hashStr(title)) %
        PLACEHOLDER_GRADS.length
      ];

    fallback.textContent =
      title.charAt(0).toUpperCase();

    media.appendChild(fallback);
  }

  function closeProjectModal() {
    if (
      !modalEl ||
      !modalEl.classList.contains('active')
    ) {
      return;
    }

    modalEl.classList.remove('active');

    document.body.style.overflow = '';

    setTimeout(function () {
      modalEl.hidden = true;

      var img = $('#modalImage');

      if (img) {
        img.removeAttribute('src');
        img.classList.remove('loaded');
      }
    }, 350);

    if (
      lastFocused &&
      lastFocused.focus
    ) {
      lastFocused.focus();
    }
  }

  /* ------------------------------------------------------------------
     CONTACT — WEB3FORMS
     ------------------------------------------------------------------ */

  function initContact() {
    var form = $('#contactForm');

    if (!form) return;

    var nameInput =
      $('#contactName');

    var emailInput =
      $('#contactEmail');

    var messageInput =
      $('#contactMessage');

    var submitBtn =
      $('#contactSubmit');

    var status =
      $('#formStatus');

    if (
      !nameInput ||
      !emailInput ||
      !messageInput ||
      !submitBtn ||
      !status
    ) {
      return;
    }

    function clearError(
      input,
      errorEl
    ) {
      input.classList.remove(
        'invalid'
      );

      if (errorEl) {
        errorEl.textContent = '';
      }
    }

    function setError(
      input,
      errorEl,
      msg
    ) {
      input.classList.add(
        'invalid'
      );

      if (errorEl) {
        errorEl.textContent = msg;
      }
    }

    function validate() {
      var ok = true;

      var name =
        nameInput.value.trim();

      var email =
        emailInput.value.trim();

      var message =
        messageInput.value.trim();

      if (name.length < 2) {
        setError(
          nameInput,
          $('#nameError'),
          'Please enter your name.'
        );

        ok = false;
      } else {
        clearError(
          nameInput,
          $('#nameError')
        );
      }

      if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(
          email
        )
      ) {
        setError(
          emailInput,
          $('#emailError'),
          'Please enter a valid email.'
        );

        ok = false;
      } else {
        clearError(
          emailInput,
          $('#emailError')
        );
      }

      if (message.length < 10) {
        setError(
          messageInput,
          $('#messageError'),
          'Message should be at least 10 characters.'
        );

        ok = false;
      } else {
        clearError(
          messageInput,
          $('#messageError')
        );
      }

      return ok;
    }

    /* Clear errors while typing */

    [
      nameInput,
      emailInput,
      messageInput
    ].forEach(function (input) {
      input.addEventListener(
        'input',
        function () {
          input.classList.remove(
            'invalid'
          );

          var map = {
            contactName:
              '#nameError',

            contactEmail:
              '#emailError',

            contactMessage:
              '#messageError'
          };

          var errorEl =
            $(map[input.id]);

          if (errorEl) {
            errorEl.textContent =
              '';
          }

          status.textContent = '';

          status.className =
            'form-status';
        }
      );
    });

    /* Submit form */

    form.addEventListener(
      'submit',
      function (e) {
        e.preventDefault();

        status.textContent = '';

        status.className =
          'form-status';

        if (!validate()) {
          return;
        }

        submitBtn.disabled = true;

        submitBtn.classList.add(
          'loading'
        );

        /*
         * IMPORTANT:
         * We do NOT use the Formspree action
         * from HTML.
         *
         * Instead, we send the form directly
         * to Web3Forms.
         */

        var formData =
          new FormData();

        formData.append(
          'access_key',
          WEB3FORMS_ACCESS_KEY
        );

        formData.append(
          'name',
          nameInput.value.trim()
        );

        formData.append(
          'email',
          emailInput.value.trim()
        );

        formData.append(
          'message',
          messageInput.value.trim()
        );

        formData.append(
          'subject',
          'New message from Farhan Portfolio'
        );

        /*
         * Web3Forms reply-to
         */

        formData.append(
          'replyto',
          emailInput.value.trim()
        );

        /*
         * Spam protection
         */

        formData.append(
          'botcheck',
          ''
        );

        fetch(
          'https://api.web3forms.com/submit',
          {
            method: 'POST',
            body: formData,
            headers: {
              Accept:
                'application/json'
            }
          }
        )
          .then(function (response) {
            return response.json();
          })

          .then(function (data) {
            if (
              data.success === true
            ) {
              form.reset();

              status.textContent =
                "✓ Message sent! I'll get back to you soon.";

              status.className =
                'form-status success';

              showToast(
                'Message sent successfully!',
                'success'
              );
            } else {
              throw new Error(
                data.message ||
                'Web3Forms submission failed.'
              );
            }
          })

          .catch(function (error) {
            console.error(
              'Web3Forms error:',
              error
            );

            status.textContent =
              '✗ Could not send the message. Please try again.';

            status.className =
              'form-status error';

            showToast(
              'Could not send the message. Please try again.',
              'error'
            );
          })

          .finally(function () {
            submitBtn.disabled =
              false;

            submitBtn.classList.remove(
              'loading'
            );
          });
      }
    );
  }

  /* ------------------------------------------------------------------
     TOAST
     ------------------------------------------------------------------ */

  var toastTimer = null;

  function showToast(
    msg,
    type
  ) {
    var toast = $('#toast');

    if (!toast) return;

    toast.textContent = msg;

    toast.className =
      'toast show ' +
      (type || '');

    clearTimeout(toastTimer);

    toastTimer = setTimeout(
      function () {
        toast.classList.remove(
          'show'
        );
      },
      4200
    );
  }

  /* ------------------------------------------------------------------
     HELPERS
     ------------------------------------------------------------------ */

  function escapeHtml(str) {
    return String(str)
      .replace(
        /&/g,
        '&amp;'
      )
      .replace(
        /</g,
        '&lt;'
      )
      .replace(
        />/g,
        '&gt;'
      )
      .replace(
        /"/g,
        '&quot;'
      )
      .replace(
        /'/g,
        '&#39;'
      );
  }

  function escapeAttr(str) {
    return escapeHtml(str).replace(
      /`/g,
      '&#96;'
    );
  }

  /* ------------------------------------------------------------------
     FOOTER YEAR
     ------------------------------------------------------------------ */

  var yearEl = $('#year');

  if (yearEl) {
    yearEl.textContent =
      new Date().getFullYear();
  }

  /* ------------------------------------------------------------------
     CUSTOM CURSOR
     ------------------------------------------------------------------ */

  function initCustomCursor() {
    if (
      reduceMotion ||
      !window.matchMedia(
        '(pointer: fine)'
      ).matches
    ) {
      return;
    }

    var dot =
      $('#cursorDot');

    var ring =
      $('#cursorRing');

    if (!dot || !ring) return;

    document.documentElement.classList.add(
      'custom-cursor'
    );

    var mx = -100;
    var my = -100;

    var rx = -100;
    var ry = -100;

    document.addEventListener(
      'mousemove',
      function (e) {
        mx = e.clientX;
        my = e.clientY;

        dot.style.transform =
          'translate(' +
          mx +
          'px,' +
          my +
          'px) translate(-50%, -50%)';
      }
    );

    (function loop() {
      rx +=
        (mx - rx) * 0.16;

      ry +=
        (my - ry) * 0.16;

      ring.style.transform =
        'translate(' +
        rx +
        'px,' +
        ry +
        'px) translate(-50%, -50%)';

      requestAnimationFrame(
        loop
      );
    })();

    var INTERACTIVE =
      'a, button, input, textarea, select, .project-card, .social-card, .hire-card, .back-top';

    document.addEventListener(
      'mouseover',
      function (e) {
        if (
          e.target.closest(
            INTERACTIVE
          )
        ) {
          dot.classList.add(
            'hover'
          );

          ring.classList.add(
            'hover'
          );
        }
      }
    );

    document.addEventListener(
      'mouseout',
      function (e) {
        if (
          e.target.closest(
            INTERACTIVE
          )
        ) {
          dot.classList.remove(
            'hover'
          );

          ring.classList.remove(
            'hover'
          );
        }
      }
    );

    document.documentElement.addEventListener(
      'mouseleave',
      function () {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
      }
    );

    document.documentElement.addEventListener(
      'mouseenter',
      function () {
        dot.style.opacity = '';
        ring.style.opacity = '';
      }
    );
  }

  /* ------------------------------------------------------------------
     MARQUEE
     ------------------------------------------------------------------ */

  function initMarquee() {
    var track =
      $('.marquee-track');

    if (!track) return;

    track.innerHTML +=
      track.innerHTML;
  }

  /* ------------------------------------------------------------------
     PROJECT CARDS — 3D TILT
     ------------------------------------------------------------------ */

  function initTilt() {
    if (
      reduceMotion ||
      !window.matchMedia(
        '(pointer: fine)'
      ).matches
    ) {
      return;
    }

    $$('.project-card').forEach(
      function (card) {
        card.addEventListener(
          'mousemove',
          function (e) {
            var r =
              card.getBoundingClientRect();

            var px =
              (e.clientX -
                r.left) /
              r.width;

            var py =
              (e.clientY -
                r.top) /
              r.height;

            card.style.setProperty(
              '--mx',
              (px * 100).toFixed(1) +
                '%'
            );

            card.style.setProperty(
              '--my',
              (py * 100).toFixed(1) +
                '%'
            );

            var rotY =
              (px - 0.5) * 9;

            var rotX =
              (0.5 - py) * 9;

            card.style.transform =
              'perspective(900px) rotateX(' +
              rotX.toFixed(2) +
              'deg) rotateY(' +
              rotY.toFixed(2) +
              'deg) translateY(-6px)';
          }
        );

        card.addEventListener(
          'mouseleave',
          function () {
            card.style.transform =
              '';
          }
        );
      }
    );
  }

  /* ------------------------------------------------------------------
     HERO STATS
     ------------------------------------------------------------------ */

  function initCounters() {
    var stats =
      $$('.hero-stats strong');

    if (
      !stats.length ||
      reduceMotion ||
      !('IntersectionObserver' in window)
    ) {
      return;
    }

    function parseNum(el) {
      return (
        parseInt(
          el.textContent.replace(
            /[^0-9]/g,
            ''
          ),
          10
        ) || 0
      );
    }

    function suffix(el) {
      return el.textContent.replace(
        /[0-9]/g,
        ''
      );
    }

    var io =
      new IntersectionObserver(
        function (entries) {
          entries.forEach(
            function (entry) {
              if (
                !entry.isIntersecting
              ) {
                return;
              }

              var el =
                entry.target;

              io.unobserve(el);

              var target =
                parseNum(el);

              var suf =
                suffix(el);

              var start = null;

              var duration = 1500;

              (function step(ts) {
                if (!start) {
                  start = ts;
                }

                var p =
                  Math.min(
                    (ts - start) /
                      duration,
                    1
                  );

                var eased =
                  1 -
                  Math.pow(
                    1 - p,
                    3
                  );

                el.textContent =
                  Math.round(
                    target *
                      eased
                  ) + suf;

                if (p < 1) {
                  requestAnimationFrame(
                    step
                  );
                }
              })(performance.now());
            }
          );
        },
        {
          threshold: 0.5
        }
      );

    stats.forEach(function (s) {
      io.observe(s);
    });
  }

  /* ------------------------------------------------------------------
     BOOT
     ------------------------------------------------------------------ */

  function boot() {
    initPreloader();
    initHeader();
    initScrollspy();
    initTyping();
    initReveal();
    initSkills();
    initProjects();
    initTilt();
    initModal();
    initContact();
    initCustomCursor();
    initMarquee();
    initCounters();
  }

  if (
    document.readyState ===
    'loading'
  ) {
    document.addEventListener(
      'DOMContentLoaded',
      boot
    );
  } else {
    boot();
  }
})();
