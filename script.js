
const canvas = document.getElementById("neural-bg");
const ctx = canvas.getContext("2d");

let particles = [];
let width, height;

function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(
        75,
        Math.max(25, Math.floor(width * height / 18000))
    );

    particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.8 + 0.7
    }));
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        for (let j = i + 1; j < particles.length; j++) {
            const q = particles[j];

            const dx = p.x - q.x;
            const dy = p.y - q.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 140) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(q.x, q.y);

                ctx.strokeStyle =
                    `rgba(59, 130, 246, ${0.22 * (1 - distance / 140)})`;

                ctx.lineWidth = 0.7;
                ctx.stroke();
            }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        ctx.fillStyle = "#60a5fa";
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#3b82f6";
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    requestAnimationFrame(animate);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);
animate();
