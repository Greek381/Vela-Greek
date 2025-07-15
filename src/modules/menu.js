document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.js-toggle-submenu');

    // Закрытие всех подменю, кроме текущего
    function closeAllSubmenus(exceptItem = null) {
        document.querySelectorAll('.submenu.is-open').forEach(menu => {
            if (menu !== exceptItem) {
                menu.classList.remove('is-open');
            }
        });
    }

    // Обработчик клика
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const submenu = item.nextElementSibling;

            // Если подменю уже открыто — закрываем
            if (submenu.classList.contains('is-open')) {
                submenu.classList.remove('is-open');
            } else {
                closeAllSubmenus(submenu); // Закрываем остальные
                submenu.classList.add('is-open'); // Открываем текущее
            }
        });
    });

    // Закрытие при клике вне меню
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.header-wrap-bottom__item')) {
            closeAllSubmenus();
        }
    });
});