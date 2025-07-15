const burger = document.querySelector('.burger-mob')
const menu = document.querySelector('.menu-mob')

burger.addEventListener('click', () => {
    burger.classList.toggle('active')
    menu.classList.toggle('active')
})

// Обработка вложенных меню
const menuTop = document.querySelector('.menu-mob-top')
const menuBottom = document.querySelector('.header-block-mob-bottom')

document.querySelectorAll('.submenu-toggle-mob').forEach(btn => {
    btn.addEventListener('click', function () {
        const submenu = btn.nextElementSibling;
        submenu.classList.toggle('active');
        btn.parentElement.classList.add('active')
        btn.parentElement.parentElement.classList.add('active')
        menuTop.classList.add('hidden')
        menuBottom.classList.add('hidden')
    });
});

const closeList = document.querySelectorAll('.header-wrap-bottom__list')

// Функция создания/удаления кнопки "Назад"
function updateBackButtons() {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    document.querySelectorAll('.submenu').forEach(menu => {
        let backBtn = menu.querySelector('.back-btn');
        if (isMobile) {
            if (!backBtn) {
                backBtn = document.createElement('li');
                const parentLink = menu.parentElement.querySelector('a, button');
                const backName = parentLink ? parentLink.textContent.trim() : 'Назад';
                const displayText = backName.replace('Смартфоны и гаджеты', 'Смартфоны').replace('Смартфоны 227', 'Гаджеты');

                backBtn.className = 'back-btn';
                backBtn.innerHTML = `<span class="back-btn_arrow"></span> <button>${displayText}</button>`;

                backBtn.addEventListener('click', () => {
                    menu.classList.remove('active');
                    if (menuTop) menuTop.classList.remove('hidden');
                    if (menuBottom) menuBottom.classList.remove('hidden');
                    closeList.forEach((item) => {
                        if (item.classList.contains('active')) item.classList.remove('active')
                    })
                });

                menu.prepend(backBtn);
            }
        } else {
            if (backBtn) {
                backBtn.remove();
            }
        }
    });
}

updateBackButtons();

window.addEventListener('resize', () => {
    clearTimeout(window.backButtonsResizeTimer);
    window.backButtonsResizeTimer = setTimeout(updateBackButtons, 100);
});
