let currentSlide = 1;

function nextSlide(to) {
    document.getElementById(`slide${currentSlide}`).classList.add('hidden');
    document.getElementById(`slide${to}`).classList.remove('hidden');
    currentSlide = to;
}

function forceYes() {
    showJoy('Теперь точно моя валентинка навсегда! 💖💖💖', true);
}

function launchConfetti() {
    confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff69b4', '#ff1493', '#ffb6c1', '#ffffff', '#ff85c0'],
        ticks: 300
    });
    
    setTimeout(() => {
        confetti({
            particleCount: 80,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            shapes: ['heart'],
            colors: ['#ff69b4', '#ff1493']
        });
        confetti({
            particleCount: 80,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            shapes: ['heart'],
            colors: ['#ff69b4', '#ff1493']
        });
    }, 400);
}

document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const responseText = document.getElementById('responseText');

    let noHoverCount = 0;
    const maxHovers = 8;
    let isEscaping = false;
    let lastEnterTime = 0;
    const minIntervalBetweenEscapes = 800;

    // Обработка уворота (мышь + касание)
    const handlePointerEnter = (e) => {
        e.preventDefault(); // предотвращаем возможные дефолтные действия
        
        const now = Date.now();
        
        if (isEscaping || (now - lastEnterTime < minIntervalBetweenEscapes)) {
            return;
        }

        if (noHoverCount < maxHovers) {
            isEscaping = true;
            lastEnterTime = now;

            const rect = noBtn.getBoundingClientRect();
            const btnCenterX = rect.left + rect.width / 2;
            const btnCenterY = rect.top + rect.height / 2;
            
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            
            let dx = btnCenterX - clientX;
            let dy = btnCenterY - clientY;
            
            const len = Math.sqrt(dx * dx + dy * dy) || 1;
            
            const escapeDistance = 140 + Math.random() * 80;
            
            dx = (dx / len) * escapeDistance;
            dy = (dy / len) * escapeDistance;
            
            dx += (Math.random() - 0.5) * 30;
            dy += (Math.random() - 0.5) * 30;
            
            noBtn.style.transition = 'transform 0.9s cubic-bezier(0.25, 0.8, 0.25, 1)';
            noBtn.style.transform = `translate(${dx}px, ${dy}px) scale(1.03)`;
            
            noHoverCount++;

            setTimeout(() => { isEscaping = false; }, 950);
        }

        if (noHoverCount >= maxHovers - 3) {
            noBtn.classList.add('soft-pulse');
        }
    };

    // Убираем уворот при уходе пальца/мыши
    const handlePointerLeave = () => {
        noBtn.style.transition = 'transform 0.75s ease-out';
        noBtn.style.transform = 'translate(0, 0) scale(1)';
        isEscaping = false;
    };

    // Добавляем события
    noBtn.addEventListener('mouseenter', handlePointerEnter);
    noBtn.addEventListener('touchstart', handlePointerEnter, { passive: false });
    noBtn.addEventListener('mouseleave', handlePointerLeave);
    noBtn.addEventListener('touchend', handlePointerLeave);
    noBtn.addEventListener('touchcancel', handlePointerLeave);

    // Кнопка "Нет" — клик / тап
    noBtn.addEventListener('click', (e) => {
        e.preventDefault(); // предотвращаем двойное срабатывание
        nextSlide('refuse');
    });

    // Кнопка "Да"
    yesBtn.addEventListener('mouseenter', (e) => {
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const heart = document.createElement('span');
                heart.textContent = '💕';
                heart.className = 'yes-particle';
                heart.style.left = e.clientX + 'px';
                heart.style.top = e.clientY + 'px';
                document.body.appendChild(heart);

                setTimeout(() => {
                    heart.style.transform = `translate(${Math.random()*200-100}px, ${Math.random()*-200-100}px) scale(0)`;
                    heart.style.opacity = '0';
                }, 50);

                setTimeout(() => heart.remove(), 1200);
            }, i * 80);
        }
    });

    yesBtn.addEventListener('click', () => {
        showJoy('Урааа! Ты моя валентинка навсегда! 💖💖💖', true);
    });

    const showJoy = (text, isYes = false) => {
        responseText.textContent = text;
        nextSlide(3);
        launchConfetti();
        if (isYes) setTimeout(launchConfetti, 800);
    };
});
