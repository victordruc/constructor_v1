import InfoPanel from "../InfoDoor.js";
import OrderBuy from "../OrderBuy.js"

export default class PanelAdmin {
  constructor(data) {
    this.data = data;
  }

  render(container) {
    let html = `
        <div class="heading heading--primary">
            <h1>Конструктор дверей для шкафов купе</h1>
        </div>
        <div class="menu is-active">
            <a class="menu-action" href=".">Перезагрузить страницу</a>
            <a class="menu-action button--admin" href="admin.html">Админ панель</a>
            <button id="print" class="menu-action print">Распечатать</button>
            <button class="menu-action count">Расчитать стоимость</button>
            <button id="infoPanel" class="menu-action watch-data">Посмотреть данные</button>
            <button id="orderBuy" class="menu-action watch-data">Оформление заказа</button>
        </div>
        `;
    container.innerHTML = html;

    document.getElementById("print").addEventListener("click",this.print)
    document.getElementById("infoPanel").addEventListener("click",this.openInfoPanel.bind(this))
    document.getElementById("orderBuy").addEventListener("click",this.openOrderBuy.bind(this))
   
  }

  print() {
    window.print()
  }

  openInfoPanel(e) {
    e.stopPropagation()
    const infoPanel = document.getElementById("infoPanelDoor");
    const orderBuy = document.getElementById("orderBuyContainer")
    orderBuy.innerHTML = ""
    new InfoPanel(this.data).render(infoPanel);
    document.querySelectorAll(".main > *:not(.builder)").forEach(item=>{
      item.addEventListener("click",()=>{
        infoPanel.innerHTML = ""
      },{once:true})
    })
  }

  openOrderBuy(e) {
    e.stopPropagation()
    const infoPanel = document.getElementById("infoPanelDoor");
    const orderBuy = document.getElementById("orderBuyContainer")
    infoPanel.innerHTML = ""
    new OrderBuy(this.data).render(orderBuy)
    document.querySelectorAll(".main > *:not(.builder)").forEach(item=>{
      item.addEventListener("click",()=>{
        orderBuy.innerHTML = ""
      },{once:true})
    })
  }
}
