/* ════════════════════════════════════════════
   PRADNYA KAMBLE PORTFOLIO — script.js
   ════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── THEME TOGGLE (Light / Dark) ─── */
  const themeBtn  = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('pk-theme') || 'dark';

  function applyTheme(mode) {
    if (mode === 'light') {
      document.body.classList.add('light');
      themeBtn.textContent = '🌙';
      themeBtn.title = 'Switch to Dark Mode';
    } else {
      document.body.classList.remove('light');
      themeBtn.textContent = '☀️';
      themeBtn.title = 'Switch to Light Mode';
    }
    localStorage.setItem('pk-theme', mode);
  }

  applyTheme(savedTheme);

  themeBtn.addEventListener('click', () => {
    const isLight = document.body.classList.contains('light');
    applyTheme(isLight ? 'dark' : 'light');
  });

  /* ─── CURSOR GLOW ─── */
  const glow = document.getElementById('glow');
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });

  /* ─── SCROLL FADE ANIMATIONS ─── */
  const fadeEls = document.querySelectorAll('.fade');
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => fadeObserver.observe(el));

  /* ─── BACK TO TOP ─── */
  const backTop = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('show', window.scrollY > 400);
  });

  /* ─── HAMBURGER MOBILE MENU ─── */
  const ham = document.getElementById('hamburger');
  const mob = document.getElementById('mobileMenu');

  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    mob.classList.toggle('open');
    document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
  });

  document.querySelectorAll('#mobileMenu a').forEach(a => {
    a.addEventListener('click', () => {
      ham.classList.remove('open');
      mob.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ─── NAV ACTIVE STATE ON SCROLL ─── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 90) current = s.getAttribute('id');
    });
    navLinks.forEach(a => {
      const isActive = a.getAttribute('href') === '#' + current;
      a.style.color = isActive ? 'var(--rose)' : '';
    });
  });

  /* ─── RESUME DOWNLOAD ─── */
  const resumeBtn = document.getElementById('resumeBtn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', function (e) {
      /*
        TO ENABLE DOWNLOAD:
        1. Save your resume PDF as "Pradnya_Kamble_Resume.pdf"
           in the SAME folder as index.html
        2. Change fileExists = false → true below
      */
      const fileExists = false;
      if (!fileExists) {
        e.preventDefault();
        alert('📄 Resume download is being set up! Please contact me at pradnya.kamble.dev@gmail.com to get my resume.');
      }
    });
  }

  /* ─── CONTACT FORM — VALIDATION ─── */
  function getFormData() {
    return {
      name:    document.getElementById('f-name').value.trim(),
      email:   document.getElementById('f-email').value.trim(),
      mobile:  document.getElementById('f-mobile').value.trim(),
      subject: document.getElementById('f-subject').value,
      message: document.getElementById('f-message').value.trim(),
    };
  }

  function validateForm() {
    const { name, email, subject, message } = getFormData();
    let valid = true;

    // Clear previous errors
    document.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-error'));

    if (!name)
      { document.getElementById('fg-name').classList.add('has-error'); valid = false; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      { document.getElementById('fg-email').classList.add('has-error'); valid = false; }
    if (!subject)
      { document.getElementById('fg-subject').classList.add('has-error'); valid = false; }
    if (!message)
      { document.getElementById('fg-message').classList.add('has-error'); valid = false; }

    return valid;
  }

  function showSuccess() {
    const el = document.getElementById('f-success');
    el.style.display = 'block';
    setTimeout(() => el.style.display = 'none', 5000);
  }

  function clearForm() {
    ['f-name', 'f-email', 'f-mobile', 'f-message'].forEach(id => {
      document.getElementById(id).value = '';
    });
    document.getElementById('f-subject').value = '';
    document.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-error'));
  }

  /* ─── SEND VIA WHATSAPP ─── */
  window.sendWhatsApp = function () {
    if (!validateForm()) return;
    const { name, email, mobile, subject, message } = getFormData();

    const text = [
      `Hello Pradnya! 👋`,
      ``,
      `*New Message from Portfolio*`,
      `─────────────────────`,
      `*Name:*    ${name}`,
      `*Email:*   ${email}`,
      mobile ? `*Mobile:*  ${mobile}` : null,
      `*Subject:* ${subject}`,
      `─────────────────────`,
      `*Message:*`,
      message,
    ].filter(l => l !== null).join('\n');

    window.open(`https://wa.me/917039220530?text=${encodeURIComponent(text)}`, '_blank');
    showSuccess();
    clearForm();
  };

  /* ─── SEND VIA EMAIL ─── */
  window.sendEmail = function () {
    if (!validateForm()) return;
    const { name, email, mobile, subject, message } = getFormData();

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      mobile ? `Mobile: ${mobile}` : null,
      `Subject: ${subject}`,
      ``,
      `Message:`,
      message,
    ].filter(l => l !== null).join('\n');

    const sub = `[Portfolio Enquiry] ${subject} — from ${name}`;
    window.location.href =
      `mailto:pradnya.kamble.dev@gmail.com?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}`;
    showSuccess();
    clearForm();
  };

  /* ─── FLOATING LABEL FEEL (input focus effect) ─── */
  document.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(el => {
    el.addEventListener('focus', () => {
      el.closest('.form-group')?.classList.add('focused');
    });
    el.addEventListener('blur', () => {
      el.closest('.form-group')?.classList.remove('focused');
    });
  });

}); // end DOMContentLoaded
