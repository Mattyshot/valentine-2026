let currentSlide = 1;

function nextSlide(to) {
    // 1. Скрываем текущий слайд (если он существует)
    const currentId = `slide${currentSlide}`;
    const currentElem = document.getElementById(currentId);
    if (currentElem) {
        currentElem.classList.add('hidden');
    } else {
        console.warn(`Не найден текущий слайд: ${currentId}`);
    }

    // 2. Определяем ID следующего слайда
    let nextId;
    if (typeof to === 'number') {
        nextId = `slide${to}`;
    } else {
        nextId = to; // строка, например 'slide-refuse'
    }

    // 3. Показываем следующий слайд
    const nextElem = document.getElementById(nextId);
    if (nextElem) {
        nextElem.classList.remove('hidden');
    } else {
        console.error(`Не найден следующий слайд: ${nextId}`);
        return;
    }

    // 4. Обновляем currentSlide ТОЛЬКО если это числовой слайд
    if (typeof to === 'number') {
        currentSlide = to;
    }
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

    // Защита от отсутствия элементов
    if (!noBtn) {
        console.error('Кнопка #noBtn не найдена в DOM');
        return;
    }
    if (!yesBtn) {
        console.error('Кнопка #yesBtn не найдена в DOM');
        return;
    }
    if (!responseText) {
        console.error('Элемент #responseText не найден в DOM');
    }

    let noHoverCount = 0;
    const maxHovers = 8;
    let lastEnterTime = 0;
    const minInterval = 700;

    // Уворот кнопки «Нет» (работает на ПК и телефоне)
    noBtn.addEventListener('pointerenter', (e) => {
        const now = Date.now();
        if (now - lastEnterTime < minInterval) return;

        if (noHoverCount < maxHovers) {
            const rect = noBtn.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const clientX = e.clientX;
            const clientY = e.clientY;

            let dx = centerX - clientX;
            let dy = centerY - clientY;

            const len = Math.hypot(dx, dy) || 1;
            const distance = 140 + Math.random() * 80;

            dx = (dx / len) * distance;
            dy = (dy / len) * distance;

            dx += (Math.random() - 0.5) * 30;
            dy += (Math.random() - 0.5) * 30;

            noBtn.style.transition = 'transform 0.9s cubic-bezier(0.25, 0.8, 0.25, 1)';
            noBtn.style.transform = `translate(${dx}px, ${dy}px) scale(1.03)`;

            noHoverCount++;
            lastEnterTime = now;

            if (noHoverCount >= maxHovers - 3) {
                noBtn.classList.add('soft-pulse');
            }
        }
    });

    noBtn.addEventListener('pointerleave', () => {
        noBtn.style.transition = 'transform 0.75s ease-out';
        noBtn.style.transform = 'translate(0, 0) scale(1)';
    });

    // Клик / тап по «Нет» — главный обработчик перехода
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Кнопка "Нет" нажата — переходим на slide-refuse');
        nextSlide('slide-refuse');
    });

    // Кнопка «Да»
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
        if (responseText) {
            responseText.textContent = text;
        } else {
            console.error('Элемент #responseText не найден');
        }
        nextSlide(3);
        launchConfetti();
        if (isYes) setTimeout(launchConfetti, 800);
    };
});
