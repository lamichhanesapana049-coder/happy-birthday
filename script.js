// Supriya Birthday Website Logic

// 1. Initial Setup & Floating Hearts Canvas Animation
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 6 + 3;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * -2 - 0.5; // slow float upwards
        this.color = ['#ff0055', '#ff3366', '#ff6699', '#ffffff', '#ffccd5'][Math.floor(Math.random() * 5)];
        this.opacity = Math.random() * 0.8 + 0.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y < -10) {
            this.y = canvas.height + 10;
            this.x = Math.random() * canvas.width;
        }
    }
    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 60; i++) {
        particles.push(new Particle());
    }
}
initParticles();

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// 2. Mouse Heart Trail
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.4) return;
    const heart = document.createElement('div');
    heart.className = 'heart-trail';
    heart.innerHTML = ['💖', '🌸', '✨', '💕', '👑'][Math.floor(Math.random() * 5)];
    heart.style.left = e.pageX + 'px';
    heart.style.top = e.pageY + 'px';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1200);
});

// 3. Audio Player Logic
const musicToggle = document.getElementById('musicToggle');
const audio = document.getElementById('bg-music');
let isPlaying = false;

function toggleMusic() {
    if (audio.paused) {
        audio.play().then(() => {
            musicToggle.classList.add('playing');
            musicToggle.querySelector('i').setAttribute('data-lucide', 'pause');
            isPlaying = true;
            lucide.createIcons();
        }).catch(err => {
            console.log("Audio autoplay restricted:", err);
        });
    } else {
        audio.pause();
        musicToggle.classList.remove('playing');
        musicToggle.querySelector('i').setAttribute('data-lucide', 'music');
        isPlaying = false;
        lucide.createIcons();
    }
}

musicToggle.addEventListener('click', toggleMusic);

// Auto-play attempt on user's first click anywhere on the page
document.body.addEventListener('click', () => {
    if (!isPlaying && audio.paused) {
        audio.play().then(() => {
            musicToggle.classList.add('playing');
            musicToggle.querySelector('i').setAttribute('data-lucide', 'pause');
            isPlaying = true;
            lucide.createIcons();
        }).catch(() => {});
    }
}, { once: true });

// 4. Confetti Cannon
function triggerConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#ff0055', '#ff3366', '#ffccd5', '#ffb703', '#ffffff']
        });
    }
}

// 5. Cake Candles Ceremony
function blowCandle(candle) {
    const flame = candle.querySelector('.flame');
    const smoke = candle.querySelector('.smoke');
    if (!flame.classList.contains('off')) {
        flame.classList.add('off');
        smoke.classList.add('active');
        checkAllCandles();
    }
}

function blowAllCandles() {
    const candles = document.querySelectorAll('.candle');
    candles.forEach(c => blowCandle(c));
}

function checkAllCandles() {
    const flames = document.querySelectorAll('.flame');
    const allOff = Array.from(flames).every(f => f.classList.contains('off'));
    if (allOff) {
        document.getElementById('wish-message').classList.add('show');
        triggerConfetti();
    }
}

// 6. Polaroid Photo Gallery
const galleryData = [
    { src: 'image1.jpg', caption: 'Timeless Elegance ✨' },
    { src: 'image2.jpg', caption: 'Exploring with Grace 🌸' },
    { src: 'image3.jpg', caption: 'Saree Magic & Balloons 🎈' },
    { src: 'image4.jpg', caption: 'Playful & Cute Vibe ✌️' },
    { src: 'image5.jpg', caption: 'Royal Blue Princess 💙' },
    { src: 'image6.jpg', caption: 'On Top Of The World 🌤️' },
    { src: 'image7.jpg', caption: 'Sunshine Smile 💛' },
    { src: 'image8.jpg', caption: 'Ethereal Teal Beauty 🩵' },
    { src: 'image9.jpg', caption: 'Cool Sunglasses & Sky 🕶️' },
    { src: 'image10.jpg', caption: 'Soft Heart & Parrot 🦜' }
];

const galleryGrid = document.getElementById('gallery-grid');
function renderGallery() {
    galleryGrid.innerHTML = '';
    galleryData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'polaroid-card';
        card.style.setProperty('--rotation', ((index % 2 === 0 ? 1 : -1) * (Math.random() * 4 + 2)) + 'deg');
        card.onclick = () => openLightbox(item.src, item.caption);
        card.innerHTML = `
            <div class="polaroid-img-wrapper">
                <img src="${item.src}" alt="${item.caption}">
            </div>
            <div class="polaroid-caption">${item.caption}</div>
        `;
        galleryGrid.appendChild(card);
    });
}
renderGallery();

// Lightbox Modal
function openLightbox(src, caption) {
    const overlay = document.getElementById('lightbox');
    document.getElementById('modal-img').src = src;
    document.getElementById('modal-caption').innerText = caption;
    overlay.classList.add('active');
}
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

// 7. Envelope Letter Open/Close
function openEnvelope() {
    const modal = document.getElementById('letter-modal');
    modal.classList.add('active');
    triggerConfetti();
}
function closeEnvelope() {
    const modal = document.getElementById('letter-modal');
    modal.classList.remove('active');
}

// Navbar Highlight on Scroll
const navLinks = document.querySelectorAll('.nav-btn');
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) a.classList.add('active');
    });
});
