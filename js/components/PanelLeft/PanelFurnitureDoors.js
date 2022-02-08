import Furniture from "../Furniture/Furnitue.js";

export default class PanelFurnitureDoors {
  constructor(data) {
    this.data = data;
  }

  render(container) {
    let li = this.data.fittings.map(
      (item) =>
        `
	<li class="list-item" data-id-fitting = ${item.id}>
  ${this.data.fittingsPrice.some(elem=>elem.idFitting == item.id)?`<i class="bi bi-check"></i>`:""}
		<span>${item.name}</span>
  
		<div class="image image--furniture-1">
			<img src="${item.imgBack}" alt="${item.name}">
		</div>
	</li>
	`
    );

    let html = `
        <div class="heading heading--primary">
            <h1>Конструктор дверей для шкафов купе</h1>
        </div>

        <div class="panel-content panel--furniture is-active" >
				<ul id="fittingContainer" class="list list--furniture">
					${li.join("")}
				</ul>	
			</div>
        `;
    container.innerHTML = html;

    Array.from(document.getElementById("fittingContainer").children).forEach(
      (item) => {
        item.onclick = (e) => {
          let id = e.currentTarget.dataset.idFitting;
          let list = this.data.fittings.find((item) => item.id == id);
          new Furniture(list.listMaterial, list.name, this.data, id).render(container);
        };
      }
    );
  }
}
