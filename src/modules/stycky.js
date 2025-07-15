const header = document.getElementById('mainHeader');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header.classList.add('scrolled'); // Скрываем элементы
    } else {
        header.classList.remove('scrolled'); // Показываем только в самом верху
    }
});