import PanelFurnitureDoors from "../PanelLeft/PanelFurnitureDoors.js";
import {changePrice} from "../../controlsMaterial/controlsMaterials.js"

export default class Furniture {
  constructor(data, type, dataBack, idType) {
    this.data = data;
    this.type = type;
    this.dataBack = dataBack;
    this.idType = idType;
  }

  render(container) {
    let li = this.data.map(
      (item) =>{
        let checked = this.dataBack.fittingsPrice.some(elem=>elem.id == item.id)
        return `<li class="list-item item-fitting">
            <label>
			<input type="radio" name="fitting" value="${item.id}" ${checked && "checked"}>
			<span class="selected" ${!item.availability&&`style="border-color:red; cursor: no-drop"`}></span> 
            <img class="list--image-fitting" src="${item.imgSrc}" title="${item.availability?`Цена: ${item.price} МДЛ`:"Нет в наличии"}" alt="Изображение фурнитуры"> 
            </label>    
        </li> `
    }
    );
    let html = `

        <div id="goBackFitting" class="heading heading--secondary is-route">
          <i class="icon icon--back">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -.5 15 11" class="svg--inline inlined-svg" role="img" aria-labelledby="title"><title>Иконка с материалами</title>
                <path d="M4.692,0.143 C4.894,-0.058 5.212,-0.058 5.414,0.143 C5.609,0.337 5.609,0.661 5.414,0.855 L1.755,4.500 L13.830,4.500 C14.112,4.500 14.343,4.723 14.343,5.004 C14.343,5.284 14.112,5.514 13.830,5.514 L1.755,5.514 L5.414,9.153 C5.609,9.355 5.609,9.679 5.414,9.872 C5.212,10.074 4.894,10.074 4.692,9.872 L0.167,5.364 C-0.028,5.169 -0.028,4.846 0.167,4.652 L4.692,0.143 Z"></path>
            </svg>
          </i>
          <span>${this.type.toUpperCase()}</span>
        </div>

        <div class="panel-item data--construction-type">
        <ul id="furnitureSelecter" class="list list--checkbox">

            ${li.join("")}

        </ul>
        </div>

        `;
    container.innerHTML = html;

    document.getElementById("goBackFitting").onclick=()=>{
        new PanelFurnitureDoors(this.dataBack).render(container)
    }

    document.getElementById("furnitureSelecter").onchange=(e)=>{
        let select = this.data.find(item=>item.id == e.target.value)

        if(!this.dataBack.fittingsPrice.length || !this.dataBack.fittingsPrice.some(item=>item.idFitting == this.idType)) {
            this.dataBack.fittingsPrice.push({
                id: select.id,
                price: select.price,
                name: select.name,
                idFitting: this.idType,
                nameFitting: this.type
            })
            this.dataBack.fittingsPrice = this.dataBack.fittingsPrice
        } else {
            this.dataBack.fittingsPrice= this.dataBack.fittingsPrice.map(element => {
                if(element.idFitting == this.idType) {
                    return {id: select.id,
                        price: select.price,
                        name: select.name,
                        idFitting: this.idType,
                        nameFitting: this.type}
                }
                return element
            });
        } 
        changePrice(this.dataBack.price) 
    }

  }
}
