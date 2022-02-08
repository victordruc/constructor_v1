export default class InfoPanel {
  constructor(data) {
    this.data = data;
    this.qtyHor = 0;
    this.qtyVert = 0
  }

  render(container) {
    this.data.materials.forEach(item => {
      if(item.vert) {
        this.qtyVert = item.price / this.data.vertPrice
      } else if(item.hor) {
        this.qtyHor = item.price / this.data.horPrice
      }
    });

    let other = this.data.fittingsPrice.map(item=>(
        `<div class="data-item">
            <div class="data-heading-main">${item.nameFitting}</div>
            <div class="data-value data-value--texture">${item.name}</div>
          </div>`
    )
   )

    let html = `<div>
      <i class="icon icon--close" id="closeInfoPanelDoor">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2541 2541" class="svg--inline inlined-svg" width="23px" role="img" aria-labelledby="title"><title>Иконка закрывания панели</title><path d="M29 172c-39-39-39-103 0-142s103-39 142 0l1099 1099L2369 30c39-39 103-39 142 0s39 103 0 142L1412 1271l1099 1099c39 39 39 103 0 142s-103 39-142 0L1270 1413 171 2512c-39 39-103 39-142 0s-39-103 0-142l1099-1099L29 172z"></path></svg>
      </i>
      <div class="data-items">
        <div class="data-panel">
          <div class="data-heading-panel">Основные материалы</div>
          <div class="data-item">
            <div class="data-heading-main">Тип конструкции двери</div>
            <div class="data-value data-value--door-type">${this.data.constructionTypeDoor}</div>
          </div>
          <div class="data-item">
            <div class="data-heading-main">Размер проема</div>
            <div class="data-group">
              <div class="data-heading">Ширина проема: &nbsp;</div>
              <div class="data-value data-value--opening-w">${this.data.width}</div>
            </div>
            <div class="data-group">
              <div class="data-heading">Высота проема: &nbsp;</div>
              <div class="data-value data-value--opening-h">${this.data.height}</div>
            </div>
          </div>
          <div class="data-item">
            <div class="data-heading-main">Размер и тип рельсы</div>
            <div class="data-group">
              <div class="data-heading">Длина верхней рельсы: &nbsp;</div>
              <div class="data-value data-value--rail-u">${this.data.railInfo.widthTop}</div>
            </div>
            <div class="data-group">
              <div class="data-heading">Длина нижней рельсы: &nbsp;</div>
              <div class="data-value data-value--rail-b">${this.data.railInfo.widthBottom}</div>
            </div>
            <div class="data-group">
              <div class="data-heading">Тип рельсы: &nbsp;</div>
              <div class="data-value data-value--rail-t">${this.data.railInfo.type} рядная</div>
            </div>
          </div>
        </div>
        <div class="data-panel">
          <div class="data-heading-panel">Двери</div>
          <div class="data-item">
            <div class="data-heading-main">Количество створок двери</div>
            <div class="data-value data-value--sash-amount">${this.data.qty}</div>
          </div>
          <div class="data-item">
            <div class="data-heading-main">Тип створок двери</div>
            <div class="data-value data-value--sash-type">${this.data.doorLeafType}</div>
          </div>
          <div class="data-item">
            <div class="data-heading-main">Разделители и перемычки</div>

            <!--<div class="data-group">
              <div class="data-heading">Тип разделителей: &nbsp;</div>
              <div class="data-value data-value--divider-type"></div>
            </div>

            <div class="data-group">
              <div class="data-heading">Тип перемычек: &nbsp;</div>
              <div class="data-value data-value--lintel-type"></div>
            </div>-->

          <div class="data-group">
            <div class="data-heading">Количество вертикальных разделителей: &nbsp;</div>
            <div class="data-value data-value--divider-type">${this.qtyVert}</div>
          </div>

          <div class="data-group">
            <div class="data-heading">Количество горизонтальных разделителей: &nbsp;</div>
            <div class="data-value data-value--lintel-type">${this.qtyHor}</div>
          </div>

          </div>
        </div>
        <div class="data-panel">
          <div class="data-heading-panel">Профиль</div>
          <div class="data-item">
            <div class="data-heading-main">Тип профиля</div>
            <div class="data-value data-value--profile-type">${this.data.nameProfile}</div>
          </div>
          <div class="data-item">
            <div class="data-heading-main">Цвет профиля</div>
            <div class="data-value data-value--profile-color">${this.data.imgName}</div>
          </div>
        </div>

        <div class="data-panel">
          <div class="data-heading-panel">Другое</div>

          ${other.join("")}
          
        </div>

      </div>
      </div> `;
    container.innerHTML = html;

    document.getElementById("closeInfoPanelDoor").addEventListener("click",(e)=>{
        container.innerHTML=""
    })

  }
}
