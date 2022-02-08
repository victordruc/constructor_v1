import MainDoor from "./components/MainDoor.js";
import MainRightPanel from "./components/MainRightPanel.js";
import RightPanel from "./components/RightPanel.js";
import { data } from "./data/data.js";
import { doorControl } from "./controlsMaterial/controlsMaterials.js";
import PanelLeft from "./components/PanelLeft/PanelLeft.js";
import { changePrice } from "./controlsMaterial/controlsMaterials.js";
import { stateDoor } from "./controlsMaterial/stateDoor.js";
import DoorFromLocalStorage from "./components/DoorFromLocalStorage.js";
import { resetSingleDoor } from "./controlsMaterial/controlsMaterials.js";
import { ProjectManipulation } from "./controlsMaterial/controlsMaterials.js";

const projectQty = document.getElementById("projectQty")

export let needSaveProject = new Proxy({status:false},{
  set(target,prop,val) {
    let nameProject = document.getElementById("nameProject")
    let display = nameProject.style.getPropertyValue("display")
    if(display && val) {
      nameProject.style.setProperty("--display-project-save","block")
    } else {
      nameProject.style.setProperty("--display-project-save","none")
    }
    if(prop == "qty") {
      let qtyProject = 0
      for (let key in localStorage) {
        if (key.includes("project-")) {
          qtyProject++
        }
      }
      if(qtyProject) {
        projectQty.style.display = "inline"
        projectQty.innerHTML = qtyProject
      } else {
        projectQty.style.display = "none"
      }
      return true
    }
    target[prop] = val;
    return true
  },
})

export const container = document.querySelector("#finalDoor")
const createProject = document.querySelector("#createProject")
const saveProject = document.querySelector("#saveProject")
const openProject = document.querySelector("#openProject")
const rightPanel = document.querySelector(".panel--right")
const panelLeft = document.querySelector("#leftPanel")
const singleDoor = document.querySelector("#resetSingleDoor")

export const main = new MainDoor(container);
export const rightPanelRender = new MainRightPanel(rightPanel);
export const rightPanelPrincipal = new RightPanel(data);

rightPanelRender.addChildren(rightPanelPrincipal);

const projectManipulation = new ProjectManipulation(createProject, saveProject, openProject)

document.addEventListener("DOMContentLoaded", () => {
  unloadDataFromLocalStorage();
  // doorControl(stateDoor.qty);
  rightPanelRender.render();
  new PanelLeft(panelLeft).changeMenu();
  changePrice(stateDoor.price);
  dragRecycli();
  resetSingleDoor(singleDoor)
  projectManipulation.startEvents()

  setTimeout(()=>{
    needSaveProject.qty = true
    needSaveProject.status = false
  },0)

});

function dragRecycli() {
  const reciclyContainer = document.querySelector(".recycled_img");
  reciclyContainer.addEventListener("dragover", (ev) => {
    ev.preventDefault();
  });
  reciclyContainer.addEventListener("drop", (ev) => {
    let fasad = ev.dataTransfer.getData("fasad");
    let recProf = ev.dataTransfer.getData("recProf");
    let imgBackDoor = ev.dataTransfer.getData("imgBackDoor");
    let dataSetInfoRemove = document.querySelector(
      `div[data-id-for-remove-profile="${recProf}"]`
    );
    if (recProf) {
      let id = document.getElementById(recProf);
      let stopRemove = 0

      function getAllSiblings(elem) {
        let sibs = [];  
        if(stopRemove>100) return
        stopRemove++
        let parentElem = elem.parentNode.firstChild;
        do {
          if (parentElem.nodeType === 3) continue;
          sibs.push(parentElem);
        } while ((parentElem = parentElem.nextSibling));
        sibs.forEach((el) => {
          if (
            (el.offsetHeight + el.offsetTop == elem.offsetTop ||
              el.offsetTop == elem.offsetTop + stateDoor.dividersThickness) &&
            !el.classList.contains("horizontal_profile") && !el.classList.contains("topParams") && !el.classList.contains("bacground-image")
          ) {
            document.querySelector(`[data-id-for-remove-profile="${el.id}"]`)?.remove()
            getAllSiblings(el);
            el.remove();
          } else if (
            (el.offsetWidth + el.offsetLeft == elem.offsetLeft ||
              el.offsetLeft == elem.offsetLeft + stateDoor.dividersThickness) &&
            !el.classList.contains("vertical_profile") && !el.classList.contains("topParams") && !el.classList.contains("bacground-image")
          ) {
            getAllSiblings(el);
            el.remove();
          }
        });
      }

      Array.from(id.parentElement.children).forEach((item) => {
        if (id.classList.contains("horizontal_profile")) {
          if (
            item.offsetHeight == id.offsetTop ||
            item.offsetTop - stateDoor.dividersThickness == id.offsetTop ||
            item.offsetHeight == id.offsetTop+1 ||
            item.offsetTop - stateDoor.dividersThickness == id.offsetTop+1 ||
            item.offsetHeight == id.offsetTop-1 ||
            item.offsetTop - stateDoor.dividersThickness == id.offsetTop-1 ||
            id.offsetTop == item.offsetHeight + item.offsetTop ||
            id.offsetTop+1 == item.offsetHeight + item.offsetTop ||
            id.offsetTop-1 == item.offsetHeight + item.offsetTop
          ) {
            document.querySelector(`[data-id-for-remove-profile="${item.id}"]`)?.remove()
            getAllSiblings(item);
            item.remove();
          }
        }

        if (id.classList.contains("vertical_profile")) {
          if (
            item.offsetWidth == id.offsetLeft ||
            item.offsetLeft - stateDoor.dividersThickness == id.offsetLeft ||
            item.offsetWidth == id.offsetLeft+1 ||
            item.offsetLeft - stateDoor.dividersThickness == id.offsetLeft+1 ||
            item.offsetWidth == id.offsetLeft-1 ||
            item.offsetLeft - stateDoor.dividersThickness == id.offsetLeft-1 ||
            id.offsetLeft == item.offsetWidth + item.offsetLeft ||
            id.offsetLeft == item.offsetWidth + item.offsetLeft ||
            id.offsetLeft == item.offsetWidth + item.offsetLeft
          ) {
            getAllSiblings(item);
            item.remove();
          }
        }
      });

      let parentElement = id.parentElement

      id.remove();

      function addElementAfterDelete(parentElement) {

        let arrDiv = []

        for (let i = 0; i < 100; i++) {
          arrDiv[i] = []
          for (let k = 0; k < 100; k++) {
            arrDiv[i][k] = false
          }
        }

        Array.from(parentElement.children).forEach(item => {
          if (item.classList.contains("multi") || item.classList.contains("control_profile")) {
            let topEl = Math.round(item.offsetTop * 100 / parentElement.offsetHeight)
            let leftEl = Math.round(item.offsetLeft * 100 / parentElement.offsetWidth)
            let heightEl = Math.round(item.offsetHeight * 100 / parentElement.offsetHeight)
            let widthEl = Math.round(item.offsetWidth * 100 / parentElement.offsetWidth)

            for (let i = topEl; i < topEl + heightEl; i++) {
              for (let k = leftEl; k < leftEl + widthEl; k++) {
                arrDiv[i][k] = item.id ? item.id : true
              }
            }

          }
        })

        arrDiv = arrDiv.map(itemP => itemP.map((itemS, index) => {
          if (!itemS && itemP[index - 1] === true && itemP[index + 1] === true) {
            return true
          } else if (!itemS && typeof itemP[index - 1] === "string" && itemP[index + 1] === true) {
            return itemP[index - 1]
          } else if (!itemS && typeof itemP[index + 1] === "string" && itemP[index - 1] === true) {
            return itemP[index + 1]
          } else if(!itemS && typeof itemP[index + 1] === "string" && typeof itemP[index - 1] === "string") {
            return itemP[index + 1]
          } else {
            return itemS
          }
        }))

        let x = 0
        let y = arrDiv.findIndex(row => {
          x = row.findIndex(col => !col)
          return x !== -1
        })

        let w = 0
        let h = 0
        while (arrDiv[y] && arrDiv[y][x + w] === false) w++
        while (arrDiv[y + h] && arrDiv[y + h][x] === false ) h++

        let top = 0
        let left = 0
        let width = 0
        let height = 0

        if(arrDiv[y-1]) {
          let element = document.getElementById(arrDiv[y-1][x])
          top = (element.offsetTop+element.offsetHeight)*100/parentElement.offsetHeight
        }
        if(arrDiv[y][x-1]) {
          let element = document.getElementById(arrDiv[y][x-1])
          left = (element.offsetLeft+element.offsetWidth)*100/parentElement.offsetWidth
        }
        if(arrDiv[y][x+w+1]) {
          let element = document.getElementById(arrDiv[y][x+w+1])
          width = element.offsetLeft*100/parentElement.offsetWidth - left
        } else if(!arrDiv[y][x+w+1]) {
          width = 100 - left
        }
        if(arrDiv[y+h+1]) {
          let element = document.getElementById(arrDiv[y+h+1][x])
          height = element.offsetTop*100/parentElement.offsetHeight - top
        } else if(!arrDiv[y][y+h+1]) {
          height = 100 - top
        }

        let divMulti = document.createElement("div");
        divMulti.draggable = true;
        divMulti.classList.add("multi");
        divMulti.style.position = "absolute";
        divMulti.style.zIndex = 1;
        divMulti.style.height = height + "%";
        divMulti.style.width = width + "%";
        divMulti.style.left = left + "%";
        divMulti.style.top = top + "%";
        parentElement.prepend(divMulti);
      }
   
      addElementAfterDelete(parentElement)
      
      let qtyHor = 0
      let qtyVert = 0
      let fotoRemaining = []
      // Array.from(parentElement.children).forEach(elem=>{
      //   if(elem.className == "vertical_profile control_profile") {
      //     qtyVert++
      //   } else if(elem.className == "horizontal_profile control_profile") {
      //     qtyHor++
      //   } else if(elem.className == "multi" && elem.id) {
      //     fotoRemaining.push(elem.id)
      //   }
      // })
      
      document.querySelectorAll(".imgBackDoor").forEach(item=>{
        Array.from(item.children).forEach(elem=>{
          if(elem.className == "vertical_profile control_profile") {
            qtyVert++
          } else if(elem.className == "horizontal_profile control_profile") {
            qtyHor++
          } else if(elem.className == "multi" && elem.id) {
            fotoRemaining.push(elem.id)
          }
        })
      })
     
      stateDoor.materials = stateDoor.materials.map((item) => {
        if (item.vert) {
          return { ...item, price: qtyVert*stateDoor.vertPrice };
        } else if (item.hor) {
          return { ...item, price: qtyHor*stateDoor.horPrice };
        }
        return item;
      });

      stateDoor.materials = stateDoor.materials.filter(item=>{
        if(item.idDoor && !fotoRemaining.includes(`${item.idDoor}`)) {
          return false
        } else {
          return true
        }
      })

      dataSetInfoRemove?.remove();
      changePrice(stateDoor.price);
      document.getElementById("topInfo").remove();
      document.getElementById("heightInfo").remove();
    } else if (imgBackDoor) {
      document.getElementById(imgBackDoor).style.backgroundImage = null;
      document.getElementById(imgBackDoor).removeAttribute("id");
      stateDoor.materials = stateDoor.materials.filter(
        (item) => item.idDoor != imgBackDoor
      );
      changePrice(stateDoor.price);
    } else if (fasad) {
      document.getElementById(fasad).remove();
      document.getElementById("topInfo").remove();
      document.getElementById("heightInfo").remove();
    }
  });
}

window.addEventListener("beforeprint", () => {
  let printTopInfo = document.createElement("div");
  printTopInfo.id = "printTopInfo";
  let p = document.createElement("p");
  p.innerText = stateDoor.width;
  printTopInfo.append(p);

  let printHeightInfo = document.createElement("div");
  printHeightInfo.id = "printHeightInfo";
  let pHeight = document.createElement("p");
  pHeight.innerText = stateDoor.height;
  printHeightInfo.append(pHeight);

  container.append(printHeightInfo);
  container.prepend(printTopInfo);
});

window.addEventListener("afterprint", () => {
  container.removeChild(document.getElementById("printTopInfo"));
  container.removeChild(document.getElementById("printHeightInfo"));
});


function unloadDataFromLocalStorage() {
  let nameProject = document.getElementById("nameProject")
  let openProject = JSON.parse(localStorage.getItem("openProject"));
  let dataDoor = JSON.parse(localStorage.getItem(`project-${openProject}`));

  if (!dataDoor && !openProject) {
    doorControl(stateDoor.qty);
    return;
  }

  for (let key in stateDoor) {
    if (key != "price") {
      stateDoor[key] = dataDoor.stateDoor[key];
    }
  }

  dataDoor.auxMaterials?data.push(...dataDoor.auxMaterials):null
  
  nameProject.style.display = "flex"
  nameProject.innerHTML = `Проект: ${dataDoor.name}`
  main.remove();
  main.addChildren(new DoorFromLocalStorage(dataDoor.node, stateDoor));
  main.render();

  stateDoor.materials=stateDoor.materials.filter(item=>{
    if(data.some(el=>el.id==item.idMaterials) || !item.id) {
      return true
    } else {
      document.getElementById(item.idDoor).style.backgroundImage = null
      document.getElementById(item.idDoor).removeAttribute("id")
      return false
    }
  })
}