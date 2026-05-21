// ═══════════════════════════════════════
// LIGHT TOWER ILLUMINATION — Motion Engine
// ═══════════════════════════════════════

const isMobile = window.innerWidth <= 768;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── PROGRESSIVE PRELOADER ───
class PreloaderManager {
    constructor(essentialCount, totalCount, onEssentialLoaded) {
        this.essentialCount = essentialCount;
        this.totalCount = totalCount;
        this.onEssentialLoaded = onEssentialLoaded;
        this.fill = document.querySelector('.preloader-fill');
        this.preloader = document.getElementById('preloader');
        this.isDone = false;
        
        if (this.fill) {
            this.fill.style.animation = 'none';
            this.fill.style.width = '0%';
        }
        
        // Failsafe timer (3.0 seconds)
        this.failsafe = setTimeout(() => {
            this.complete();
        }, 3000);
    }
    
    update(loadedCount) {
        if (this.isDone) return;
        const progress = Math.min(100, (loadedCount / this.essentialCount) * 100);
        if (this.fill) {
            this.fill.style.width = `${progress}%`;
        }
        if (loadedCount >= this.essentialCount) {
            this.complete();
        }
    }
    
    complete() {
        if (this.isDone) return;
        this.isDone = true;
        clearTimeout(this.failsafe);
        
        if (this.fill) this.fill.style.width = '100%';
        
        setTimeout(() => {
            if (this.preloader) {
                this.preloader.style.opacity = '0';
                this.preloader.style.pointerEvents = 'none';
                // Remove from layout after fade out to optimize render passes
                setTimeout(() => {
                    this.preloader.style.display = 'none';
                }, 1000);
            }
            if (this.onEssentialLoaded) {
                this.onEssentialLoaded();
            }
        }, 300);
    }
}

// ─── SMOOTH SCROLL ENGINE (Inertia Scrolling) ───
class SmoothScroll {
    constructor() {
        if (isMobile || prefersReducedMotion) return;
        this.targetY = window.scrollY;
        this.currentY = window.scrollY;
        this.ease = 0.075; // Smooth damping coefficient
        this.isScrolling = false;
        this.lastTime = performance.now();
        this.init();
    }
    init() {
        window.addEventListener('wheel', (e) => {
            // Trackpad detection: small, fractional values or low deltaY
            const isTrackpad = Math.abs(e.deltaY) < 50 || !Number.isInteger(e.deltaY);
            if (isTrackpad) {
                this.targetY = window.scrollY;
                this.currentY = window.scrollY;
                return;
            }

            e.preventDefault();
            
            this.targetY += e.deltaY * 0.75;
            this.targetY = Math.max(0, Math.min(this.targetY, document.documentElement.scrollHeight - window.innerHeight));
            
            if (!this.isScrolling) {
                this.isScrolling = true;
                this.lastTime = performance.now();
                this.animate();
            }
        }, { passive: false });

        window.addEventListener('scroll', () => {
            if (!this.isScrolling) {
                this.targetY = window.scrollY;
                this.currentY = window.scrollY;
            }
        }, { passive: true });

        // Keyboard navigation scroll mapping
        window.addEventListener('keydown', (e) => {
            if (document.activeElement.tagName === 'INPUT' || 
                document.activeElement.tagName === 'TEXTAREA' || 
                document.activeElement.isContentEditable) {
                return;
            }
            
            let amount = 0;
            const pageAmount = window.innerHeight * 0.85;
            
            switch(e.key) {
                case 'ArrowUp':
                    amount = -120;
                    break;
                case 'ArrowDown':
                    amount = 120;
                    break;
                case 'PageUp':
                    amount = -pageAmount;
                    break;
                case 'PageDown':
                    amount = pageAmount;
                    break;
                case ' ': // Spacebar
                    amount = e.shiftKey ? -pageAmount : pageAmount;
                    break;
                case 'Home':
                    amount = -this.targetY;
                    break;
                case 'End':
                    amount = (document.documentElement.scrollHeight - window.innerHeight) - this.targetY;
                    break;
                default:
                    return;
            }
            
            e.preventDefault();
            this.targetY += amount;
            this.targetY = Math.max(0, Math.min(this.targetY, document.documentElement.scrollHeight - window.innerHeight));
            
            if (!this.isScrolling) {
                this.isScrolling = true;
                this.lastTime = performance.now();
                this.animate();
            }
        });
    }
    animate(time) {
        if (!this.isScrolling) return;
        
        const now = time || performance.now();
        const delta = Math.min(100, now - this.lastTime);
        this.lastTime = now;
        
        const diff = this.targetY - this.currentY;
        if (Math.abs(diff) > 0.5) {
            const fpsScale = delta / 16.666;
            const stepEase = 1 - Math.pow(1 - this.ease, fpsScale);
            this.currentY += diff * stepEase;
            window.scrollTo(0, this.currentY);
            
            if (window.frameSequenceInstance) {
                window.frameSequenceInstance.updateSequence(this.currentY);
            }
            
            this.frameId = requestAnimationFrame((t) => this.animate(t));
        } else {
            this.currentY = this.targetY;
            window.scrollTo(0, this.currentY);
            if (window.frameSequenceInstance) {
                window.frameSequenceInstance.updateSequence(this.currentY);
            }
            this.isScrolling = false;
        }
    }
}

// ─── 1. SCROLL-DRIVEN IMAGE SEQUENCE (Apple-style) ───
class FrameSequence {
    constructor(preloader) {
        this.canvas = document.getElementById('hero-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.heroContent = document.querySelector('.hero-content');
        this.frameCount = 76;
        this.images = [];
        this.loaded = 0;
        this.currentFrame = 0;
        this.requestedFrame = 0;
        this.textShown = false;
        this.ticking = false;
        this.preloader = preloader;
        
        this.lastTime = 0;
        this.lastScrollY = 0;
        this.lastBlur = -1;
        this.scrollable = 0;
        
        this.init();
    }
    
    init() {
        this.cacheLayout();
        
        let lastWidth = window.innerWidth;
        window.addEventListener('resize', () => {
            if (window.innerWidth !== lastWidth) {
                lastWidth = window.innerWidth;
                this.cacheLayout();
            }
        });

        const total = this.frameCount;
        const essentialCount = 15;
        let essentialLoaded = 0;

        if (prefersReducedMotion) {
            const img = new Image();
            img.src = `scroll%20animation/ezgif-frame-001.jpg`;
            img.onload = () => {
                this.drawFrame(0);
                if (this.preloader) this.preloader.complete();
            };
            this.images.push(img);
            return;
        }

        // On mobile, only load every other frame to cut texture memory footprint by 50%
        const step = isMobile ? 2 : 1;
        
        for (let i = 1; i <= total; i++) {
            if (isMobile && i % step !== 0 && i !== 1 && i !== total) {
                this.images.push(null);
                continue;
            }
            
            const img = new Image();
            img.src = `scroll%20animation/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
            img.onload = () => {
                this.loaded++;
                if (i === 1) this.drawFrame(0);
                
                if (i <= essentialCount) {
                    essentialLoaded++;
                    if (this.preloader) {
                        this.preloader.update(essentialLoaded);
                    }
                }
            };
            this.images.push(img);
        }
        
        window.addEventListener('scroll', () => this.onScroll(), { passive: true });
    }
    
    cacheLayout() {
        this.resize();
        const section = document.getElementById('hero-sequence');
        if (section) {
            this.scrollable = section.offsetHeight - window.innerHeight;
        } else {
            this.scrollable = 2000;
        }
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.drawFrame(this.currentFrame);
    }
    
    onScroll() {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.updateSequence();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }
    
    updateSequence(customY) {
        if (!this.scrollable) return;
        const currentScrollY = (customY !== undefined) ? customY : window.scrollY;
        const progress = Math.max(0, Math.min(1, currentScrollY / this.scrollable));
        
        // Dynamic camera scale and translate (GPU handled)
        const zoom = 1.0 + progress * 0.05;
        const panY = -progress * 25;
        
        if (this.canvas) {
            this.canvas.style.transform = `scale(${zoom}) translate3d(0, ${panY}px, 0)`;
            
            const now = performance.now();
            const deltaTime = now - (this.lastTime || now);
            this.lastTime = now;
            
            const deltaScroll = Math.abs(currentScrollY - (this.lastScrollY || currentScrollY));
            this.lastScrollY = currentScrollY;
            
            const velocity = deltaTime > 0 ? (deltaScroll / deltaTime) : 0;
            const blurAmount = Math.min(2.5, velocity * 0.6);
            
            if (!isMobile) {
                const roundedBlur = Math.round(blurAmount * 5) / 5;
                if (roundedBlur !== this.lastBlur) {
                    this.canvas.style.filter = roundedBlur > 0.1 ? `blur(${roundedBlur}px)` : 'none';
                    this.lastBlur = roundedBlur;
                }
            }
        }
        
        let frameIndex = Math.min(this.frameCount - 1, Math.floor(progress * (this.frameCount - 1)));
        
        // Find nearest loaded frame if running on reduced mobile frames
        if (isMobile && !this.images[frameIndex]) {
            let left = frameIndex;
            let right = frameIndex;
            while (left >= 0 || right < this.frameCount) {
                if (left >= 0 && this.images[left]) {
                    frameIndex = left;
                    break;
                }
                if (right < this.frameCount && this.images[right]) {
                    frameIndex = right;
                    break;
                }
                left--;
                right++;
            }
        }
        
        if (frameIndex !== this.currentFrame) {
            this.currentFrame = frameIndex;
            this.drawFrame(frameIndex);
        }
        
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
        if (!img) return;
        
        this.requestedFrame = index;
        
        if (img.complete) {
            if (this.requestedFrame === index) {
                this.renderImage(img);
            }
        } else {
            // Asynchronous off-main-thread texture decoding
            img.decode().then(() => {
                if (this.requestedFrame === index) {
                    this.renderImage(img);
                }
            }).catch(() => {
                if (img.complete && this.requestedFrame === index) {
                    this.renderImage(img);
                }
            });
        }
    }
    
    renderImage(img) {
        if (!this.ctx) return;
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
        this.count = isMobile ? 25 : 70;
        this.particles = [];
        this.running = true;
        this.init();
    }
    init() {
        this.resize();
        
        let lastWidth = window.innerWidth;
        window.addEventListener('resize', () => {
            if (window.innerWidth !== lastWidth) {
                lastWidth = window.innerWidth;
                this.resize();
            }
        });
        
        for (let i = 0; i < this.count; i++) this.particles.push(this.create(true));
        document.addEventListener('visibilitychange', () => {
            this.running = !document.hidden;
            if (this.running) this.animate();
        });
        this.animate();
    }
    resize() { this.canvas.width = window.innerWidth; this.canvas.height = window.innerHeight; }
    create(random) {
        const colors = ['212,160,23', '0,212,255', '157,78,221', '255,0,127'];
        const chosenColor = colors[Math.floor(Math.random() * colors.length)];
        
        return {
            x: Math.random() * (this.canvas.width || window.innerWidth),
            y: random ? Math.random() * (this.canvas.height || window.innerHeight) : (this.canvas.height || window.innerHeight) + 10,
            size: Math.random() * 2.0 + 0.5,
            vy: -(Math.random() * 0.4 + 0.1),
            vx: (Math.random() - 0.5) * 0.2,
            opacity: Math.random() * 0.6 + 0.15,
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
            
            if (p.size > 1.5) {
                const g = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
                g.addColorStop(0, `rgba(${p.color},${o * 0.2})`);
                g.addColorStop(1, 'rgba(0,0,0,0)');
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
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
            'fade-up':    { hidden: 'translateY(32px)',  visible: 'translateY(0)' },
            'fade-down':  { hidden: 'translateY(-32px)', visible: 'translateY(0)' },
            'fade-left':  { hidden: 'translateX(40px)',  visible: 'translateX(0)' },
            'fade-right': { hidden: 'translateX(-40px)', visible: 'translateX(0)' },
            'scale-up':   { hidden: 'scale(0.92)',       visible: 'scale(1)' },
            'scale-down': { hidden: 'scale(1.08)',       visible: 'scale(1)' },
            'clip-reveal':{ hidden: null, visible: null, clip: true }
        };
        this.init();
    }
    init() {
        const els = document.querySelectorAll('[data-reveal]');
        els.forEach(el => {
            const v = el.dataset.reveal || 'fade-up';
            const delay = parseFloat(el.dataset.delay || 0);
            const duration = parseFloat(el.dataset.duration || 600);
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
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        els.forEach(el => obs.observe(el));
    }
}

// ─── 4. KINETIC TEXT (Recursive Splitter) ───
class KineticText {
    constructor(selector, opts = {}) {
        this.stagger = opts.stagger || 40;
        this.delay = opts.delay || 0;
        this.triggerClass = opts.triggerClass || 'revealed';
        document.querySelectorAll(selector).forEach(el => this.split(el));
    }
    split(el) {
        const originalText = el.textContent;
        el.setAttribute('aria-label', originalText);
        
        let wordIndex = 0;
        const spans = [];
        
        const processNode = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent;
                const words = text.split(/(\s+)/);
                const fragment = document.createDocumentFragment();
                
                words.forEach(word => {
                    if (word.trim() === '') {
                        fragment.appendChild(document.createTextNode(word));
                    } else {
                        const wrapper = document.createElement('span');
                        wrapper.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:bottom;';
                        const inner = document.createElement('span');
                        inner.textContent = word;
                        inner.style.cssText = `display:inline-block;transform:translateY(110%);opacity:0;will-change:transform;`;
                        
                        wrapper.appendChild(inner);
                        fragment.appendChild(wrapper);
                        spans.push({
                            element: inner,
                            index: wordIndex++
                        });
                    }
                });
                
                node.parentNode.replaceChild(fragment, node);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const children = Array.from(node.childNodes);
                children.forEach(child => processNode(child));
            }
        };
        
        const children = Array.from(el.childNodes);
        children.forEach(child => processNode(child));
        
        spans.forEach(item => {
            const delayTime = this.delay + item.index * this.stagger;
            item.element.style.transition = `transform 0.8s var(--ease-out-expo) ${delayTime}ms, opacity 0.6s ease ${delayTime}ms`;
        });
        
        const reveal = () => {
            spans.forEach(item => {
                item.element.style.transform = 'translateY(0)';
                item.element.style.opacity = '1';
            });
        };
        
        if (this.triggerClass === 'visible') {
            const parent = el.closest('.hero-content') || el;
            if (parent.classList.contains('visible')) {
                reveal();
            } else {
                const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.attributeName === 'class' && parent.classList.contains('visible')) {
                            reveal();
                            observer.disconnect();
                        }
                    });
                });
                observer.observe(parent, { attributes: true });
            }
        } else {
            const obs = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    reveal();
                    obs.unobserve(el);
                }
            }, { threshold: 0.15 });
            obs.observe(el);
        }
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
        const duration = 1800;
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
        this.dot.style.transform = `translate3d(${this.mx - 3}px, ${this.my - 3}px, 0)`;
        this.ring.style.transform = `translate3d(${this.rx - 19}px, ${this.ry - 19}px, 0)`;
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
                const dx = (e.clientX - r.left - r.width / 2) * 0.22;
                const dy = (e.clientY - r.top - r.height / 2) * 0.22;
                el.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.03)`;
                el.style.transition = 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            });
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate3d(0,0,0) scale(1)';
                el.style.transition = 'transform 0.6s var(--ease-spring)';
            });
        });
    }
}

// ─── 8. TILT CARDS & GLOW SHINE ───
class TiltCards {
    constructor() {
        if (isMobile || prefersReducedMotion) return;
        document.querySelectorAll('.glass, .portfolio-card, .service-card, .stat-card').forEach(card => {
            let ticking = false;
            let bounds = null;
            card.addEventListener('mouseenter', () => {
                bounds = card.getBoundingClientRect();
                card.classList.add('tilting');
            });
            card.addEventListener('mousemove', e => {
                if (!bounds) bounds = card.getBoundingClientRect();
                if (!ticking) {
                    requestAnimationFrame(() => {
                        const x = (e.clientX - bounds.left) / bounds.width;
                        const y = (e.clientY - bounds.top) / bounds.height;
                        const tiltX = (y - 0.5) * -6;
                        const tiltY = (x - 0.5) * 6;
                        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.01)`;
                        
                        const px = (e.clientX - bounds.left);
                        const py = (e.clientY - bounds.top);
                        card.style.setProperty('--mouse-x', `${px}px`);
                        card.style.setProperty('--mouse-y', `${py}px`);
                        ticking = false;
                    });
                    ticking = true;
                }
            });
            card.addEventListener('mouseleave', () => {
                bounds = null;
                card.classList.remove('tilting');
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
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
        this.sections = [];
        this.links = document.querySelectorAll('.nav-link');
        this.ticking = false;
        
        setTimeout(() => this.cacheLayout(), 150);
        
        window.addEventListener('resize', () => this.cacheLayout());
        window.addEventListener('scroll', () => this.onScroll(), { passive: true });
        
        if (this.btt) {
            this.btt.addEventListener('click', () => {
                if (window.smoothScrollInstance) {
                    window.smoothScrollInstance.targetY = 0;
                    if (!window.smoothScrollInstance.isScrolling) {
                        window.smoothScrollInstance.isScrolling = true;
                        window.smoothScrollInstance.lastTime = performance.now();
                        window.smoothScrollInstance.animate();
                    }
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        }
        
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                e.preventDefault();
                const targetId = a.getAttribute('href');
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    const targetY = targetEl.offsetTop;
                    if (window.smoothScrollInstance) {
                        window.smoothScrollInstance.targetY = targetY;
                        if (!window.smoothScrollInstance.isScrolling) {
                            window.smoothScrollInstance.isScrolling = true;
                            window.smoothScrollInstance.lastTime = performance.now();
                            window.smoothScrollInstance.animate();
                        }
                    } else {
                        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
    }
    
    cacheLayout() {
        this.heroHeight = document.getElementById('hero-sequence')?.offsetHeight || 2000;
        this.maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        
        this.sections = Array.from(document.querySelectorAll('section[id]')).map(sec => {
            return {
                id: sec.id,
                top: sec.offsetTop - 200,
                bottom: sec.offsetTop - 200 + sec.offsetHeight
            };
        });
    }
    
    onScroll() {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.updateNav();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }
    
    updateNav() {
        const y = window.scrollY;
        if (this.progress) this.progress.style.width = (this.maxScroll > 0 ? (y / this.maxScroll * 100) : 0) + '%';
        if (this.nav) {
            if (y > this.heroHeight - window.innerHeight * 0.5) {
                this.nav.classList.add('show-nav');
                this.nav.classList.add('scrolled');
            } else {
                this.nav.classList.remove('show-nav');
                this.nav.classList.remove('scrolled');
            }
        }
        this.lastScroll = y;
        if (this.btt) {
            if (y > this.maxScroll * 0.3) this.btt.classList.add('visible');
            else this.btt.classList.remove('visible');
        }
        
        this.sections.forEach(sec => {
            if (y >= sec.top && y < sec.bottom) {
                this.links.forEach(l => {
                    l.classList.toggle('active', l.getAttribute('href') === '#' + sec.id);
                });
            }
        });
    }
}

// ─── INIT ALL SYSTEMS ───
document.addEventListener('DOMContentLoaded', () => {
    window.smoothScrollInstance = new SmoothScroll();
    const loader = new PreloaderManager(15, 76);
    window.frameSequenceInstance = new FrameSequence(loader);
    
    if (!prefersReducedMotion) {
        new ParticleSystem();
        new KineticText('.hero-ref-title', { stagger: 45, delay: 300, triggerClass: 'visible' });
        new KineticText('.hero-ref-sub', { stagger: 25, delay: 800, triggerClass: 'visible' });
        new KineticText('.kinetic-section', { stagger: 35, delay: 50 });
    }
    new ScrollReveal();
    new CounterAnimation();
    new CinematicCursor();
    new MagneticButtons();
    new TiltCards();
    new HamburgerMenu();
    new NavController();
});
