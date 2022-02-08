export default class PanelMenu {
    constructor(data) {
        this.data = data
    }

    render(container) {
        let html = `
        <div class="heading heading--primary">
            <h1>Конструктор дверей для шкафов купе</h1>
        </div>

        <div class="menu is-active">
				<a class="menu-action" href=".">Перезагрузить страницу </a>
				<a class="menu-action button--admin" href="#">Админ панель </a>
				<button class="menu-action print">
					Распечатать
				</button>
				<button class="menu-action count">
					Расчитать стоимость
				</button>
				<button class="menu-action materials">
					Материалы
				</button>
				<button class="menu-action watch-data">
					Посмотреть данные
				</button>
			</div>
        `
        container.innerHTML = html
    }
}