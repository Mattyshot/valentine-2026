* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Cormorant Garamond', serif;
    background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
    color: #fff;
    min-height: 100vh;
    overflow: hidden;
    position: relative;
}

.slide {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px;
    transition: opacity 1.3s ease;
    opacity: 0;
}

.slide:not(.hidden) {
    opacity: 1;
    z-index: 10;
}

.hidden {
    opacity: 0;
    pointer-events: none;
}

.content {
    text-align: center;
    width: 100%;
    max-width: 94%;
    background: rgba(255, 182, 193, 0.38);
    backdrop-filter: blur(10px);
    padding: 24px 16px;
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.22);
    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.22);
    overflow-wrap: break-word;
    word-break: break-word;
    hyphens: auto;
}

/* Заголовки */
h1 {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: clamp(2.4rem, 8vw, 4rem);
    margin: 0 0 16px 0;
    line-height: 1.15;
    text-shadow: 0 4px 16px rgba(255, 20, 147, 0.7);
}

.subtitle {
    font-size: clamp(1.45rem, 4.8vw, 2rem);
    line-height: 1.4;
    margin: 16px 0 28px;
    padding: 0 8px;
}

/* Кнопки */
.buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
}

button, .next-btn {
    font-size: clamp(1.6rem, 4.8vw, 2.1rem);
    padding: 14px 44px;
    min-width: 200px;
    min-height: 54px;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.3s ease;
    touch-action: manipulation;
}

#yesBtn { background: linear-gradient(45deg, #ff69b4, #ff1493); color: white; }
#noBtn { background: linear-gradient(45deg, #a0a0a0, #808080); color: white; position: relative; }

.next-btn { background: rgba(255,255,255,0.28); border: 2px solid rgba(255,255,255,0.55); }

/* Последний слайд — строго без скролла */
.joy {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 16px 0;
}

.joy h1 {
    font-size: clamp(2.2rem, 7vw, 3.8rem);
    margin: 8px 0 16px 0;
    line-height: 1.2;
    width: 90%;
    max-width: 700px;
}

.photos {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
    max-width: 90%;
}

.photos img {
    width: 100%;
    max-width: 280px;
    border-radius: 14px;
    border: 4px solid rgba(255,255,255,0.4);
    box-shadow: 0 6px 18px rgba(0,0,0,0.3);
    object-fit: cover;
}

.heart-emoji.beat {
    font-size: clamp(2.2rem, 8vw, 3.4rem);
    margin: 16px 0 12px 0;
}

/* Падающие сердца */
.hearts {
    position: fixed;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 0;
    opacity: 0.92;
}

.hearts::before,
.hearts::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 200%;
    background-size: 70px;
    animation: fall-bg 45s linear infinite;
}

.hearts::before {
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="50" font-size="40" fill="rgba(255,105,180,0.55)">❤️</text></svg>') repeat;
}

.hearts::after {
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="50" font-size="50" fill="rgba(255,182,193,0.45)">💕</text></svg>') repeat;
    animation-direction: reverse;
    animation-duration: 60s;
    opacity: 0.7;
}

@keyframes fall-bg {
    0% { transform: translateY(-50%); }
    100% { transform: translateY(100%); }
}

@keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.25); }
}

@keyframes softPulse {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(0, -6px) scale(1.06); }
}

/* Медиа-запросы — строго подгонка под телефон */
@media (max-width: 600px) {
    .content { padding: 20px 14px; }
    h1 { font-size: clamp(2.2rem, 9vw, 3.4rem); margin-bottom: 12px; }
    .subtitle { font-size: clamp(1.35rem, 4.8vw, 1.85rem); margin: 12px 0 24px; }
    button { font-size: 1.65rem; padding: 12px 36px; min-width: 170px; }
    
    .joy h1 { font-size: clamp(2rem, 8vw, 3.2rem); margin: 8px 0 12px 0; }
    
    .photos img { max-width: 78%; }
    
    .heart-emoji.beat { font-size: clamp(2rem, 9vw, 3rem); margin: 12px 0 8px 0; }
}

@media (max-height: 680px) {
    .content { padding: 16px 12px; }
    .joy { padding: 12px 0; gap: 12px; }
    .photos img { max-width: 70%; }
}
