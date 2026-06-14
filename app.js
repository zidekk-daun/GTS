gsap.registerPlugin(ScrollTrigger);

// 1. АНИМАЦИЯ ПРИ ЗАГРУЗКЕ (Мягкая сборка интерфейса)
const introTl = gsap.timeline();
introTl.from(".main-header", { y: -50, opacity: 0, duration: 0.8 })
       .from(".hero-left", { x: -40, opacity: 0, duration: 0.8 }, "-=0.4")
       .from(".hero-right .glass-panel", { x: 40, opacity: 0, stagger: 0.2, duration: 0.8 }, "-=0.8");


// 2. ГОРИЗОНТАЛЬНЫЙ СКРОЛЛ (Фишка сайта)
// Заставляем блок двигаться влево по мере прокрутки вниз
const scrollContainer = document.querySelector(".horizontal-scroll-cards");

gsap.to(scrollContainer, {
    x: () => -(scrollContainer.scrollWidth - window.innerWidth), // Двигаем на всю ширину контента
    ease: "none",
    scrollTrigger: {
        trigger: ".horizontal-overflow",
        pin: true, // "Приклеиваем" экран, пока идет анимация вбок
        scrub: 1,  // Плавная привязка к колесику мыши
        start: "top top",
        end: () => "+=" + scrollContainer.scrollWidth, // Длина скролла зависит от ширины карточек
        invalidateOnRefresh: true
    }
});


// 3. ИНТЕРАКТИВНЫЕ ТАБЫ (Переключение без перезагрузок)
const tabs = document.querySelectorAll(".tab-btn");
const panes = document.querySelectorAll(".tab-pane");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        // Убираем активные классы со всех кнопок и вкладок
        tabs.forEach(t => t.classList.remove("active"));
        panes.forEach(p => p.classList.remove("active"));

        // Добавляем активный класс текущей вкладке
        tab.classList.add("active");
        const targetPane = document.getElementById(tab.dataset.tab);
        targetPane.classList.add("active");
    });
});


// 4. НАВИГАЦИЯ ДЛЯ КЛИКОВ В ШАПКЕ
document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => {
        const targetId = item.dataset.target;
        const targetElement = document.getElementById(targetId);
        
        gsap.to(window, {
            duration: 1,
            scrollTo: targetElement,
            ease: "power3.out"
        });
    });
});