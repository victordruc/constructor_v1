export default class OrderBuy {
  constructor(data) {
    this.data = data;
    this.qtyHor = 0;
    this.qtyVert = 0;
  }

  render(container) {
    let containerDoor = document.getElementById("finalDoor").cloneNode(true);
    containerDoor.removeAttribute("id");
    containerDoor.style.padding = 0;
    containerDoor.querySelectorAll(".divDoor").forEach((item) => {
      item.style.position = "relative";
      item.style.left = 0;
      item.style.top = "10px"
    });

    this.data.materials.forEach((item) => {
      if (item.vert) {
        this.qtyVert = item.price / this.data.vertPrice;
      } else if (item.hor) {
        this.qtyHor = item.price / this.data.horPrice;
      }
    });

    let other = this.data.fittingsPrice.map(
      (item) =>
        `<tr>
            <td>${item.nameFitting}</td>
            <td>${item.name}</td>
          </tr>`
    );
    let price = document.getElementById("totalPrice").innerHTML;
    let html = `
        <div>

        <div class="row header">
          <h2>Оформление заказа</h2>
          <i class="icon icon--close" id="closeBuyOrder">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2541 2541" class="svg--inline inlined-svg" width="23px" role="img" aria-labelledby="title"><title>Иконка закрывания панели</title><path d="M29 172c-39-39-39-103 0-142s103-39 142 0l1099 1099L2369 30c39-39 103-39 142 0s39 103 0 142L1412 1271l1099 1099c39 39 39 103 0 142s-103 39-142 0L1270 1413 171 2512c-39 39-103 39-142 0s-39-103 0-142l1099-1099L29 172z"></path></svg>
          </i>
        </div>

        <div class="container">

        <div class="d-flex justify-content-center">
        <div
          class="row justify-content-center m-2"
          id="buyOrderDoorContainer"
        >
          
        </div>
        </div>
        <svg viewBox="0 0 300 2" class="divider">
            <line stroke-dasharray="5" x1="0" x2="100%" y1="0" y2="0"></line>
            <line stroke-dasharray="5" x1="0" x2="100%" y1="1" y2="1"></line>
        </svg>

        <form id="orderBuyForm">
        <div class="row mt-4">
          <div class="col-lg-4">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">Имя</span>
              </div>
              <input type="text" class="form-control" placeholder="Имя" required/>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">Фамилия</span>
              </div>
              <input type="text" class="form-control" placeholder="Фамилия" required/>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">Телефона</span>
              </div>
              <input type="tel"  pattern="[0-9]{9}" class="form-control" placeholder="Телефона" required/>
            </div>
          </div>
        </div>

        <div class="row">
            <div class="col-lg-6">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">Электронная почта</span>
                </div>
                <input type="email" class="form-control" placeholder="Электронная почта"  required/>
              </div>
            </div>


            <div class="col-lg-6">
                <div class="input-group mb-3">
                    <div class="input-group-text" title="Доставка">
                      <input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
                    </div>
                    <input type="text" class="form-control" aria-label="Text input with checkbox" placeholder="Адрес доставки">
                  </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox">
                    <label class="form-check-label">Заказ монтажа</label>
                </div>
            </div>

            <div class="col-lg-6">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox">
                    <label class="form-check-label">Замер</label>
                </div>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-lg-12">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">Примечание</span>
                </div>
                <textarea class="form-control" aria-label="With textarea"></textarea>
              </div>
            </div>
          </div>

          <svg viewBox="0 0 300 2" class="divider">
            <line stroke-dasharray="5" x1="0" x2="100%" y1="0" y2="0"></line>
            <line stroke-dasharray="5" x1="0" x2="100%" y1="1" y2="1"></line>
        </svg>

          <div class="row">
          <div class="col-12 d-flex justify-content-center">
            <table class="table">
                <thead>
                  <tr>
                    <th colspan="2">Основные материалы</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Тип конструкции двери</td>
                    <td>${this.data.constructionTypeDoor}</td>
                  </tr>
                  <tr>
                    <td>Ширина проема</td>
                    <td>${this.data.width} мм</td>
                  </tr>
                  <tr>
                    <td>Высота проема</td>
                    <td>${this.data.height} мм</td>
                  </tr>

                  <tr>
                    <td>Длина верхней рельсы</td>
                    <td>${this.data.railInfo.widthTop} мм</td>
                  </tr>
                  <tr>
                    <td>Длина нижней рельсы</td>
                    <td>${this.data.railInfo.widthBottom} мм</td>
                  </tr>
                  <tr>
                    <td>Тип рельсы</td>
                    <td>${this.data.railInfo.type} рядная</td>
                  </tr>

                  <tr>
                    <td>Тип профиля</td>
                    <td>${this.data.nameProfile}</td>
                  </tr>
                  <tr>
                    <td>Цвет профиля</td>
                    <td>${this.data.imgName}</td>
                  </tr>
                  <tr>
                    <td>Количество створок двери</td>
                    <td>${this.data.qty}</td>
                  </tr>

                  <tr>
                    <td>Тип створок двери</td>
                    <td>${this.data.doorLeafType}</td>
                  </tr>

                  <tr>
                    <td>Количество горизонтальных разделителей</td>
                    <td>${this.qtyHor}</td>
                  </tr>

                  <tr>
                    <td>Количество вертикальных разделителей</td>
                    <td>${this.qtyVert}</td>
                  </tr>

                    ${other.join("")}

                </tbody>
              </table>
              </div>
          </div>

          <div class="row">
            <h3 style="color:black; text-align:center">Стоимость: ${price} мдл</h3>
          </div>

          <div class="row pb-3">
          <div class="col-12 d-flex justify-content-center">
            <button type="submit" class="btn btn-outline-primary">СОХРАНИTЬ</button>
            </div>
          </div>
         </form>
        </div>

      </div>
        `;

    container.innerHTML = html;
    document.getElementById("buyOrderDoorContainer").append(containerDoor);
    document.getElementById("closeBuyOrder").onclick = () => {
      container.innerHTML = "";
    };

    document.getElementById("orderBuyForm").onsubmit = (e) => {
      e.preventDefault()
      let objSend = {
        name: e.target[0].value,
        surname: e.target[1].value,
        phone: e.target[2].value,
        email: e.target[3].value,
        adress: e.target[4].checked?e.target[5].value:null,
        installation: e.target[6].checked,
        measurement: e.target[7].checked,
        comment: e.target[8].value,
      }
      console.log(objSend)
    };
  }
}
