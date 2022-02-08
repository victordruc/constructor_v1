import { changePrice } from "../../controlsMaterial/controlsMaterials.js";

export default class PanelLeftPanelMain {
  constructor(data, render) {
    this.data = data;
    this.renderDoor = render;
    this.maxHeight = 3500;
    this.minHeight = 1000;
    this.maxWidth = 3500;
    this.minWidth = 1000;
    this.maxRailTop = 3000;
    this.minRailTop = 1000;
    this.maxRailBottom = 3000;
    this.minRailBottom = 1000;
	this.doorConstruction = data.constructionTypeDoor
  }

  render(container) {
    let html = `
        <div class="heading heading--primary">
            <h1>Конструктор дверей для шкафов купе</h1>
        </div>

        <div class="panel-content is-active panel--main">
				<form id="formValue">
				<div class="panel-item data--construction-type">
					<div class="panel-info-modal" data-show-popover="">
						<h3>Тип конструкции двери</h3>
						<i class="bi bi-question-circle-fill"></i>
						<div class="panel-item--popover px-4">
							<h4>Тип конструкции двери</h4>
							<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam sequi pariatur animi possimus cum laborum veniam placeat, quas eveniet rerum.</p>
						</div>
					</div>
					<ul class="list list--checkbox">
						<li class="list-item" title="Нижнеопорные">
							<label>
								<input type="radio" name="doors-construction-type" value="Нижнеопорные" ${(this.data.constructionTypeDoor == "Нижнеопорные") && "checked"}>
								<span class="selected"></span> <img src="./img/construction-type.png" alt="Изображение типа конструкции"> </label>
						</li>
						<li class="list-item" title="Подвесные">
							<label>
								<input type="radio" name="doors-construction-type" value="Подвесные" ${(this.data.constructionTypeDoor == "Подвесные") && "checked"}>
								<span class="selected"></span> <img src="./img/construction-type.png" alt="Изображение типа конструкции"> </label>
						</li>
						<li class="list-item" title="Навесные">
							<label>
								<input type="radio" name="doors-construction-type" value="Навесные" ${(this.data.constructionTypeDoor == "Навесные") && "checked"}>
								<span class="selected"></span> <img src="./img/construction-type.png" alt="Изображение типа конструкции"> </label>
						</li>
					</ul>
				</div>
				<svg viewBox="0 0 300 2" class="divider">
					<line stroke-dasharray="5" x1="0" x2="100%" y1="0" y2="0"></line>
					<line stroke-dasharray="5" x1="0" x2="100%" y1="1" y2="1"></line>
				</svg>
				<div class="panel-item data--opening-size">
				<div class="panel-info-modal">
					<h3>Размер проема</h3>
						<i class="bi bi-question-circle-fill"></i>
						<div class="panel-item--popover px-4">
							<h4>Размер проема</h4>
							<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam sequi pariatur animi possimus cum laborum veniam placeat, quas eveniet rerum.</p>
						</div>
					</div>

					<div class="field data--opening-h">
						<label for="height">Высота проёма, мм</label>
						<div class="input-icon">
							<input type="number" id="height" class="input--text" placeholder="${this.data.height}" value=${this.data.height}>
							<i class="icon icon--input"> <img class="svg--inline" width="20px" src="./img/i-s-height.svg" alt="Иконка размеров"> </i>
						</div>
					</div>

					<div class="field data--opening-w">
						<label for="width">Ширина проёма, мм</label>
						<div class="input-icon">
							<input type="number" id="width" class="input--text" placeholder="${this.data.width}" value=${this.data.width}>
							<i class="icon icon--input"> <img class="svg--inline" width="17px" src="./img/i-s-width.svg" alt="Иконка размеров"> </i>
						</div>
					</div>
					
				</div>
				<svg viewBox="0 0 300 2" class="divider">
					<line stroke-dasharray="5" x1="0" x2="100%" y1="0" y2="0"></line>
					<line stroke-dasharray="5" x1="0" x2="100%" y1="1" y2="1"></line>
				</svg>
				<div class="panel-item data--rail-size">
				<div class="panel-info-modal">
					<h3>Размер и тип рельсы</h3>
						<i class="bi bi-question-circle-fill"></i>
						<div class="panel-item--popover px-4">
							<h4>Размер и тип рельсы</h4>
							<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam sequi pariatur animi possimus cum laborum veniam placeat, quas eveniet rerum.</p>
						</div>
					</div>
					<div class="field data--rail-u">
						<label for="up">Длина верхней рельсы, мм</label>
						<div class="input-icon">
							<input type="number" id="up" placeholder=${this.data.railInfo.widthTop} value=${this.data.railInfo.widthTop} class="input--text">
							<i class="icon icon--input"> <img class="svg--inline" width="18px" src="./img/i-s-up.svg" alt="Иконка размеров"> </i>
						</div>
					</div>
					<div class="field data--rail-b">
						<label for="down">Длина нижней рельсы, мм</label>
						<div class="input-icon">
							<input type="number" id="down" placeholder=${this.data.railInfo.widthBottom} value=${this.data.railInfo.widthBottom} class="input--text">
							<i class="icon icon--input"> <img class="svg--inline" width="18px" src="./img/i-s-down.svg" alt="Иконка размеров"> </i>
						</div>
					</div>
					<div class="field data--rail-t">
						<label for="type">Тип рельсы</label>
						<div class="input-select">
							<select id="type" class="input--select">
								<option value="1" ${(this.data.railInfo.type == 1)&& "selected"}>1 рядная</option>
								<option value="2" ${(this.data.railInfo.type == 2)&& "selected"}>2 рядная</option>
							</select>
						</div>
					</div>
					<!--
					<ul class="list list--checkbox list--last">
						<li class="list-item">
							<label>
								<input type="radio" name="doors2">
								<span class="selected"></span> <img src="./img/construction-type.png" alt="Изображение типа конструкции"> </label>
						</li>
						<li class="list-item">
							<label>
								<input type="radio" name="doors2">
								<span class="selected"></span> <img src="./img/construction-type.png" alt="Изображение типа конструкции"> </label>
						</li>
						<li class="list-item">
							<label>
								<input type="radio" name="doors2">
								<span class="selected"></span> <img src="./img/construction-type.png" alt="Изображение типа конструкции"> </label>
						</li>
					</ul>
					-->
				</div>
				<div class="d-flex justify-content-center mt-2">
					<button type="submit" class="btn btn-outline-primary">СОХРАНИTЬ</button>
				</div>
				
				</form>
				
			</div>

	
        `;
    container.innerHTML = html;

	Array.from(document.querySelector(".list.list--checkbox").children).forEach(item=>{
		item.addEventListener("click",e=>{
			this.doorConstruction = e.currentTarget.querySelector("input").value
		})
	})

	document.querySelectorAll(".panel-info-modal").forEach(item=>{
		item.children[1].onmouseenter=(e)=>{
			let infoPaste = document.getElementById("information") 
			infoPaste.append(item.children[2].cloneNode(true))
			infoPaste.classList.add("active")
			infoPaste.style.top = `${e.pageY}px`
			infoPaste.style.left = `${e.pageX}px`
		}
		item.children[1].onmouseleave=()=>{
			let infoPaste = document.getElementById("information") 
			infoPaste.classList.remove("active")
			infoPaste.innerHTML=""
		}
	})

    document.getElementById("formValue").addEventListener("submit", (e) => {
      e.preventDefault();
      const taxtLabelWidth = "Ширина проёма, мм";
      const taxtLabelHeight = "Высота проёма, мм";

      const textLabelTopRail = "Длина верхней рельсы, мм";
      const textLabelBottomRail = "Длина нижней рельсы, мм";

      const labelWidth = document.querySelector("label[for=width]");
      const labelHeight = document.querySelector("label[for=height]");

      const labelRailTop = document.querySelector("label[for=up]");
      const labelRailBottom = document.querySelector("label[for=down]");

      const removeArrayClass = [
        labelWidth,
        labelHeight,
        labelRailTop,
        labelRailBottom,
      ];

      removeArrayClass.forEach((item) => item.classList.remove("alert-error"));

      labelWidth.innerText = taxtLabelWidth;
      labelHeight.innerText = taxtLabelHeight;
      labelRailTop.innerText = textLabelTopRail;
      labelRailBottom.innerText = textLabelBottomRail;

      if (e.target[4].value > this.maxWidth) {
        labelWidth.classList.add("alert-error");
        labelWidth.innerText = `Максималная ширина: ${this.maxWidth} мм`;
        return;
      } else if (e.target[4].value < this.minWidth) {
        labelWidth.classList.add("alert-error");
        labelWidth.innerText = `Минималная ширина: ${this.minWidth} мм`;
        return;
      } else if (e.target[3].value > this.maxHeight) {
        labelHeight.classList.add("alert-error");
        labelHeight.innerText = `Максималная высота: ${this.maxHeight} мм`;
        return;
      } else if (e.target[3].value < this.minHeight) {
        labelHeight.classList.add("alert-error");
        labelHeight.innerText = `Минималная высота: ${this.minHeight} мм`;
        return;
      } else if (e.target[5].value > this.maxRailTop) {
        labelRailTop.classList.add("alert-error");
        labelRailTop.innerText = `Максималная длина: ${this.maxRailTop} мм`;
      } else if (e.target[5].value < this.minRailTop) {
        labelRailTop.classList.add("alert-error");
        labelRailTop.innerText = `Минималная длина: ${this.minRailTop} мм`;
      } else if (e.target[6].value > this.maxRailBottom) {
        labelRailBottom.classList.add("alert-error");
        labelRailBottom.innerText = `Максималная длина: ${this.maxRailBottom} мм`;
      } else if (e.target[6].value < this.minRailBottom) {
        labelRailBottom.classList.add("alert-error");
        labelRailBottom.innerText = `Минималная длина: ${this.minRailBottom} мм`;
      }

      this.data.width = e.target[4].value;
      this.data.height = e.target[3].value;
      this.data.railInfo.widthTop = e.target[5].value;
      this.data.railInfo.widthBottom = e.target[6].value;
      this.data.railInfo.type = e.target[7].value;
	  this.data.constructionTypeDoor =  this.doorConstruction;
	  this.data.materials = []
	  this.data.fittingsPrice = []
      this.renderDoor(this.data.qty, this.data.height, this.data.width);

      changePrice(this.data.price);
    });
  }
}
