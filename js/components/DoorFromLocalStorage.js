import { multiDivMutationObserver } from "../controlsMaterial/controlsMaterials.js";
import PanelLeftDoors from "./PanelLeft/PanelLeftDoors.js"

export default class DoorFromLocalStorage {
    constructor(html, data) {
        this.html = html
        this.data = data
    }

    render(container) {
        container.innerHTML = this.html
        document.querySelectorAll(".topParams, .rightParams").forEach(el=>{
          el.remove()
        })
        
        while(document.getElementById("topInfo")) {
          document.getElementById("topInfo").remove()
        }

        while(document.getElementById("heightInfo")) {
          document.getElementById("heightInfo").remove()
        }


        let virtualDiv = document.createElement("div")
        document.querySelectorAll(".imgBackDoor").forEach(item=>{
          multiDivMutationObserver(item,container)
          item.append(virtualDiv)
        })
        virtualDiv.remove()

        this.addEvents()
        this.addInfo(container)
        document.querySelectorAll(".topParams, .rightParams").forEach(el=>{
          el.style.display = "none"
        })
    }

    addEvents() {
        let controlProfile = document.querySelectorAll(".imgBackDoor .control_profile")
        controlProfile.forEach(elem=>{
            elem.ondragstart = (ev) => {
                ev.dataTransfer.setData("recProf", ev.target.id);
              };
              if(elem.classList.contains("horizontal_profile")) {
                new PanelLeftDoors(this.data).moveProfile(elem.closest(".imgBackDoor"), elem, true)
            } else {
                new PanelLeftDoors(this.data).moveProfile(elem.closest(".imgBackDoor"), elem)
            }
        })
        document.querySelectorAll(".multi").forEach(item=>{
          item.ondragstart = (ev) => {
            ev.dataTransfer.setData("imgBackDoor", item.id);
          };
        })   
    }

    addInfo(container) {
        let div = document.querySelectorAll(".divDoor")
        div.forEach(divDoor=>{
            divDoor.onmouseenter = () => {
                let topInfo = document.createElement("div");
                topInfo.id = "topInfo";
                let p = document.createElement("p");
                p.innerText = parseInt(this.data.width / this.data.qty);
                topInfo.append(p);
                divDoor.prepend(topInfo);
          
                let heightInfo = document.createElement("div");
                heightInfo.id = "heightInfo";
                let pHeight = document.createElement("p");
                pHeight.innerText = parseInt(this.data.height);
                heightInfo.append(pHeight);
                container.append(heightInfo);
              };
              
              divDoor.onmouseleave = () => {
                try {
                  divDoor.removeChild(document.getElementById("topInfo"));
                  container.removeChild(document.getElementById("heightInfo"));
                } catch(e) {
                  return
                }  
              };
        })
    }
}