import { changePrice } from "../../controlsMaterial/controlsMaterials.js";
export default class PanelLeftDoors {
  constructor(data, render) {
    this.data = data;
    this.renderDoor = render;
    this.alignItems = false;
    this.doorSelected = false;
  }

  render(container) {
    let html = `
        <div class="heading heading--primary">
            <h1>Конструктор дверей для шкафов купе</h1>
        </div>

        <div class="panel-content is-active panel--doors">
				<div class="panel-item data--doors-amount">

          <div class="panel-info-modal">
					<h3>Количество створок двери</h3>
						<i class="bi bi-question-circle-fill"></i>
						<div class="panel-item--popover px-4">
							<h4>Количество створок двери</h4>
							<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam sequi pariatur animi possimus cum laborum veniam placeat, quas eveniet rerum.</p>
						</div>
					</div>
					<div class="field data--sash-amount">
						<div class="input-select">
							<select id="door" class="input--select">
								<option value="1" ${this.data.qty == 1 && "selected"}>1</option>
								<option value="2" ${this.data.qty == 2 && "selected"}>2</option>
								<option value="3" ${this.data.qty == 3 && "selected"}>3</option>
								<option value="4" ${this.data.qty == 4 && "selected"}>4</option>
								<option value="5" ${this.data.qty == 5 && "selected"}>5</option>
							</select>
						</div>
						<label class="label--bottom" for="door">Размер двери 1760 х 831 мм</label>

					</div>
					<ul class="list list--checkbox list--door data--sash-type">
						<li class="list-item">
							<label>
								<input type="radio" value="doors-sash-type-1" name="doors" ${
                  this.data.doorLeafType == "doors-sash-type-1" && "checked"
                }>
								<span class="selected" title="doors-sash-type-1"></span> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> </label>
						</li>
						<li class="list-item">
							<label>
								<input type="radio" value="doors-sash-type-2" name="doors" ${
                  this.data.doorLeafType == "doors-sash-type-2" && "checked"
                }>
								<span class="selected" title="doors-sash-type-2"></span> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> </label>
						</li>
						<li class="list-item">
							<label>
								<input type="radio" value="doors-sash-type-3" name="doors" ${
                  this.data.doorLeafType == "doors-sash-type-3" && "checked"
                }>
								<span class="selected" title="doors-sash-type-3"></span> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> </label>
						</li>
						<li class="list-item">
							<label>
								<input type="radio" value="doors-sash-type-4" name="doors" ${
                  this.data.doorLeafType == "doors-sash-type-4" && "checked"
                }>
								<span class="selected" title="doors-sash-type-4"></span> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> </label>
						</li>
					</ul>
				</div>
				<svg viewBox="0 0 300 2" class="divider">
					<line stroke-dasharray="5" x1="0" x2="100%" y1="0" y2="0"></line>
					<line stroke-dasharray="5" x1="0" x2="100%" y1="1" y2="1"></line>
				</svg>
				<div class="panel-item">
          <div class="panel-info-modal">
					<h3>Разделители и перемычки</h3>
						<i class="bi bi-question-circle-fill"></i>
						<div class="panel-item--popover px-4">
							<h4>Разделители и перемычки</h4>
							<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam sequi pariatur animi possimus cum laborum veniam placeat, quas eveniet rerum.</p>
						</div>
					</div>

					<ul id="dropProfile" class="list list--checkbox list--divider-big data--divider-type">

						<li id="vertDrop" class="list-item d-flex justify-content-center">
							 <img src="${
                 this.data.imgObj.vert
               }" draggable="true" alt="Изображение типа конструкции"> 
						</li>

						<li id="horDrop" class="list-item d-flex justify-content-center">
							<img width="100%" src="${
                this.data.imgObj.hor
              }" draggable="true" alt="Изображение типа конструкции">
						</li>

					</ul>

					<!-- <ul class="list list--checkbox list--divider-small data--lintel-type">
						<li class="list-item">
							<label>
								<input type="radio" value="lintels-type-1" name="lintels">
								<span class="selected"></span> <img src="./img/divider-form-small-horizontal.png" alt="Изображение типа конструкции"> </label>
						</li>
						<li class="list-item">
							<label>
								<input type="radio" value="lintels-type-2" name="lintels">
								<span class="selected"></span> <img src="./img/divider-form-small-vertical.png" alt="Изображение типа конструкции"> </label>
						</li>
					</ul> -->

				</div>

        <svg viewBox="0 0 300 2" class="divider">
          <line stroke-dasharray="5" x1="0" x2="100%" y1="0" y2="0"></line>
          <line stroke-dasharray="5" x1="0" x2="100%" y1="1" y2="1"></line>
        </svg>
        <div class="panel-item">
        <div class="panel-info-modal">

					<h3>Толщина разделителей</h3>
						<i class="bi bi-question-circle-fill"></i>
						<div class="panel-item--popover px-4">
							<h4>Толщина разделителей</h4>
							<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam sequi pariatur animi possimus cum laborum veniam placeat, quas eveniet rerum.</p>
						</div>
					</div>
					<div class="field data--sash-amount">
						<div class="input-select">
							<select id="dividersThickness" class="input--select">
								<option value="8" ${this.data.dividersThickness == 8 && "selected"}>10</option>
								<option value="10" ${this.data.dividersThickness == 10 && "selected"}>17</option>
								<option value="12" ${this.data.dividersThickness == 12 && "selected"}>23</option>
								<option value="14" ${this.data.dividersThickness == 14 && "selected"}>50</option>
							</select>
						</div>
						<label class="label--bottom" for="dividersThickness">Толщина разделителей, мм</label>
					</div>
          </div>

        <svg viewBox="0 0 300 2" class="divider">
					<line stroke-dasharray="5" x1="0" x2="100%" y1="0" y2="0"></line>
					<line stroke-dasharray="5" x1="0" x2="100%" y1="1" y2="1"></line>
				</svg>

        <div class="panel-item">
          <div class="panel-info-modal">
            <h3>Выровнять размеры</h3>
               <i class="bi bi-question-circle-fill"></i>
               <div class="panel-item--popover px-4">
               <h4>Выровнять размеры</h4>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam sequi pariatur animi possimus cum laborum veniam placeat, quas eveniet rerum.</p>
          </div>
        </div>


        <ul class="list list--checkbox list--divider-big data--divider-type alignment">
          <li id="horAlignment" class="list-item d-flex justify-content-center" title="Выравнивать по горизонтали">
             <img src="images/calc_align_horis.png" alt="Изображение типа размера" draggable="false"> 
          </li>
          <li id="vertAlignment" class="list-item d-flex justify-content-center" title="Выравнивать по вертикали">
            <img src="images/calc_align_vert.png" alt="Изображение типа размера" draggable="false">
          </li>
        </ul>
        <p class="alignment-modal-error">Выберите дверь</p>
      </div>


			</div>
	
        `;
    container.innerHTML = html;

    this.alignmentProfile();

    document.querySelectorAll(".panel-info-modal").forEach((item) => {
      item.children[1].onmouseenter = (e) => {
        let infoPaste = document.getElementById("information");
        infoPaste.append(item.children[2].cloneNode(true));
        infoPaste.classList.add("active");
        infoPaste.style.top = `${e.pageY}px`;
        infoPaste.style.left = `${e.pageX}px`;
      };
      item.children[1].onmouseleave = () => {
        let infoPaste = document.getElementById("information");
        infoPaste.classList.remove("active");
        infoPaste.innerHTML = "";
      };
    });

    document.getElementById("door").addEventListener("change", (e) => {
      this.data.qty = e.target.value;
      this.data.materials = [];
      this.data.fittingsPrice = [];
      this.renderDoor(this.data.qty, this.data.height, this.data.width);
      changePrice(this.data.price);
    });
    
    // Change dividersThickness ---------------------------

    document.getElementById("dividersThickness").onchange = e =>{
      let diferentSize =  e.target.value - this.data.dividersThickness

        Array.from(document.getElementsByClassName("imgBackDoor")).forEach(el=>{
          const horAlignment = document.getElementById("horAlignment");
          const vertAlignment = document.getElementById("vertAlignment");
          this.doorSelected = el
          horAlignment.dispatchEvent(new Event('click'))
          vertAlignment.dispatchEvent(new Event('click'))
        })
       
        let vertProfile = Array.from(document.querySelectorAll(".control_profile.vertical_profile")).sort((a,b)=>a.getBoundingClientRect().left - b.getBoundingClientRect().left)
        let horProfile = Array.from(document.querySelectorAll(".control_profile.horizontal_profile")).sort((a,b)=>a.getBoundingClientRect().top - b.getBoundingClientRect().top)
        vertProfile.forEach(el=>{

          let procentLeft =  diferentSize * 100/el.closest(".imgBackDoor").offsetWidth
          let {elementRight} = this.valditationParamaters(el)
          elementRight.forEach(item=>{
            let left = item.offsetLeft*100/el.closest(".imgBackDoor").offsetWidth
            item.style.left = left+procentLeft + "%"
            item.style.width = item.offsetWidth*100/el.closest(".imgBackDoor").offsetWidth - procentLeft + "%"
          })
          el.style.width = e.target.value + "px"
        })
  
        horProfile.forEach(el=>{
          let procentTop = diferentSize * 100/el.closest(".imgBackDoor").offsetHeight
          let {elementBottom} = this.valditationParamaters(el)
          elementBottom.forEach(item=>{
            let top = item.offsetTop*100/el.closest(".imgBackDoor").offsetHeight
            item.style.top = top+procentTop + "%"
            item.style.height = item.offsetHeight*100/el.closest(".imgBackDoor").offsetHeight - procentTop + "%"
          })
          el.style.height = e.target.value + "px"
        })
        this.data.dividersThickness = +e.target.value
        this.doorSelected = false
    }

    // Change dividersThickness ---------------------------

    Array.from(
      document.querySelector(".list.list--checkbox.list--door.data--sash-type")
        .children
    ).forEach((item) => {
      item.addEventListener("click", (e) => {
        this.data.doorLeafType = e.currentTarget.querySelector("input").value;
      });
    });
  }

  drop(status) {
    const container = document.querySelector("#finalDoor");
    const dropProfile = document.getElementById("dropProfile");
    if (status) {
      container.removeEventListener("dragover", this.dragover, false);
      dropProfile.removeEventListener("dragstart", this.dragstart, false);
      container.removeEventListener("drop", this.dropContainer);
      container.ondrop = null;
      return;
    }
    container.addEventListener("dragover", this.dragover);
    dropProfile.addEventListener("dragstart", this.dragstart);
    container.ondrop = this.dropContainer.bind(this);
  }

  dragover(ev) {
    ev.preventDefault();
  }

  dragstart(ev) {
    ev.dataTransfer.setData("profile", [
      ev.target.parentElement.id,
      ev.target.src,
    ]);
  }

  dropContainer(ev) {
    const vertProfile = this.data.vertPrice;
    const horProfile = this.data.horPrice;
    ev.preventDefault();

    let profile = ev.dataTransfer.getData("profile").split(",");

    if (
      ev.target.className == "bacground-image" ||
      ev.target.className == "multi"
    ) {
      if (profile[0] == "horDrop") {
        let div = document.createElement("div");
        div.classList.add("horizontal_profile");
        div.classList.add("control_profile");
        div.id = Date.now();
        div.style.backgroundImage = `url(${profile[1]})`;
        div.style.backgroundSize = "100%"
        div.style.zIndex = 2000;
        div.style.position = "absolute";
        div.style.height = this.data.dividersThickness + "px";
        div.style.width = "100%";

        div.draggable = true;
        this.data.materials = this.data.materials.map((item) => {
          if (item.hor) {
            return { ...item, price: item.price + horProfile };
          }
          return item;
        });
        !this.data.materials.some((item) => item.hor) &&
          this.data.materials.push({ hor: true, price: horProfile });

        div.ondragstart = (ev) => {
          ev.dataTransfer.setData("recProf", ev.target.id);
        };

        let target = ev.target.closest(".imgBackDoor");
        let divContainerTop = document.createElement("div");
        let divContainerBottom = document.createElement("div");

        divContainerTop.style.position = "absolute";
        divContainerTop.style.zIndex = 1;
        divContainerTop.classList.add("multi");
        divContainerTop.draggable = true;

        divContainerBottom.style.position = "absolute";
        divContainerBottom.style.zIndex = 1;
        divContainerBottom.classList.add("multi");
        divContainerBottom.draggable = true;

        if (ev.target.className == "bacground-image") {
          // div.style.top = (ev.offsetY * 100) / ev.target.offsetHeight + "%";
          // divContainerTop.style.top = 0;
          // divContainerTop.style.width =
          //   div.getBoundingClientRect().width + "px";
          // divContainerTop.style.height = div.style.top;
          // divContainerBottom.style.setProperty(
          //   "top",
          //   `calc(${(ev.offsetY * 100) / ev.target.offsetHeight}% + 10px)`
          // );
          // divContainerBottom.style.width =
          //   div.getBoundingClientRect().width + "px";
          // divContainerBottom.style.setProperty(
          //   "height",
          //   `calc(${100 - parseFloat(div.style.top)}% - 10px)`
          // );
          // divContainerTop.dataset.multiTop = div.id;
          // divContainerBottom.dataset.multiBottom = div.id;
          // ev.target
          //   .closest(".imgBackDoor")
          //   .prepend(divContainerTop, divContainerBottom);
          // this.moveProfile(ev.target.closest(".imgBackDoor"), div, true);
        } else {
          let procentEventY = (ev.offsetY * 100) / target.offsetHeight;
          let topCorect =
            ((ev.target.offsetTop + ev.target.offsetHeight) * 100) /
            target.offsetHeight;
          let targetTop =
            ((ev.target.offsetTop + ev.offsetY + this.data.dividersThickness) * 100) /
            ev.target.parentElement.offsetHeight;
          if (topCorect > targetTop) {
            target.prepend(div);
            div.style.top =
              ((ev.target.offsetTop + ev.offsetY) * 100) /
                ev.target.parentElement.offsetHeight +
              "%";

            divContainerTop.style.setProperty(
              "top",
              `calc(${div.style.top} - ${procentEventY}%)`
            );
            divContainerTop.style.width =
              (ev.target.offsetWidth * 100) / div.parentElement.offsetWidth +
              "%";
            divContainerTop.style.height = procentEventY + "%";
            divContainerTop.style.left =
              (ev.target.offsetLeft * 100) / div.parentElement.offsetWidth +
              "%";

            divContainerBottom.style.setProperty(
              "top",
              `calc(${div.style.top} + ${this.data.dividersThickness}px)`
            );
            divContainerBottom.style.width =
              (ev.target.offsetWidth * 100) / div.parentElement.offsetWidth +
              "%";
            divContainerBottom.style.setProperty(
              "height",
              `calc(${
                (ev.target.offsetHeight * 100) /
                  div.parentElement.offsetHeight -
                procentEventY
              }% - ${this.data.dividersThickness}px)`
            );
            divContainerBottom.style.left =
              (ev.target.offsetLeft * 100) / div.parentElement.offsetWidth +
              "%";
            div.style.width =
              (ev.target.offsetWidth * 100) / div.parentElement.offsetWidth +
              "%";
            div.style.left =
              (ev.target.offsetLeft * 100) / div.parentElement.offsetWidth +
              "%";
            ev.target
              .closest(".imgBackDoor")
              .prepend(divContainerTop, divContainerBottom);
            this.moveProfile(ev.target.closest(".imgBackDoor"), div, true);
            if (ev.target.id) {
              this.data.materials.forEach((item, index) => {
                if (item.idDoor == ev.target.id) {
                  this.data.materials.splice(index, 1);
                }
              });
            }
            changePrice(this.data.price);
            ev.target.remove();
          }
        }
      } else if (profile[0] == "vertDrop") {
        let div = document.createElement("div");
        div.classList.add("vertical_profile");
        div.classList.add("control_profile");
        div.style.zIndex = 2000;
        div.id = Date.now();
        div.style.backgroundImage = `url(${profile[1]})`;
        div.style.backgroundSize = "100%"
        div.style.position = "absolute";
        div.style.height = "100%";
        div.style.width = this.data.dividersThickness + "px";
        div.draggable = true;
        this.data.materials = this.data.materials.map((item) => {
          if (item.vert) {
            return { ...item, price: item.price + vertProfile };
          }
          return item;
        });
        !this.data.materials.some((item) => item.vert) &&
          this.data.materials.push({ vert: true, price: vertProfile });

        div.ondragstart = (ev) => {
          ev.dataTransfer.setData("recProf", ev.target.id);
        };
        let target = ev.target.closest(".imgBackDoor");
        let divContainerRight = document.createElement("div");
        let divContainerLeft = document.createElement("div");

        divContainerLeft.style.position = "absolute";
        divContainerLeft.style.zIndex = 1;
        divContainerLeft.classList.add("multi");
        divContainerLeft.draggable = true;

        divContainerRight.style.position = "absolute";
        divContainerRight.style.zIndex = 1;
        divContainerRight.classList.add("multi");
        divContainerRight.draggable = true;

        if (ev.target.className == "bacground-image") {
          // div.style.left = (ev.offsetX * 100) / ev.target.offsetWidth + "%";
          // divContainerLeft.style.left = 0;
          // divContainerLeft.style.width = div.style.left;
          // divContainerLeft.style.height = "100%";
          // divContainerRight.style.setProperty(
          //   "left",
          //   `calc(${(ev.offsetX * 100) / ev.target.offsetWidth}% + 10px)`
          // );
          // divContainerRight.style.setProperty(
          //   "width",
          //   `calc(${100 - parseFloat(div.style.left)}% - 10px)`
          // );
          // divContainerRight.style.height = "100%";
          // divContainerLeft.dataset.multiLeft = div.id;
          // divContainerRight.dataset.multiRight = div.id;
          // ev.target
          //   .closest(".imgBackDoor")
          //   .prepend(divContainerLeft, divContainerRight);
          // this.moveProfile(ev.target.closest(".imgBackDoor"), div);
        } else {
          let procentEventX = (ev.offsetX * 100) / target.offsetWidth;

          let leftCorect =
            ((ev.target.offsetLeft + ev.target.offsetWidth) * 100) /
            target.offsetWidth;
          let targetLeft =
            ((ev.target.offsetLeft + ev.offsetX + this.data.dividersThickness) * 100) /
            ev.target.parentElement.offsetWidth;
          if (leftCorect > targetLeft) {
            target.prepend(div);
            div.style.left =
              ((ev.target.offsetLeft + ev.offsetX) * 100) /
                ev.target.parentElement.offsetWidth +
              "%";

            divContainerLeft.style.setProperty(
              "left",
              `calc(${div.style.left} - ${procentEventX}%)`
            );
            divContainerLeft.style.width = procentEventX + "%";
            divContainerLeft.style.height =
              (ev.target.offsetHeight * 100) / div.parentElement.offsetHeight +
              "%";
            divContainerLeft.style.top =
              (ev.target.offsetTop * 100) / div.parentElement.offsetHeight +
              "%";

            divContainerRight.style.setProperty(
              "left",
              `calc(${div.style.left} + ${this.data.dividersThickness}px)`
            );
            divContainerRight.style.setProperty(
              "width",
              `calc(${
                (ev.target.offsetWidth * 100) / div.parentElement.offsetWidth -
                procentEventX
              }% - ${this.data.dividersThickness}px)`
            );
            divContainerRight.style.height =
              (ev.target.offsetHeight * 100) / div.parentElement.offsetHeight +
              "%";
            divContainerRight.style.top =
              (ev.target.offsetTop * 100) / div.parentElement.offsetHeight +
              "%";

            div.style.height =
              (ev.target.offsetHeight * 100) / div.parentElement.offsetHeight +
              "%";
            div.style.top =
              (ev.target.offsetTop * 100) / div.parentElement.offsetHeight +
              "%";

            ev.target
              .closest(".imgBackDoor")
              .prepend(divContainerLeft, divContainerRight);
            this.moveProfile(ev.target.closest(".imgBackDoor"), div);
            if (ev.target.id) {
              this.data.materials.forEach((item, index) => {
                if (item.idDoor == ev.target.id) {
                  this.data.materials.splice(index, 1);
                }
              });
            }
            changePrice(this.data.price);
            ev.target.remove();
          }
        }
      }
    }
  }

  moveProfile(container, divDoor, type) {
    let div = document.createElement("div");
    let input = document.createElement("input");
    let rightContainer = container.closest("#finalDoor");
    let widthDoor = this.data.width / this.data.qty;
    let heightDoor = this.data.height;
    div.dataset.idForRemoveProfile = divDoor.id;

    if (!type) {
      div.classList.add("topParams");
      div.append(input);
      container.closest(".imgBackDoor").append(div);
      div.style.width = `${divDoor.style.left}`;
      input.value = parseInt((parseInt(divDoor.style.left) * widthDoor) / 100);
      input.onchange = (e) => {
        let { elementLeft, elementRight, limitLeft, limitRight } =
          this.valditationParamaters(divDoor);
        if(!elementLeft.length || !elementRight.length) return
        let procentLeft =
          (limitLeft * 100) / container.getBoundingClientRect().width;
        let procentRight =
          (limitRight * 100) / container.getBoundingClientRect().width;
        let value = (e.currentTarget.value * 100) / widthDoor;
        if(!this.alignItems) {
          if (value > procentRight || value < procentLeft) return;
        }
        let oldWidth =
          (elementLeft[0].offsetWidth * 100) /
          container.getBoundingClientRect().width;
        elementLeft.forEach((elem) => {
          let width =
            value -
            (elem.offsetLeft * 100) / container.getBoundingClientRect().width;
          elem.style.width = width + "%";
        });
        let newWidth =
          (elementLeft[0].offsetWidth * 100) /
          container.getBoundingClientRect().width;
        elementRight.forEach((elem) => {
          let width =
            (elem.offsetWidth * 100) / container.getBoundingClientRect().width +
            (oldWidth - newWidth);
          elem.style.width = width + "%";
          elem.style.setProperty("left", `calc(${value}% + ${this.data.dividersThickness}px)`);
        });

        divDoor.style.left = `${value}%`;
        div.style.width = `${value}%`;
        input.value = Math.round(input.value)
      };
    } else {
      div.classList.add("rightParams");
      div.append(input);
      rightContainer.append(div);
      div.style.height = `${divDoor.style.top}`;
      input.value = parseInt((parseInt(divDoor.style.top) * heightDoor) / 100);
      input.onchange = (e) => {
        let { elementTop, elementBottom, limitTop, limitBottom } =
          this.valditationParamaters(divDoor);
        if(!elementTop.length || !elementBottom.length) return
        let procentTop =
          (limitTop * 100) / container.getBoundingClientRect().height;
        let procentBottom =
          (limitBottom * 100) / container.getBoundingClientRect().height;
        let value = (e.currentTarget.value * 100) / heightDoor;
        if(!this.alignItems) {
          if (value > procentBottom || value < procentTop) return;
        }
        let oldHeight =
          (elementTop[0].offsetHeight * 100) /
          container.getBoundingClientRect().height;
        elementTop.forEach((elem) => {
          let height =
            value -
            (elem.offsetTop * 100) / container.getBoundingClientRect().height;
          elem.style.height = height + "%";
        });
        let newHeight =
          (elementTop[0].offsetHeight * 100) /
          container.getBoundingClientRect().height;
        elementBottom.forEach((elem) => {
          let height =
            (elem.offsetHeight * 100) /
              container.getBoundingClientRect().height +
            (oldHeight - newHeight);
          elem.style.height = height + "%";
          elem.style.setProperty("top", `calc(${value}% + ${this.data.dividersThickness}px)`);
        });
        divDoor.style.top = `${value}%`;
        div.style.height = `${value}%`;
        input.value = Math.round(input.value)
      };
    }

    div.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    document
      .querySelectorAll(`div[data-id-for-remove-profile]`)
      .forEach((item) => {
        item.style.display = "none";
      });
    document.querySelector(
      `div[data-id-for-remove-profile="${divDoor.id}"]`
    ).style.display = "flex";

    document.addEventListener("click", () => {
      div.style.display = "none";
    });

    divDoor.addEventListener("click", (e) => {
      e.stopPropagation();
      document
        .querySelectorAll(`div[data-id-for-remove-profile]`)
        .forEach((item) => {
          item.style.display = "none";
        });
      document.querySelector(
        `div[data-id-for-remove-profile="${e.target.id}"]`
      ).style.display = "flex";
    });

    let dividersThickness = this.data.dividersThickness

    divDoor.onmousedown = (event) => {
      event.stopPropagation();
      event.currentTarget.style.boxShadow = "rgb(239 124 1) 0px 0px 12px";
      let shiftX = event.clientX - divDoor.getBoundingClientRect().left;
      let shiftY = event.clientY - divDoor.getBoundingClientRect().top;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      // divDoor.addEventListener("mouseleave", onMouseUp);
      dividersThickness = this.data.dividersThickness

      let {
        elementTop,
        elementBottom,
        elementLeft,
        elementRight,
        limitTop,
        limitBottom,
        limitLeft,
        limitRight,
      } = this.valditationParamaters(divDoor);

      function onMouseMove(event) {
        let limitHor = 0.2;
        let limitVert = 1;
        let newLeft =
          ((event.clientX - shiftX - container.getBoundingClientRect().left) *
            100) /
          container.getBoundingClientRect().width;
        let newTop =
          ((event.clientY - shiftY - container.getBoundingClientRect().top) *
            100) /
          container.getBoundingClientRect().height;

        if (!type) {
          let procentLeft =
            (limitLeft * 100) / container.getBoundingClientRect().width;
          let procentRight =
            (limitRight * 100) / container.getBoundingClientRect().width;
          if (newLeft < procentLeft + limitVert) {
            newLeft = procentLeft + limitVert;
          } else if (newLeft > procentRight - limitVert) {
            newLeft = procentRight - limitVert;
          }
          if (elementLeft.length) {
            let oldWidth =
              (elementLeft[0].offsetWidth * 100) /
              container.getBoundingClientRect().width;
            elementLeft.forEach((elem) => {
              let width =
                newLeft -
                (elem.offsetLeft * 100) /
                  container.getBoundingClientRect().width;
              elem.style.width = width + "%";
            });
            let newWidth =
              (elementLeft[0].offsetWidth * 100) /
              container.getBoundingClientRect().width;
            elementRight.forEach((elem) => {
              let width =
                (elem.offsetWidth * 100) /
                  container.getBoundingClientRect().width +
                (oldWidth - newWidth);
              elem.style.width = width + "%";
              elem.style.setProperty("left", `calc(${newLeft}% + ${dividersThickness}px)`);
            });

            divDoor.style.left = newLeft + "%";
            div.style.width = newLeft + "%";
            input.value = parseInt((parseInt(newLeft) * widthDoor) / 100);
          }
        } else {
          let procentTop =
            (limitTop * 100) / container.getBoundingClientRect().height;
          let procentBottom =
            (limitBottom * 100) / container.getBoundingClientRect().height;
          if (newTop < procentTop + limitHor) {
            newTop = procentTop + limitHor;
          } else if (newTop > procentBottom - limitHor) {
            newTop = procentBottom - limitHor;
          }

          if (elementTop.length) {
            let oldHeight =
              (elementTop[0].offsetHeight * 100) /
              container.getBoundingClientRect().height;
            elementTop.forEach((elem) => {
              let height =
                newTop -
                (elem.offsetTop * 100) /
                  container.getBoundingClientRect().height;
              elem.style.height = height + "%";
            });
            let newHeight =
              (elementTop[0].offsetHeight * 100) /
              container.getBoundingClientRect().height;
            elementBottom.forEach((elem) => {
              let height =
                (elem.offsetHeight * 100) /
                  container.getBoundingClientRect().height +
                (oldHeight - newHeight);
              elem.style.height = height + "%";
              elem.style.setProperty("top", `calc(${newTop}% + ${dividersThickness}px)`);
            });

            divDoor.style.top = newTop + "%";
            div.style.height = newTop + "%";
            input.value = parseInt((parseInt(newTop) * heightDoor) / 100);
          }
        }
      }

      function onMouseUp() {
        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("mousemove", onMouseMove);
        divDoor.style.boxShadow = null;
      }
    };
    
    // function valditationParamaters(target) {
    //   let elementTop = [];
    //   let elementBottom = [];
    //   let elementLeft = [];
    //   let elementRight = [];
    //   Array.from(target.parentElement.children).forEach((item) => {
    //     console.log(item.offsetLeft, target.offsetLeft + dividersThickness , dividersThickness)
    //     if (
    //       (item.classList.contains("multi") ||
    //         item.classList.contains("vertical_profile")) &&
    //       (item.offsetTop + item.offsetHeight == target.offsetTop ||
    //         item.offsetTop + item.offsetHeight == target.offsetTop + 1 ||
    //         item.offsetTop + item.offsetHeight == target.offsetTop - 1) &&
    //       target.offsetLeft + target.offsetWidth >= item.offsetLeft
    //     ) {
    //       elementTop.push(item);
    //     } else if (
    //       (item.classList.contains("multi") ||
    //         item.classList.contains("vertical_profile")) &&
    //       item.offsetTop == target.offsetTop + dividersThickness &&
    //       target.offsetLeft + target.offsetWidth >= item.offsetLeft
    //     ) {
    //       elementBottom.push(item);
    //     } else if (
    //       (item.classList.contains("multi") ||
    //         item.classList.contains("horizontal_profile")) &&
    //       (item.offsetLeft + item.offsetWidth == target.offsetLeft ||
    //         item.offsetLeft + item.offsetWidth == target.offsetLeft + 1 ||
    //         item.offsetLeft + item.offsetWidth == target.offsetLeft - 1) &&
    //       target.offsetTop + target.offsetHeight >= item.offsetTop && target.offsetTop <= item.offsetTop
    //     ) {
    //       elementLeft.push(item);
    //     } else if (
    //       (item.classList.contains("multi") ||
    //         item.classList.contains("horizontal_profile")) &&
    //       (item.offsetLeft == target.offsetLeft + dividersThickness ||
    //         item.offsetLeft == target.offsetLeft + dividersThickness + 1 ||
    //         item.offsetLeft == target.offsetLeft + dividersThickness - 1) &&
    //       target.offsetTop + target.offsetHeight >= item.offsetTop && target.offsetTop <= item.offsetTop
    //     ) {
    //       elementRight.push(item);
    //     }
    //   });
    //   let limitTop = elementTop.sort((a, b) => b.offsetTop - a.offsetTop)[0]
    //     ?.offsetTop;
    //   let limitBottom =
    //     elementBottom.sort((a, b) => a.offsetHeight - b.offsetHeight)[0]
    //       ?.offsetHeight +
    //     elementBottom.sort((a, b) => a.offsetHeight - b.offsetHeight)[0]
    //       ?.offsetTop -
    //       dividersThickness;
    //   let limitLeft = elementLeft.sort((a, b) => b.offsetLeft - a.offsetLeft)[0]
    //     ?.offsetLeft;
    //   let limitRight =
    //     elementRight.sort((a, b) => a.offsetWidth - b.offsetWidth)[0]
    //       ?.offsetWidth +
    //     elementRight.sort((a, b) => a.offsetWidth - b.offsetWidth)[0]
    //       ?.offsetLeft -
    //       dividersThickness;
    //   return {
    //     elementTop,
    //     elementBottom,
    //     elementLeft,
    //     elementRight,
    //     limitTop,
    //     limitBottom,
    //     limitLeft,
    //     limitRight,
    //   };
    // }

  }

  valditationParamaters(target) {
    let elementTop = [];
    let elementBottom = [];
    let elementLeft = [];
    let elementRight = [];
    Array.from(target.parentElement.children).forEach((item) => {
      if (
        (item.classList.contains("multi") ||
          item.classList.contains("vertical_profile")) &&
        (item.offsetTop + item.offsetHeight == target.offsetTop ||
          item.offsetTop + item.offsetHeight == target.offsetTop + 1 ||
          item.offsetTop + item.offsetHeight == target.offsetTop - 1) &&
        target.offsetLeft + target.offsetWidth >= item.offsetLeft && target.offsetLeft<=item.offsetLeft
      ) {
        elementTop.push(item);
      } else if (
        (item.classList.contains("multi") ||
          item.classList.contains("vertical_profile")) &&
        item.offsetTop == target.offsetTop + this.data.dividersThickness &&
        target.offsetLeft + target.offsetWidth >= item.offsetLeft && target.offsetLeft<=item.offsetLeft
      ) {
        elementBottom.push(item);
      } else if (
        (item.classList.contains("multi") ||
          item.classList.contains("horizontal_profile")) &&
        (item.offsetLeft + item.offsetWidth == target.offsetLeft ||
          item.offsetLeft + item.offsetWidth == target.offsetLeft + 1 ||
          item.offsetLeft + item.offsetWidth == target.offsetLeft - 1) &&
        target.offsetTop + target.offsetHeight >= item.offsetTop && target.offsetTop <= item.offsetTop
      ) {
        elementLeft.push(item);
      } else if (
        (item.classList.contains("multi") ||
          item.classList.contains("horizontal_profile")) &&
          (item.offsetLeft == target.offsetLeft + this.data.dividersThickness ||
            item.offsetLeft == target.offsetLeft + this.data.dividersThickness + 1 ||
            item.offsetLeft == target.offsetLeft + this.data.dividersThickness - 1) &&
        target.offsetTop + target.offsetHeight >= item.offsetTop && target.offsetTop <= item.offsetTop
      ) {
        elementRight.push(item);
      }
    });
    let limitTop = elementTop.sort((a, b) => b.offsetTop - a.offsetTop)[0]
      ?.offsetTop;
    let limitBottom =
      elementBottom.sort((a, b) => a.offsetHeight - b.offsetHeight)[0]
        ?.offsetHeight +
      elementBottom.sort((a, b) => a.offsetHeight - b.offsetHeight)[0]
        ?.offsetTop -
        this.data.dividersThickness;
    let limitLeft = elementLeft.sort((a, b) => b.offsetLeft - a.offsetLeft)[0]
      ?.offsetLeft;
    let limitRight =
      elementRight.sort((a, b) => a.offsetWidth - b.offsetWidth)[0]
        ?.offsetWidth +
      elementRight.sort((a, b) => a.offsetWidth - b.offsetWidth)[0]
        ?.offsetLeft -
        this.data.dividersThickness;
    return {
      elementTop,
      elementBottom,
      elementLeft,
      elementRight,
      limitTop,
      limitBottom,
      limitLeft,
      limitRight,
    };
  }

  alignmentProfile() {
    const widthDoor = this.data.width / this.data.qty;
    const heightDoor = this.data.height;
    const horAlignment = document.getElementById("horAlignment");
    const vertAlignment = document.getElementById("vertAlignment");
    const textError = document.querySelector(".alignment-modal-error");
    let timer = 0;

    horAlignment.onclick = (e) => {
      e.stopPropagation();
      this.alignItems = true
      const doorSelected = document.querySelector(".multi.isSelected")?.closest(".imgBackDoor") || this.doorSelected;
      if (!doorSelected) {
        textError.style.display = "block";
        textError.style.right = "initial";
        textError.style.left = "22px";
        clearTimeout(timer);

        timer = setTimeout(() => {
          textError.style.display = "none";
          textError.style.left = "initial";
          textError.style.right = "initial";
        }, 1000);
        return;
      }
      if(!doorSelected.querySelectorAll(".horizontal_profile.control_profile").length) return

      let sortElement = Array.from(
        doorSelected.querySelectorAll(".horizontal_profile.control_profile")
      ).sort(
        (a, b) =>
          (a.offsetTop * 100) / doorSelected.offsetHeight -
          (b.offsetTop * 100) / doorSelected.offsetHeight
      );

      let heightProfile = sortElement[0].offsetHeight*100/doorSelected.offsetHeight
      let qtyProfileForCalculate = (100-(heightProfile*sortElement.length))/(sortElement.length+1)

      let value = qtyProfileForCalculate
      sortElement.forEach(item=>{
        let input = document.querySelector(`div[data-id-for-remove-profile="${item.id}"]>input`)
        input.value = heightDoor*value/100
        input.dispatchEvent(new Event('change'))
        value += qtyProfileForCalculate+heightProfile
      })

      // SECOND VERSION-----------------------
      
      let elementLeft = []
      let heightVerticalProfile = {
        height:0,
        top:0,
        id:[]
      }
      let elementRight = []
      document.querySelectorAll(".vertical_profile.control_profile")?.forEach(target=>{
        if(target.offsetHeight*100/doorSelected.offsetHeight>heightVerticalProfile.height) {
          heightVerticalProfile.height = target.offsetHeight*100/doorSelected.offsetHeight
          heightVerticalProfile.top = target.offsetTop*100/doorSelected.offsetHeight
          heightVerticalProfile.id.pop()
          heightVerticalProfile.id.push(target.id)
        } else if(target.offsetHeight*100/doorSelected.offsetHeight==heightVerticalProfile.height) {
          heightVerticalProfile.id.push(target.id)
        }
        Array.from(doorSelected.children).forEach(item=>{

          if(item.classList.contains("horizontal_profile") &&
              (item.offsetLeft + item.offsetWidth == target.offsetLeft ||
              item.offsetLeft + item.offsetWidth == target.offsetLeft + 1 ||
              item.offsetLeft + item.offsetWidth == target.offsetLeft - 1) &&
              target.offsetTop + target.offsetHeight >= item.offsetTop && target.offsetTop<=item.offsetTop) {
              elementLeft.push({item,target})
            } else if(item.classList.contains("horizontal_profile") &&
            (item.offsetLeft == target.offsetLeft + target.offsetWidth ||
              item.offsetLeft == target.offsetLeft + target.offsetWidth + 1 ||
              item.offsetLeft == target.offsetLeft + target.offsetWidth - 1) &&
            target.offsetTop + target.offsetHeight >= item.offsetTop && target.offsetTop<=item.offsetTop) {
              elementRight.push({item,target})
            }

        })
      })

     heightVerticalProfile.id.forEach(item=>{
        let arrRemainingId =heightVerticalProfile.id.filter(i=>i!=item)
        let arrRemainingLeft = elementLeft.filter(i=>!arrRemainingId.includes(i.target.id)).filter(el=>document.getElementById(item).offsetLeft+document.getElementById(item).offsetWidth>el.item.offsetLeft && document.getElementById(item).offsetTop+document.getElementById(item).offsetHeight>el.item.offsetTop && document.getElementById(item).offsetTop<=el.item.offsetTop)
        let arrRemainingRight = elementRight.filter(i=>!arrRemainingId.includes(i.target.id)).filter(el=>document.getElementById(item).offsetLeft+document.getElementById(item).offsetWidth<=el.item.offsetLeft && document.getElementById(item).offsetTop+document.getElementById(item).offsetHeight>el.item.offsetTop && document.getElementById(item).offsetTop<=el.item.offsetTop)
        let top = document.getElementById(item).offsetTop*100/doorSelected.offsetHeight

        let qtyProfileForCalculateLeft = (heightVerticalProfile.height-(heightProfile*arrRemainingLeft.length))/(arrRemainingLeft.length+1)
        let valueLeft = top + qtyProfileForCalculateLeft
        arrRemainingLeft.sort((a,b)=>a.item.offsetTop-b.item.offsetTop).forEach(item=>{ 
          let input = document.querySelector(`div[data-id-for-remove-profile="${item.item.id}"]>input`)
          input.value = heightDoor*valueLeft/100
          input.dispatchEvent(new Event('change'))
          valueLeft += qtyProfileForCalculateLeft+heightProfile
        })

        let qtyProfileForCalculateRight = (heightVerticalProfile.height-(heightProfile*arrRemainingRight.length))/(arrRemainingRight.length+1)
        let valueRight = top + qtyProfileForCalculateRight
        arrRemainingRight.sort((a,b)=>a.item.offsetTop-b.item.offsetTop).forEach(item=>{
          let input = document.querySelector(`div[data-id-for-remove-profile="${item.item.id}"]>input`)
          input.value = heightDoor*valueRight/100
          input.dispatchEvent(new Event('change'))
          valueRight += qtyProfileForCalculateRight+heightProfile
        })
        
      })

    // SECOND VERSION-----------------------

      this.alignItems = false
    };

    vertAlignment.onclick = (e) => {
      e.stopPropagation();
      this.alignItems = true
      const doorSelected = document.querySelector(".multi.isSelected")?.closest(".imgBackDoor") || this.doorSelected;
      if (!doorSelected) {
        textError.style.display = "block";
        textError.style.left = "initial";
        textError.style.right = "22px";
        clearTimeout(timer);
        timer = setTimeout(() => {
          textError.style.display = "none";
          textError.style.left = "initial";
          textError.style.right = "initial";
        }, 1000);
        return;
      }
      if(!doorSelected.querySelectorAll(".vertical_profile.control_profile").length) return

      let sortElement = Array.from(
        doorSelected.querySelectorAll(".vertical_profile.control_profile")
      ).sort(
        (a, b) =>
          (a.offsetLeft * 100) / doorSelected.offsetWidth -
          (b.offsetLeft * 100) / doorSelected.offsetWidth
      );
      let widthProfile = sortElement[0].offsetWidth*100/doorSelected.offsetWidth
      let qtyProfileForCalculate = (100-(widthProfile*sortElement.length))/(sortElement.length+1)
      let value = qtyProfileForCalculate
      sortElement.forEach(item=>{
        let input = document.querySelector(`div[data-id-for-remove-profile="${item.id}"]>input`)
        input.value = widthDoor*value/100
        input.dispatchEvent(new Event('change'))
        value += qtyProfileForCalculate+widthProfile
      })

      // SECOND VERSION-----------------------

        let elementTop = []
        let widthHorizontalProfile = {
          width:0,
          left:0,
          id:[]
        }
        let elementBottom = []

        document.querySelectorAll(".horizontal_profile.control_profile")?.forEach(target=>{
          if(target.offsetWidth*100/doorSelected.offsetWidth>widthHorizontalProfile.width) {
            widthHorizontalProfile.width = target.offsetWidth*100/doorSelected.offsetWidth
            widthHorizontalProfile.left = target.offsetLeft*100/doorSelected.offsetWidth
            widthHorizontalProfile.id.pop()
            widthHorizontalProfile.id.push(target.id)
          } else if(target.offsetWidth*100/doorSelected.offsetWidth==widthHorizontalProfile.width) {
            widthHorizontalProfile.id.push(target.id)
          }
          Array.from(doorSelected.children).forEach(item=>{

            if(item.classList.contains("vertical_profile") &&
                (item.offsetTop + item.offsetHeight == target.offsetTop ||
                item.offsetTop + item.offsetHeight == target.offsetTop + 1 ||
                item.offsetTop + item.offsetHeight == target.offsetTop - 1) &&
                target.offsetLeft + target.offsetWidth >= item.offsetLeft && target.offsetLeft<=item.offsetLeft) {
                elementTop.push({item,target})
              } else if(item.classList.contains("vertical_profile") &&
              (item.offsetTop == target.offsetTop + target.offsetHeight ||
                item.offsetTop == target.offsetTop + target.offsetHeight + 1 ||
                item.offsetTop == target.offsetTop + target.offsetHeight - 1) &&
              target.offsetLeft + target.offsetWidth >= item.offsetLeft && target.offsetLeft<=item.offsetLeft) {
                elementBottom.push({item,target})
              }

          })
        })
        
        widthHorizontalProfile.id.forEach(item=>{
          let arrRemainingId = widthHorizontalProfile.id.filter(i=>i!=item)
          let arrRemainingTop = elementTop.filter(i=>!arrRemainingId.includes(i.target.id)).filter(el=>document.getElementById(item).offsetTop+document.getElementById(item).offsetHeight>el.item.offsetTop && document.getElementById(item).offsetLeft+document.getElementById(item).offsetWidth>el.item.offsetLeft && document.getElementById(item).offsetLeft<=el.item.offsetLeft)
          let arrRemainingBottom = elementBottom.filter(i=>!arrRemainingId.includes(i.target.id)).filter(el=>document.getElementById(item).offsetTop+document.getElementById(item).offsetHeight<=el.item.offsetTop && document.getElementById(item).offsetLeft+document.getElementById(item).offsetWidth>el.item.offsetLeft && document.getElementById(item).offsetLeft<=el.item.offsetLeft)
          let left = document.getElementById(item).offsetLeft*100/doorSelected.offsetWidth

          let qtyProfileForCalculateTop = (widthHorizontalProfile.width-(widthProfile*arrRemainingTop.length))/(arrRemainingTop.length+1)
          let valueTop = left + qtyProfileForCalculateTop
          arrRemainingTop.sort((a,b)=>a.item.offsetLeft-b.item.offsetLeft).forEach(item=>{ 
            let input = document.querySelector(`div[data-id-for-remove-profile="${item.item.id}"]>input`)
            input.value = widthDoor*valueTop/100
            input.dispatchEvent(new Event('change'))
            valueTop += qtyProfileForCalculateTop+widthProfile
        })

        let qtyProfileForCalculateBottom = (widthHorizontalProfile.width-(widthProfile*arrRemainingBottom.length))/(arrRemainingBottom.length+1)
        let valueBottom = left + qtyProfileForCalculateBottom
        arrRemainingBottom.sort((a,b)=>a.item.offsetLeft-b.item.offsetLeft).forEach(item=>{
            let input = document.querySelector(`div[data-id-for-remove-profile="${item.item.id}"]>input`)
            input.value = widthDoor*valueBottom/100
            input.dispatchEvent(new Event('change'))
            valueBottom += qtyProfileForCalculateBottom+widthProfile
          })
        })

      // SECOND VERSION-----------------------

      this.alignItems = false
    };
  }
}