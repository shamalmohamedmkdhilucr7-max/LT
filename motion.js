// ═══════════════════════════════════════
// LIGHT TOWER ILLUMINATION — Motion Engine
// ═══════════════════════════════════════

const isMobile = window.innerWidth <= 768;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── PRELOADER ───
window.addEventListener('load', () => {
    setTimeout(() => {
        const p = document.getElementById('preloader');
        if (p) { p.style.opacity = '0'; p.style.pointerEvents = 'none'; }
    }, 2200);
});

// ─── 1. SCROLL-DRIVEN IMAGE SEQUENCE (Apple-style) ───
class FrameSequence {
    constructor() {
        this.canvas = document.getElementById('hero-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.heroContent = document.querySelector('.hero-content');
        this.frameCount = 151;
        this.images = [];
        this.loaded = 0;
        this.currentFrame = 0;
        this.textShown = false;
        this.init();
    }
    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        for (let i = 1; i <= this.frameCount; i++) {
            const img = new Image();
            img.src = `scroll%20animation/ezgif-frame-${String(i).padStart(3, '0')}.png`;
            img.onload = () => {
                this.loaded++;
                if (this.loaded === 1) this.drawFrame(0);
            };
            this.images.push(img);
        }
        window.addEventListener('scroll', () => this.onScroll(), { passive: true });
    }
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.drawFrame(this.currentFrame);
    }
    onScroll() {
        const section = document.getElementById('hero-sequence');
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const scrollable = section.offsetHeight - window.innerHeight;
        const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
        const frameIndex = Math.min(this.frameCount - 1, Math.floor(progress * (this.frameCount - 1)));
        if (frameIndex !== this.currentFrame) {
            this.currentFrame = frameIndex;
            this.drawFrame(frameIndex);
        }
        // Show hero text only after scroll animation is ~80% done
        if (this.heroContent) {
            if (progress >= 0.78 && !this.textShown) {
                this.heroContent.classList.add('visible');
                this.textShown = true;
            } else if (progress < 0.78 && this.textShown) {
                this.heroContent.classList.remove('visible');
                this.textShown = false;
            }
        }
    }
    drawFrame(index) {
        const img = this.images[index];
        if (!img || !img.complete || !this.ctx) return;
        const { width: cw, height: ch } = this.canvas;
        this.ctx.clearRect(0, 0, cw, ch);
        const scale = Math.max(cw / img.width, ch / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        this.ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    }
}

// ─── 2. PARTICLE SYSTEM (Multicolor ambient particles) ───
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('hero-particles');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.count = isMobile ? 30 : 80;
        this.particles = [];
        this.running = true;
        this.init();
    }
    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        for (let i = 0; i < this.count; i++) this.particles.push(this.create(true));
        document.addEventListener('visibilitychange', () => {
            this.running = !document.hidden;
            if (this.running) this.animate();
        });
        this.animate();
    }
    resize() { this.canvas.width = window.innerWidth; this.canvas.height = window.innerHeight; }
    create(random) {
        // RGB Colors matching theme: Warm Gold (212,160,23), Cyber Blue (0,212,255), Neon Purple (157,78,221), Electric Magenta (255,0,127)
        const colors = ['212,160,23', '0,212,255', '157,78,221', '255,0,127'];
        const chosenColor = colors[Math.floor(Math.random() * colors.length)];
        
        return {
            x: Math.random() * (this.canvas.width || window.innerWidth),
            y: random ? Math.random() * (this.canvas.height || window.innerHeight) : (this.canvas.height || window.innerHeight) + 10,
            size: Math.random() * 2.2 + 0.6,
            vy: -(Math.random() * 0.5 + 0.15),
            vx: (Math.random() - 0.5) * 0.25,
            opacity: Math.random() * 0.65 + 0.15,
            phase: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.015 + 0.005,
            color: chosenColor
        };
    }
    animate() {
        if (!this.running) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach((p, i) => {
            p.phase += p.speed;
            const o = p.opacity * (0.5 + 0.5 * Math.sin(p.phase));
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${p.color},${o})`;
            this.ctx.fill();
            
            // Subtle aura glow around larger particles
            if (p.size > 1.5) {
                const g = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 5);
                g.addColorStop(0, `rgba(${p.color},${o * 0.25})`);
                g.addColorStop(1, 'rgba(0,0,0,0)');
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size * 5, 0, Math.PI * 2);
                this.ctx.fillStyle = g;
                this.ctx.fill();
            }
            
            p.y += p.vy; p.x += p.vx;
            if (p.y < -10 || p.x < -10 || p.x > this.canvas.width + 10)
                this.particles[i] = this.create(false);
        });
        requestAnimationFrame(() => this.animate());
    }
}

// ─── 3. SCROLL REVEAL ENGINE ───
class ScrollReveal {
    constructor() {
        this.variants = {
            'fade-up':    { hidden: 'translateY(48px)',  visible: 'translateY(0)' },
            'fade-down':  { hidden: 'translateY(-48px)', visible: 'translateY(0)' },
            'fade-left':  { hidden: 'translateX(64px)',  visible: 'translateX(0)' },
            'fade-right': { hidden: 'translateX(-64px)', visible: 'translateX(0)' },
            'scale-up':   { hidden: 'scale(0.88)',       visible: 'scale(1)' },
            'scale-down': { hidden: 'scale(1.12)',       visible: 'scale(1)' },
            'clip-reveal':{ hidden: null, visible: null, clip: true }
        };
        this.init();
    }
    init() {
        const els = document.querySelectorAll('[data-reveal]');
        els.forEach(el => {
            const v = el.dataset.reveal || 'fade-up';
            const delay = parseFloat(el.dataset.delay || 0);
            const duration = parseFloat(el.dataset.duration || 800);
            const anim = this.variants[v];
            if (!anim) return;
            if (anim.clip) {
                el.style.clipPath = 'inset(0 100% 0 0)';
            } else {
                el.style.transform = anim.hidden;
            }
            el.style.opacity = '0';
            el.style.transition = `transform ${duration}ms var(--ease-out-expo) ${delay}ms, opacity ${duration}ms var(--ease-out-expo) ${delay}ms, clip-path ${duration}ms var(--ease-out-expo) ${delay}ms`;
        });
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const v = el.dataset.reveal || 'fade-up';
                    const anim = this.variants[v];
                    if (anim) {
                        if (anim.clip) { el.style.clipPath = 'inset(0 0% 0 0)'; }
                        else { el.style.transform = anim.visible; }
                        el.style.opacity = '1';
                    }
                    el.classList.add('revealed');
                    obs.unobserve(el);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
        els.forEach(el => obs.observe(el));
    }
}

// ─── 4. KINETIC TEXT ───
class KineticText {
    constructor(selector, opts = {}) {
        this.stagger = opts.stagger || 40;
        this.delay = opts.delay || 0;
        document.querySelectorAll(selector).forEach(el => this.split(el));
    }
    split(el) {
        const text = el.textContent;
        const words = text.split(' ');
        el.innerHTML = '';
        el.setAttribute('aria-label', text);
        const spans = [];
        words.forEach((word, i) => {
            const wrapper = document.createElement('span');
            wrapper.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:bottom;';
            const inner = document.createElement('span');
            inner.textContent = word + '\u00A0';
            inner.style.cssText = `display:inline-block;transform:translateY(110%);opacity:0;transition:transform 0.9s var(--ease-out-expo) ${this.delay + i * this.stagger}ms, opacity 0.6s ease ${this.delay + i * this.stagger}ms;will-change:transform;`;
            wrapper.appendChild(inner);
            el.appendChild(wrapper);
            spans.push(inner);
        });
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                spans.forEach(s => { s.style.transform = 'translateY(0)'; s.style.opacity = '1'; });
                obs.unobserve(el);
            }
        }, { threshold: 0.3 });
        obs.observe(el);
    }
}

// ─── 5. COUNTER ANIMATION ───
class CounterAnimation {
    constructor() {
        const counters = document.querySelectorAll('[data-counter]');
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { this.animate(entry.target); obs.unobserve(entry.target); }
            });
        }, { threshold: 0.5 });
        counters.forEach(el => obs.observe(el));
    }
    animate(el) {
        const target = parseFloat(el.dataset.counter);
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const start = performance.now();
        const easeOut = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            el.textContent = Math.round(target * easeOut(p)) + suffix;
            if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }
}

// ─── 6. CINEMATIC CURSOR ───
class CinematicCursor {
    constructor() {
        if (isMobile) return;
        this.dot = document.querySelector('.cursor-dot');
        this.ring = document.querySelector('.cursor-ring');
        if (!this.dot || !this.ring) return;
        this.mx = 0; this.my = 0; this.rx = 0; this.ry = 0;
        window.addEventListener('mousemove', e => { this.mx = e.clientX; this.my = e.clientY; });
        document.querySelectorAll('a, button, [data-cursor], .glass, .service-card, .portfolio-card').forEach(el => {
            el.addEventListener('mouseenter', () => { this.ring.classList.add('hover'); this.dot.style.opacity = '0'; });
            el.addEventListener('mouseleave', () => { this.ring.classList.remove('hover'); this.dot.style.opacity = '1'; });
        });
        this.loop();
    }
    loop() {
        this.rx += (this.mx - this.rx) * 0.12;
        this.ry += (this.my - this.ry) * 0.12;
        this.dot.style.left = this.mx + 'px'; this.dot.style.top = this.my + 'px';
        this.ring.style.left = this.rx + 'px'; this.ring.style.top = this.ry + 'px';
        requestAnimationFrame(() => this.loop());
    }
}

// ─── 7. MAGNETIC BUTTONS ───
class MagneticButtons {
    constructor() {
        if (isMobile) return;
        document.querySelectorAll('.btn').forEach(el => {
            el.addEventListener('mousemove', e => {
                const r = el.getBoundingClientRect();
                const dx = (e.clientX - r.left - r.width / 2) * 0.25;
                const dy = (e.clientY - r.top - r.height / 2) * 0.25;
                el.style.transform = `translate(${dx}px, ${dy}px) scale(1.04)`;
                el.style.transition = 'transform 0.2s var(--ease-out-smooth)';
            });
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0,0) scale(1)';
                el.style.transition = 'transform 0.7s var(--ease-spring)';
            });
        });
    }
}

// ─── 8. TILT CARDS & GLOW SHINE ───
class TiltCards {
    constructor() {
        if (isMobile) return;
        document.querySelectorAll('.glass, .portfolio-card, .service-card, .stat-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const r = card.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width;
                const y = (e.clientY - r.top) / r.height;
                const tiltX = (y - 0.5) * -7;
                const tiltY = (x - 0.5) * 7;
                card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.01)`;
                card.style.transition = 'transform 0.1s ease';
                
                // Expose mouse coordinate relative to card for gradient glow reflection in CSS
                const px = (e.clientX - r.left);
                const py = (e.clientY - r.top);
                card.style.setProperty('--mouse-x', `${px}px`);
                card.style.setProperty('--mouse-y', `${py}px`);
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
                card.style.transition = 'transform 0.8s var(--ease-spring)';
            });
        });
    }
}

// ─── 9. HAMBURGER MENU ───
class HamburgerMenu {
    constructor() {
        this.btn = document.getElementById('hamburger');
        this.menu = document.getElementById('mobile-menu');
        if (!this.btn || !this.menu) return;
        this.btn.addEventListener('click', () => this.toggle());
        this.menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => this.close());
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') this.close();
        });
    }
    toggle() {
        this.btn.classList.toggle('active');
        this.menu.classList.toggle('open');
        document.body.style.overflow = this.menu.classList.contains('open') ? 'hidden' : '';
    }
    close() {
        this.btn.classList.remove('active');
        this.menu.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// ─── 10. NAVBAR & SCROLL EFFECTS ───
class NavController {
    constructor() {
        this.nav = document.querySelector('.navbar');
        this.progress = document.querySelector('.scroll-progress');
        this.btt = document.querySelector('.back-to-top');
        this.lastScroll = 0;
        this.sections = document.querySelectorAll('section[id]');
        this.links = document.querySelectorAll('.nav-link');
        window.addEventListener('scroll', () => this.onScroll(), { passive: true });
        if (this.btt) this.btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                e.preventDefault();
                const t = document.querySelector(a.getAttribute('href'));
                if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }
    onScroll() {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (this.progress) this.progress.style.width = (y / max * 100) + '%';
        if (this.nav) {
            const heroHeight = document.getElementById('hero-sequence')?.offsetHeight || 2000;
            if (y > heroHeight - window.innerHeight * 0.5) {
                this.nav.classList.add('show-nav');
                this.nav.classList.add('scrolled');
            } else {
                this.nav.classList.remove('show-nav');
                this.nav.classList.remove('scrolled');
            }
        }
        this.lastScroll = y;
        if (this.btt) {
            if (y > max * 0.3) this.btt.classList.add('visible');
            else this.btt.classList.remove('visible');
        }
        this.sections.forEach(sec => {
            const top = sec.offsetTop - 200;
            const bottom = top + sec.offsetHeight;
            if (y >= top && y < bottom) {
                this.links.forEach(l => {
                    l.classList.toggle('active', l.getAttribute('href') === '#' + sec.id);
                });
            }
        });
    }
}

// ─── INIT ALL SYSTEMS ───
document.addEventListener('DOMContentLoaded', () => {
    new FrameSequence();
    if (!prefersReducedMotion) {
        new ParticleSystem();
        new KineticText('.kinetic-hero', { stagger: 60, delay: 500 });
        new KineticText('.kinetic-section', { stagger: 40, delay: 100 });
    }
    new ScrollReveal();
    new CounterAnimation();
    new CinematicCursor();
    new MagneticButtons();
    new TiltCards();
    new HamburgerMenu();
    new NavController();
});
