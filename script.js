// GSAP вход карточки
gsap.from(".card", {
    duration: 1.2,
    y: 40,
    opacity: 0,
    ease: "power3.out"
});

// Заголовок
gsap.from("h1", {
    duration: 1.2,
    y: 20,
    opacity: 0,
    delay: 0.2,
    ease: "power3.out"
});

// Кнопки
gsap.from(["#yesBtn", "#noBtn"], {
    duration: 0.9,
    scale: 0.6,
    opacity: 0,
    delay: 0.5,
    stagger: 0.12,
    ease: "back.out(1.7)"
});

// Параллакс карточки
document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    gsap.to(".card", {
        rotationY: x,
        rotationX: -y,
        transformPerspective: 800,
        duration: 0.4,
        ease: "power2.out"
    });
});

// Уворот кнопки "Нет"
let dodgeCount = 0;

function moveNoButton() {
    const padding = 40;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;

    const x = padding + Math.random() * maxX;
    const y = padding + Math.random() * maxY;

    gsap.to(noBtn, {
        duration: 0.25,
        x: x - noBtn.getBoundingClientRect().left,
        y: y - noBtn.getBoundingClientRect().top,
        ease: "power2.out"
    });
}

noBtn.addEventListener("mouseover", () => {
    if (dodgeCount < 8) {
        moveNoButton();
        dodgeCount++;
    }
});

// Показ результата
function showResult(isYes) {
    const result = document.getElementById("result");
    const photos = document.getElementById("photos");

    result.innerHTML = isYes
        ? "Я знал, что ты скажешь <span class='highlight'>ДА</span> ❤️✨"
        : "Ты думала, что у тебя есть выбор? Его нет 😎<br><span class='highlight'>Теперь ты моя валентинка!!!</span> ❤️";

    result.style.display = "block";
    photos.style.display = "block";

    gsap.from(result, { duration: 0.7, y: 20, opacity: 0 });
    gsap.from("#photos img", { duration: 0.7, y: 30, opacity: 0, stagger: 0.15 });
}

yesBtn.addEventListener("click", () => showResult(true));
noBtn.addEventListener("click", () => showResult(false));

// Падающие эмодзи
const emojis = ["❤️", "💖", "💘", "💕", "💞", "💗", "💓"];
function createEmoji() {
    const emoji = document.createElement("div");
    emoji.classList.add("emoji");
    emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    emoji
