import {changeMaterial} from "../controlsMaterial/controlsMaterials.js";
import { stateDoor } from "../controlsMaterial/stateDoor.js";

export default class RightPanel {
    constructor(data) {
        this.data = data
    }

    render(container) {
        let html = `
				<div class="panel-content is-active">
					<div class="heading heading--secondary" id="openRightPanel">
						<i class="icon icon--material"> <img class="svg--inline" src="./img/i-material.svg"
								alt="Иконка с материалами"> </i>
						<span>Материалы для фасада</span>
						<button class="button--open-panel-right" id="buttonOpenRightPanel">
							<i class="icon icon--close"> <img class="svg--inline" width="13px" src="./img/i-menu.svg"
									alt="Иконка панели"> </i>
						</button>
					</div>
					<ul id="listMaterialsRight" class="list list--materials">
                        <li class="list-item" id="fotofasad">
                            <img src="./images/fotofasad.png" alt="Изображение материала">
                            <span>Фотофасад</span>
                        </li>         
					</ul>
		        </div>
	
        `

        container.innerHTML = html

        document.getElementById("fotofasad").onclick=()=>{
            changeMaterial({name: "Фотофасад", img:stateDoor.fotos, fasad:true})
        }

        this.data.forEach(({ name, img, protectiveFilm, id }) => {
            let documetLi = document.createElement("li")
            documetLi.className = "list-item"
            documetLi.onclick = ()=>this.changeMaterial({name, img, protectiveFilm, id})
            documetLi.innerHTML =
                `<img src="${img[0].img}" alt="Изображение материала - ${name}">
                <span>${name}</span> 
                ${stateDoor.protectiveFilm.includes(id)?`<i class="bi bi-check list-item--protective-film" title="Защитная пленка добавлена"></i>`:``}`
                
            document.querySelector("#listMaterialsRight").append(documetLi)
        })

        document.getElementById("openRightPanel").onclick = ()=> {
            container.closest(".panel--right-total").classList.toggle("is-mobile-active")
        }

    }

    changeMaterial(props) {
        changeMaterial(props)
    }


}