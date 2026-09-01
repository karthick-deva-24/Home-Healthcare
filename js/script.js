document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Logic
  

  // Header Scroll Effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }

  // Initialize Swiper (if present on page)
  if (typeof Swiper !== 'undefined') {
    const heroSwiper = new Swiper('.hero-swiper', {
      effect: 'fade',
      fadeEffect: { crossFade: true },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });

    const testiSwiper = new Swiper('.testi-swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
      pagination: {
        el: '.testi-pagination',
        clickable: true,
      }
    });
  }

  // GSAP Animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // 3D Image Hover Effect Setup
    const hover3dItems = document.querySelectorAll('.hover-3d');
    
    hover3dItems.forEach(item => {
      item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = x / rect.width - 0.5;
        const yPercent = y / rect.height - 0.5;
        
        gsap.to(item, {
          duration: 0.5,
          rotationY: xPercent * 20, // max 20deg
          rotationX: -yPercent * 20, // max 20deg
          ease: 'power1.out',
          transformPerspective: 1000,
          transformOrigin: 'center'
        });
      });
      
      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          duration: 0.5,
          rotationY: 0,
          rotationX: 0,
          ease: 'power3.out'
        });
      });
    });

    // Advanced GSAP Animations
    
    // 1. Footer Reveal
    const footerEl = document.querySelector('footer');
    if (footerEl) {
      gsap.from(footerEl.children, {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        scrollTrigger: {
          trigger: footerEl,
          start: "top 95%"
        }
      });
    }

    // 2. Text Split Animation
    const splitTitles = document.querySelectorAll('.section-title h2, .section-title h3');
    splitTitles.forEach(title => {
      const text = title.innerText;
      title.innerHTML = '';
      text.split(' ').forEach((word, i) => {
        const span = document.createElement('span');
        span.style.display = 'inline-block';
        span.style.overflow = 'hidden';
        span.style.marginRight = '8px';
        const innerSpan = document.createElement('span');
        innerSpan.innerText = word;
        innerSpan.style.display = 'inline-block';
        span.appendChild(innerSpan);
        title.appendChild(span);
        
        gsap.from(innerSpan, {
          y: '100%',
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: title,
            start: "top 85%"
          }
        });
      });
    });

    // 3. Image Mask Reveal
    const maskImages = document.querySelectorAll('.about-img img, .page-banner');
    maskImages.forEach(img => {
      gsap.fromTo(img, 
        { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
        { 
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: img,
            start: "top 85%"
          }
        }
      );
    });

    // 4. Floating Blobs
    gsap.to('.blob', {
      y: "random(-30, 30)",
      x: "random(-30, 30)",
      duration: "random(3, 5)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // 5. Magnetic Buttons & Ripple
    const magneticBtns = document.querySelectorAll('.btn');
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
        gsap.to(btn, { x: x, y: y, duration: 0.3 });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      });
      
      btn.addEventListener('click', function (e) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });

    // 6. Custom Cursor
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    if (window.innerWidth > 991) {
      gsap.set(cursor, {xPercent: -50, yPercent: -50});
      let xTo = gsap.quickTo(cursor, "x", {duration: 0.1, ease: "power3"});
      let yTo = gsap.quickTo(cursor, "y", {duration: 0.1, ease: "power3"});
      
      window.addEventListener("mousemove", e => {
        xTo(e.clientX);
        yTo(e.clientY);
      });

      document.querySelectorAll('a, button, .btn, .hover-3d, .bento-item').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
      });
    }

    // 7. Hero Stagger Reveal
    const heroContent = document.querySelectorAll('.hero-content h1, .hero-content p, .hero-content .btn');
    if (heroContent.length > 0) {
      gsap.from(heroContent, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.1
      });
    }

    // Simple scroll reveal fallback with GSAP
    gsap.utils.toArray('.gsap-reveal').forEach(element => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      });
    });
  }

  // Number Counter Animation
  const counters = document.querySelectorAll('.counter');
  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        // Adjust speed by dividing target by a fixed number
        const inc = target / 50; 
        
        if (count < target) {
          counter.innerText = Math.ceil(count + inc);
          setTimeout(updateCount, 30); // 30ms delay
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  if (counters.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    // observe the parent container
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }
  }
});
document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Hard-inject login button if it doesn't exist
    if (navLinks && !navLinks.querySelector('.mobile-login-btn')) {
        const loginLnk = document.createElement('a');
        loginLnk.href = 'login.html';
        loginLnk.className = 'btn btn-primary mobile-login-btn';
        loginLnk.innerText = 'Login';
        navLinks.appendChild(loginLnk);
    }
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            
            if (navLinks.classList.contains('active')) {
                if (icon) { icon.className = 'fa-solid fa-times'; }
                
                
            } else {
                if (icon) { icon.className = 'fa-solid fa-bars'; }
                
                
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    // 1. Universal Form Validation & 404 Redirection
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        // Force all standard inputs to be required
        form.querySelectorAll('input:not([type="checkbox"]):not([type="submit"]):not([type="button"]), textarea, select').forEach(input => {
            input.setAttribute('required', 'true');
        });
        
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop native submit
            
            if (form.checkValidity()) {
                // Provide minor feedback then redirect
                const btn = form.querySelector('button[type="submit"]');
                if(btn) {
                  const originalText = btn.innerText;
                  btn.innerText = 'Processing...';
                  btn.style.opacity = '0.8';
                }
                setTimeout(() => {
                    window.location.href = '404.html';
                }, 800);
            } else {
                form.reportValidity();
            }
        });
    });

    // 2. Global Content Link Redirection to 404
    document.querySelectorAll('a').forEach(link => {
        const isInHeader = link.closest('header');
        const isInFooter = link.closest('footer');
        const isSidebar = link.closest('.sidebar');
        const isDashboardHeader = link.closest('.dashboard-header');
        const isAuthLayout = link.closest('.split-layout');
        
        // If it's NOT in the navbar, footer, dashboard menus, or auth layout
        if (!isInHeader && !isInFooter && !isSidebar && !isDashboardHeader && !isAuthLayout) {
            // Ignore anchors that are just javascript toggles
            if (link.getAttribute('href') !== '#') {
                link.href = '404.html';
            }
        }
    });
    // 3. Dynamic Profile Update from LocalStorage
    const storedEmail = localStorage.getItem('auth_email');
    const storedRole = localStorage.getItem('auth_role');
    const storedName = localStorage.getItem('auth_name');

    if (storedEmail && document.querySelector('.user-profile')) {
        const avatar = document.querySelector('.profile-avatar');
        if (avatar) {
            const displayChar = storedName ? storedName.charAt(0).toUpperCase() : storedEmail.charAt(0).toUpperCase();
            avatar.innerText = displayChar;
        }
        
        const nameEls = document.querySelectorAll('.user-profile h5');
        nameEls.forEach(el => {
            el.innerText = storedName ? (storedName.charAt(0).toUpperCase() + storedName.slice(1)) : 'User';
        });

        const emailEls = document.querySelectorAll('.user-profile small:nth-of-type(1)');
        emailEls.forEach(el => { el.innerText = storedEmail; });

        const roleEls = document.querySelectorAll('.user-profile small:nth-of-type(2)');
        roleEls.forEach(el => {
            el.innerText = storedRole === 'admin' ? 'Administrator' : 'Patient / Family';
        });
    }
});
