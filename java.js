/* ===== COUNTDOWN TO NEW YEAR ===== */
const countdownEl = document.createElement("div");
countdownEl.className = "countdown";
document.querySelector(".container").appendChild(countdownEl);

function updateCountdown() {
    const now = new Date();
    const newYear = new Date(now.getFullYear() + 1, 0, 1);
    const diff = newYear - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownEl.innerHTML = `
        <h3>⏳ Шинэ он хүртэл</h3>
        <p>${days} өдөр ${hours}ц ${minutes}м ${seconds}с</p>
    `;
}

setInterval(updateCountdown, 1000);
updateCountdown();

/* ===== BUTTON CLICK MAGIC ===== */
const button = document.querySelector("button");

button.addEventListener("click", () => {
    launchFireworks();
});

/* ===== FIREWORKS EFFECT ===== */
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

canvas.style.position = "fixed";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.zIndex = 0;
canvas.style.pointerEvents = "none";

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function launchFireworks() {
    const particles = [];
    const colors = ["#ff3f3f", "#ffd369", "#00ffd5", "#ffffff"];

    for (let i = 0; i < 80; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            angle: Math.random() * Math.PI * 2,
            speed: Math.random() * 6 + 2,
            radius: Math.random() * 3 + 1,
            life: 100,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, i) => {
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed;
            p.life--;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();

            if (p.life <= 0) particles.splice(i, 1);
        });

        if (particles.length > 0) {
            requestAnimationFrame(animate);
        }
    }

    animate();
}
