// ═══════════════════════════════════════════════════════════
// LIGHT TOWER ILLUMINATION  —  Motion Engine  v5 (Final)
// ═══════════════════════════════════════════════════════════
//
// Performance architecture:
//  • ZERO non-passive listeners — browser compositor owns scrolling
//  • ALL layout reads (offsetTop/Height) cached, never in scroll loops
//  • Canvas: alpha:false, no per-frame gradients, async image decode
//  • IntersectionObserver for everything visibility-based
//  • will-change promoted on interact, demoted on leave
//  • Particle glow effects removed (radialGradient per frame = expensive)
//  • requestIdleCallback for deferred frame loading
//
// ═══════════════════════════════════════════════════════════

const _ric = window.requestIdleCallback ||
    (cb => setTimeout(() => cb({ timeRemaining: () => 50 }), 1));

const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window && window.innerWidth <= 1024);
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ───────────────────────────────────────
// 0. PRELOADER
// ───────────────────────────────────────
class PreloaderManager {
    constructor(essentialCount) {
        this.ess = essentialCount;
        this.done = false;
        this.fill = document.querySelector('.preloader-fill');
        this.el = document.getElementById('preloader');

        if (this.fill) {
            this.fill.style.animation = 'none';
            this.fill.style.width = '0%';
            this.fill.style.transition = 'width 0.15s linear';
        }

        this._fs = setTimeout(() => this.complete(), 2500);
    }

    update(n) {
        if (this.done) return;
        if (this.fill) this.fill.style.width = Math.min(100, (n / this.ess) * 100) + '%';
        if (n >= this.ess) this.complete();
    }

    complete() {
        if (this.done) return;
        this.done = true;
        clearTimeout(this._fs);
        if (this.fill) this.fill.style.width = '100%';
        setTimeout(() => {
            if (!this.el) return;
            this.el.style.transition = 'opacity 0.4s ease';
            this.el.style.opacity = '0';
            this.el.style.pointerEvents = 'none';
            setTimeout(() => { if (this.el) this.el.style.display = 'none'; }, 450);
        }, 120);
    }
}

// ───────────────────────────────────────
// 1. FRAME SEQUENCE (Apple-style scroll-driven hero)
// ───────────────────────────────────────
class FrameSequence {
    constructor(preloader) {
        this.canvas = document.getElementById('hero-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d', { alpha: false });
        this.hero = document.querySelector('.hero-content');
        this.section = document.getElementById('hero-sequence');

        this.TOTAL = 76;
        this.imgs = new Array(this.TOTAL).fill(null);
        this.cur = -1;
        this.ticking = false;
        this.textShown = false;
        this.preloader = preloader;

        // Cached layout — zero reflow in scroll loop
        this.secTop = 0;
        this.scrollable = 1;
        this.cw = 0;
        this.ch = 0;

        this._init();
    }

    _init() {
        this._cacheLayout();
        this._resize();

        let lastW = window.innerWidth;
        window.addEventListener('resize', () => {
            if (window.innerWidth !== lastW) {
                lastW = window.innerWidth;
                this._cacheLayout();
                this._resize();
            }
        }, { passive: true });

        if (prefersReducedMotion || isMobile) {
            const img = new Image();
            img.onload = () => {
                this.imgs[0] = img;
                this.cur = 0;
                this._paint(img);
                this.preloader?.complete();
                if (this.hero) this.hero.classList.add('visible');
            };
            img.src = 'scroll%20animation/frame-001.webp';
            return;
        }

        // Load essential frames (1-15) eagerly
        const ESS = 15;
        let loaded = 0;
        for (let i = 0; i < ESS; i++) {
            this._load(i, img => {
                if (i === 0) this._paint(img);
                loaded++;
                this.preloader?.update(loaded);
            });
        }

        // Load remaining frames in idle time
        _ric(() => {
            for (let i = ESS; i < this.TOTAL; i++) this._load(i);
        });

        // PASSIVE scroll — never blocks compositor
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                this.ticking = true;
                requestAnimationFrame(() => { this._update(); this.ticking = false; });
            }
        }, { passive: true });
    }

    _load(i, cb) {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => { this.imgs[i] = img; if (cb) cb(img); };
        img.src = `scroll%20animation/frame-${String(i + 1).padStart(3, '0')}.webp`;
    }

    _cacheLayout() {
        if (!this.section) return;
        this.secTop = this.section.offsetTop;
        this.scrollable = Math.max(1, this.section.offsetHeight - window.innerHeight);
    }

    _resize() {
        this.cw = this.canvas.width = window.innerWidth;
        this.ch = this.canvas.height = isMobile ? window.innerWidth * (1080 / 1920) : window.innerHeight;
        if (this.cur >= 0 && this.imgs[this.cur]) this._paint(this.imgs[this.cur]);
    }

    _update() {
        const y = window.scrollY;
        const progress = Math.max(0, Math.min(1, (y - this.secTop) / this.scrollable));
        let want = Math.min(this.TOTAL - 1, (progress * (this.TOTAL - 1)) | 0);

        // Find nearest loaded frame (±4 search)
        if (!this.imgs[want]) {
            for (let d = 1; d <= 4; d++) {
                if (want - d >= 0 && this.imgs[want - d]) { want -= d; break; }
                if (want + d < this.TOTAL && this.imgs[want + d]) { want += d; break; }
            }
        }

        if (want !== this.cur && this.imgs[want]) {
            this.cur = want;
            this._paint(this.imgs[want]);
        }

        // Hero text reveal
        if (this.hero) {
            if (progress >= 0.78 && !this.textShown) {
                this.textShown = true;
                this.hero.classList.add('visible');
            } else if (progress < 0.74 && this.textShown) {
                this.textShown = false;
                this.hero.classList.remove('visible');
            }
        }
    }

    _paint(img) {
        if (!img || !img.complete) return;
        const scale = Math.max(this.cw / img.naturalWidth, this.ch / img.naturalHeight);
        const w = img.naturalWidth * scale;
        const h = img.naturalHeight * scale;
        this.ctx.drawImage(img, (this.cw - w) * 0.5, (this.ch - h) * 0.5, w, h);
    }
}

// ───────────────────────────────────────
// 2. PARTICLES (lightweight — no radial gradients)
// ───────────────────────────────────────
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('hero-particles');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.N = isMobile ? 15 : 45;
        this.pts = [];
        this.on = true;
        this.raf = 0;
        this._init();
    }

    _init() {
        this._sz();
        let lastW = window.innerWidth;
        window.addEventListener('resize', () => {
            if (window.innerWidth !== lastW) { lastW = window.innerWidth; this._sz(); }
        }, { passive: true });

        for (let i = 0; i < this.N; i++) this.pts.push(this._mk(true));

        document.addEventListener('visibilitychange', () => {
            this.on = !document.hidden;
            if (this.on) this._loop();
        });

        // Pause when hero leaves viewport
        const hero = document.getElementById('hero-sequence');
        if (hero) {
            new IntersectionObserver(([e]) => {
                this.on = e.isIntersecting && !document.hidden;
                if (this.on) this._loop();
                else if (this.raf) { cancelAnimationFrame(this.raf); this.raf = 0; }
            }, { rootMargin: '100px' }).observe(hero);
        }

        this._loop();
    }

    _sz() { this.canvas.width = window.innerWidth; this.canvas.height = window.innerHeight; }

    _mk(spread) {
        const C = ['212,160,23', '0,212,255', '157,78,221', '255,0,127'];
        return {
            x: Math.random() * this.canvas.width,
            y: spread ? Math.random() * this.canvas.height : this.canvas.height + 4,
            r: Math.random() * 1.4 + 0.3,
            vy: -(Math.random() * 0.28 + 0.06),
            vx: (Math.random() - 0.5) * 0.14,
            o: Math.random() * 0.45 + 0.1,
            ph: Math.random() * 6.28,
            sp: Math.random() * 0.01 + 0.003,
            c: C[(Math.random() * 4) | 0]
        };
    }

    _loop() {
        if (!this.on) return;
        const W = this.canvas.width, H = this.canvas.height;
        this.ctx.clearRect(0, 0, W, H);
        for (let i = 0; i < this.pts.length; i++) {
            const p = this.pts[i];
            p.ph += p.sp;
            const a = p.o * (0.5 + 0.5 * Math.sin(p.ph));
            this.ctx.globalAlpha = a;
            this.ctx.fillStyle = `rgb(${p.c})`;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.r, 0, 6.28);
            this.ctx.fill();
            p.x += p.vx;
            p.y += p.vy;
            if (p.y < -4 || p.x < -4 || p.x > W + 4) this.pts[i] = this._mk(false);
        }
        this.ctx.globalAlpha = 1;
        this.raf = requestAnimationFrame(() => this._loop());
    }
}

// ───────────────────────────────────────
// 3. SCROLL REVEAL
// ───────────────────────────────────────
class ScrollReveal {
    constructor() {
        const V = {
            'fade-up': 'translateY(24px)',
            'fade-down': 'translateY(-24px)',
            'fade-left': 'translateX(32px)',
            'fade-right': 'translateX(-32px)',
            'scale-up': 'scale(0.94)',
            'scale-down': 'scale(1.06)'
        };

        const els = document.querySelectorAll('[data-reveal]');

        els.forEach(el => {
            const key = el.dataset.reveal || 'fade-up';
            const dur = +(el.dataset.duration || 500);
            const del = +(el.dataset.delay || 0);
            const clip = key === 'clip-reveal';

            el.style.opacity = '0';
            if (clip) {
                el.style.clipPath = 'inset(0 100% 0 0)';
                el.style.transition = `clip-path ${dur}ms var(--ease-out-expo) ${del}ms, opacity ${dur}ms ease ${del}ms`;
            } else {
                el.style.transform = V[key] || 'translateY(24px)';
                el.style.transition = `transform ${dur}ms var(--ease-out-expo) ${del}ms, opacity ${dur}ms ease ${del}ms`;
            }
        });

        const obs = new IntersectionObserver(entries => {
            for (let i = 0; i < entries.length; i++) {
                const e = entries[i];
                if (!e.isIntersecting) continue;
                const el = e.target;
                const clip = el.dataset.reveal === 'clip-reveal';
                if (clip) el.style.clipPath = 'inset(0 0% 0 0)';
                else el.style.transform = 'none';
                el.style.opacity = '1';
                el.classList.add('revealed');
                obs.unobserve(el);
            }
        }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

        els.forEach(el => obs.observe(el));
    }
}

// ───────────────────────────────────────
// 4. KINETIC TEXT — recursive word split preserving gradient spans
// ───────────────────────────────────────
class KineticText {
    constructor(sel, opts = {}) {
        this.stagger = opts.stagger || 35;
        this.delay = opts.delay || 0;
        this.mode = opts.triggerMode || 'intersect';
        document.querySelectorAll(sel).forEach(el => this._split(el));
    }

    _split(el) {
        el.setAttribute('aria-label', el.textContent);
        let idx = 0;
        const words = [];

        const walk = node => {
            if (node.nodeType === 3) {
                const frag = document.createDocumentFragment();
                let isAccent = false, isLight = false, isDark = false;
                let p = node.parentNode;
                while (p && p !== el) {
                    if (p.classList.contains('accent')) isAccent = true;
                    if (p.classList.contains('light')) isLight = true;
                    if (p.classList.contains('dark')) isDark = true;
                    p = p.parentNode;
                }

                node.textContent.split(/(\s+)/).forEach(part => {
                    if (!part.trim()) {
                        frag.appendChild(document.createTextNode(part));
                    } else {
                        const outer = document.createElement('span');
                        outer.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:bottom';
                        const inner = document.createElement('span');
                        inner.textContent = part;
                        const d = this.delay + idx * this.stagger;
                        inner.style.cssText = `display:inline-block;transform:translateY(110%);opacity:0;transition:transform .7s var(--ease-out-expo) ${d}ms,opacity .45s ease ${d}ms`;
                        
                        if (isAccent) inner.classList.add('accent');
                        if (isLight) inner.classList.add('light');
                        if (isDark) inner.classList.add('dark');

                        outer.appendChild(inner);
                        frag.appendChild(outer);
                        words.push(inner);
                        idx++;
                    }
                });
                node.parentNode.replaceChild(frag, node);
            } else if (node.nodeType === 1) {
                [...node.childNodes].forEach(walk);
            }
        };
        [...el.childNodes].forEach(walk);

        const reveal = () => words.forEach(w => {
            w.style.transform = 'translateY(0)';
            w.style.opacity = '1';
        });

        if (this.mode === 'visible') {
            const parent = el.closest('.hero-content') || el;
            if (parent.classList.contains('visible')) { reveal(); return; }
            new MutationObserver((_, mo) => {
                if (parent.classList.contains('visible')) { reveal(); mo.disconnect(); }
            }).observe(parent, { attributes: true, attributeFilter: ['class'] });
        } else {
            new IntersectionObserver(([e], obs) => {
                if (e.isIntersecting) { reveal(); obs.unobserve(el); }
            }, { threshold: 0.1 }).observe(el);
        }
    }
}

// ───────────────────────────────────────
// 5. COUNTER ANIMATION
// ───────────────────────────────────────
class CounterAnimation {
    constructor() {
        const obs = new IntersectionObserver(entries => {
            for (let i = 0; i < entries.length; i++) {
                if (!entries[i].isIntersecting) continue;
                this._run(entries[i].target);
                obs.unobserve(entries[i].target);
            }
        }, { threshold: 0.5 });

        document.querySelectorAll('[data-counter]').forEach(el => obs.observe(el));
    }

    _run(el) {
        const target = +el.dataset.counter;
        const suf = el.dataset.suffix || '';
        const dur = 1500;
        const t0 = performance.now();
        const tick = now => {
            const p = Math.min(1, (now - t0) / dur);
            el.textContent = Math.round(target * (1 - Math.pow(2, -10 * p))) + suf;
            if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }
}

// ───────────────────────────────────────
// 6. CURSOR
// ───────────────────────────────────────
class CinematicCursor {
    constructor() {
        if (isMobile) return;
        this.dot = document.querySelector('.cursor-dot');
        this.ring = document.querySelector('.cursor-ring');
        if (!this.dot || !this.ring) return;

        let mx = 0, my = 0, rx = 0, ry = 0;

        window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });

        document.querySelectorAll('a, button, .glass, .service-card, .founder-card').forEach(el => {
            el.addEventListener('mouseenter', () => { this.ring.classList.add('hover'); this.dot.style.opacity = '0'; });
            el.addEventListener('mouseleave', () => { this.ring.classList.remove('hover'); this.dot.style.opacity = '1'; });
        });

        const loop = () => {
            rx += (mx - rx) * 0.11;
            ry += (my - ry) * 0.11;
            this.dot.style.transform = `translate3d(${mx - 3}px,${my - 3}px,0)`;
            this.ring.style.transform = `translate3d(${rx - 19}px,${ry - 19}px,0)`;
            requestAnimationFrame(loop);
        };
        loop();
    }
}

// ───────────────────────────────────────
// 7. MAGNETIC BUTTONS
// ───────────────────────────────────────
class MagneticButtons {
    constructor() {
        if (isMobile) return;
        document.querySelectorAll('.btn').forEach(el => {
            let raf = 0, lx = 0, ly = 0;

            el.addEventListener('mousemove', e => {
                lx = e.clientX; ly = e.clientY;
                if (raf) return;
                raf = requestAnimationFrame(() => {
                    raf = 0;
                    const r = el.getBoundingClientRect();
                    const dx = (lx - r.left - r.width * 0.5) * 0.2;
                    const dy = (ly - r.top - r.height * 0.5) * 0.2;
                    el.style.transform = `translate3d(${dx}px,${dy}px,0) scale(1.03)`;
                    el.style.transition = 'transform 0.18s ease';
                });
            }, { passive: true });

            el.addEventListener('mouseleave', () => {
                if (raf) { cancelAnimationFrame(raf); raf = 0; }
                el.style.transform = '';
                el.style.transition = 'transform 0.5s var(--ease-spring)';
            });
        });
    }
}

// ───────────────────────────────────────
// 8. TILT CARDS (will-change managed dynamically)
// ───────────────────────────────────────
class TiltCards {
    constructor() {
        if (isMobile || prefersReducedMotion) return;

        document.querySelectorAll('.glass, .founder-card, .service-card, .stat-card').forEach(card => {
            let raf = 0, bounds = null, lx = 0, ly = 0;

            card.addEventListener('mouseenter', () => {
                bounds = card.getBoundingClientRect();
                card.classList.add('tilting');
            }, { passive: true });

            card.addEventListener('mousemove', e => {
                lx = e.clientX; ly = e.clientY;
                if (raf) return;
                raf = requestAnimationFrame(() => {
                    raf = 0;
                    if (!bounds) return;
                    const x = (lx - bounds.left) / bounds.width;
                    const y = (ly - bounds.top) / bounds.height;
                    card.style.transform = `perspective(900px) rotateX(${(y - 0.5) * -5}deg) rotateY(${(x - 0.5) * 5}deg) scale(1.01)`;
                    card.style.setProperty('--mouse-x', `${lx - bounds.left}px`);
                    card.style.setProperty('--mouse-y', `${ly - bounds.top}px`);
                });
            }, { passive: true });

            card.addEventListener('mouseleave', () => {
                if (raf) { cancelAnimationFrame(raf); raf = 0; }
                bounds = null;
                card.classList.remove('tilting');
                card.style.transform = '';
            }, { passive: true });
        });
    }
}

// ───────────────────────────────────────
// 9. HAMBURGER
// ───────────────────────────────────────
class HamburgerMenu {
    constructor() {
        const btn = document.getElementById('hamburger');
        const menu = document.getElementById('mobile-menu');
        if (!btn || !menu) return;

        const close = () => { btn.classList.remove('active'); menu.classList.remove('open'); document.body.style.overflow = ''; };

        btn.addEventListener('click', () => {
            const open = menu.classList.toggle('open');
            btn.classList.toggle('active', open);
            document.body.style.overflow = open ? 'hidden' : '';
        });

        menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
        document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    }
}

// ───────────────────────────────────────
// 10. NAV CONTROLLER (cached layout, zero reflow)
// ───────────────────────────────────────
class NavController {
    constructor() {
        this.nav = document.querySelector('.navbar');
        this.bar = document.querySelector('.scroll-progress');
        this.btt = document.querySelector('.back-to-top');
        this.links = document.querySelectorAll('.nav-link');
        this.ticking = false;

        this._heroH = 2000;
        this._maxY = 1;
        this._secs = [];

        // Cache after images settle
        setTimeout(() => this._cache(), 200);
        window.addEventListener('resize', () => this._cache(), { passive: true });
        window.addEventListener('load', () => this._cache());

        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                this.ticking = true;
                requestAnimationFrame(() => { this._tick(); this.ticking = false; });
            }
        }, { passive: true });

        this.btt?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                e.preventDefault();
                document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    _cache() {
        this._heroH = document.getElementById('hero-sequence')?.offsetHeight || 2000;
        this._maxY = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        this._secs = [...document.querySelectorAll('section[id]')].map(s => ({
            id: s.id,
            top: s.offsetTop - 160,
            btm: s.offsetTop - 160 + s.offsetHeight
        }));
    }

    _tick() {
        const y = window.scrollY;

        if (this.bar) this.bar.style.width = (y / this._maxY * 100) + '%';

        const past = y > this._heroH - window.innerHeight * 0.5;
        if (this.nav) {
            this.nav.classList.toggle('show-nav', past);
            this.nav.classList.toggle('scrolled', past);
        }

        if (this.btt) this.btt.classList.toggle('visible', y > this._maxY * 0.25);

        for (let i = 0; i < this._secs.length; i++) {
            const s = this._secs[i];
            if (y >= s.top && y < s.btm) {
                this.links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + s.id));
            }
        }
    }
}

// ───────────────────────────────────────
// INIT
// ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const loader = new PreloaderManager(15);
    new FrameSequence(loader);

    if (!prefersReducedMotion) {
        new ParticleSystem();
        new KineticText('.hero-ref-title', { stagger: 38, delay: 150, triggerMode: 'visible' });
        new KineticText('.hero-ref-sub', { stagger: 18, delay: 600, triggerMode: 'visible' });
        new KineticText('.kinetic-section', { stagger: 28, delay: 30 });
    }

    new ScrollReveal();
    new CounterAnimation();
    new CinematicCursor();
    new MagneticButtons();
    new TiltCards();
    new HamburgerMenu();
    new NavController();
});
