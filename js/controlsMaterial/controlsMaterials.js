import { main } from "../app.js";
import { rightPanelRender } from "../app.js";
import { container } from "../app.js";
import { stateDoor } from "./stateDoor.js";
import Door from "../components/Door.js";
import RightPanelMaterialList from "../components/RightPanelMaterialList.js";
import { rightPanelPrincipal } from "../app.js";
import { needSaveProject } from "../app.js";

export function doorControl(
  qty = 5,
  height = 2100,
  width = 3000,
  imgObj = stateDoor.imgObj
) {
  container.innerHTML = "";
  main.remove();
  for (let i = 0; i < qty; i++) {
    main.addChildren(
      new Door(qty, i, imgObj.back, imgObj.vert, imgObj.hor, height, width)
    );
  }
  main.render();
}

export function changeMaterial(props, type, event) {
  rightPanelRender.remove();
  if (type === "rightPenel") {
    rightPanelRender.addChildren(rightPanelPrincipal);
    container.removeEventListener("drop", event);
  } else {
    rightPanelRender.addChildren(new RightPanelMaterialList(props));
  }
  rightPanelRender.render();
}

export function changePrice(objPrice) {
  let totalPrice = 0;
  for (let price in objPrice) {
    if (Array.isArray(objPrice[price])) {
      objPrice[price].forEach((item) => {
        let perimeter = 1

        if(document.getElementById(item.idDoor)) {
          let w = document.getElementById(item.idDoor).offsetWidth*100/document.getElementById(item.idDoor).closest(".imgBackDoor").offsetWidth
          let h = document.getElementById(item.idDoor).offsetHeight*100/document.getElementById(item.idDoor).closest(".imgBackDoor").offsetHeight
          let wM = (w*stateDoor.width/stateDoor.qty)/(100*1000)
          let hM = (h*stateDoor.height)/(100*1000)
          perimeter = wM*hM
        }

        totalPrice += (+item.price*perimeter);
        if(item.protectiveFilm) {
          totalPrice += (+stateDoor.protectiveFilmPrice*perimeter)
        }

      });
    } else {
      totalPrice += +objPrice[price];
    }
  }
  let arr = [];
  Math.round(totalPrice)
    .toString()
    .split("")
    .reverse()
    .forEach((item, index) => {
      if (index % 3 || index == 0) {
        arr.push(item);
      } else {
        arr.push("&nbsp;");
        arr.push(item);
      }
    });
  document.getElementById("totalPrice").innerHTML = arr.reverse().join("");
  return totalPrice;
}

export function multiDivMutationObserver(target, container) {
  const config = {
    attributes: true,
    childList: true,
    subtree: true,
  };

  const callback = function (mutationsList) {
    changePrice(stateDoor.price)
    needSaveProject.status = true
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        target.querySelectorAll(".multi").forEach((el) => {
          el.onclick = (e) => {
            if (!container.dataset.dropImage) {
              e.stopPropagation();
            } else {
              return;
            }
            container
              .querySelectorAll(".multi.isSelected")
              .forEach((item) => item.classList.remove("isSelected"));
            el.classList.add("isSelected");
            let divControlRight = document.createElement("div");
            divControlRight.classList.add("final-door-control-right");
            document
              .querySelectorAll(".final-door-control-right")
              .forEach((item) => item.remove());
            document
              .querySelectorAll(".img-foto-fasad")
              .forEach((item) => item.classList.remove("isSelected"));
            divControlRight.innerHTML = `
                <div data-control="rotate_material" title="Изменить размер">
                  <img src="images/rotate_control.png">
                </div>
              `;
            container.append(divControlRight);
            divControlRight.onclick = (e) => {
              e.stopPropagation();
              Array.from(e.currentTarget.children).forEach((item) => {
                switch (item.dataset.control) {
                  case "rotate_material":
                    let regExp = /[0-9]/g;
                    let result = el.style.transform
                      ? +el.style.transform.match(regExp).join("")
                      : 0;
                    result = result == 180 ? -180 : result;
                    el.style.transform = `rotate(${result + 180}deg)`;
                    break;
                }
              });
            };

            divControlRight.onmousedown = (e) => {
              divControlRight.children[0].style.backgroundColor = "white";
              divControlRight.children[0].children[0].style.filter =
                "invert(26%) sepia(70%) saturate(1162%) hue-rotate(323deg) brightness(92%) contrast(92%)";
            };

            divControlRight.onmouseup = (e) => {
              divControlRight.children[0].style.backgroundColor = null;
              divControlRight.children[0].children[0].style.filter = null;
            };

            let resetSingleDoor = document.querySelector(".reset-single-door");
            resetSingleDoor.classList.add("isActive");
            document.body.addEventListener(
              "click",
              () => {
                divControlRight.remove();
                el.classList.remove("isSelected");
                resetSingleDoor.classList.remove("isActive");
              },
              { once: true }
            );
          };
        });
      }
    }
  };

  const observer = new MutationObserver(callback);

  observer.observe(target, config);
}

export function resetSingleDoor(elem) {
  elem.onclick = (e) => {
    const door = document
      .querySelector(".multi.isSelected")
      .closest(".imgBackDoor");
    Array.from(door.children).forEach((el) => {
      if (el.classList.contains("bacground-image")) return;
      document
        .querySelector(`.rightParams[data-id-for-remove-profile="${el.id}"]`)
        ?.remove();
      el.remove();
    });
    let divMulti = document.createElement("div");
    divMulti.draggable = true;
    divMulti.classList.add("multi");
    divMulti.style.position = "absolute";
    divMulti.style.zIndex = 1;
    divMulti.style.height = 100 + "%";
    divMulti.style.width = 100 + "%";
    divMulti.style.left = 0 + "%";
    divMulti.style.top = 0 + "%";
    door.append(divMulti);

    let qtyHor = 0;
    let qtyVert = 0;
    let fotoRemaining = [];

    document.querySelectorAll(".imgBackDoor").forEach((item) => {
      Array.from(item.children).forEach((elem) => {
        if (elem.className == "vertical_profile control_profile") {
          qtyVert++;
        } else if (elem.className == "horizontal_profile control_profile") {
          qtyHor++;
        } else if (elem.className == "multi" && elem.id) {
          fotoRemaining.push(elem.id);
        }
      });
    });

    stateDoor.materials = stateDoor.materials.map((item) => {
      if (item.vert) {
        return { ...item, price: qtyVert * stateDoor.vertPrice };
      } else if (item.hor) {
        return { ...item, price: qtyHor * stateDoor.horPrice };
      }
      return item;
    });

    stateDoor.materials = stateDoor.materials.filter((item) => {
      if (item.idDoor && !fotoRemaining.includes(`${item.idDoor}`)) {
        return false;
      } else {
        return true;
      }
    });

    changePrice(stateDoor.price);
  };
}

export class ProjectManipulation {

  constructor(createProject, saveProject, openProject) {
    this.createProjectElement = createProject
    this.saveProjectElement = saveProject
    this.openProjectElement = openProject
    this.toastElementContainer = document.getElementById("toastElementContainer")
  }

  startEvents() {
    this.createProjectElement.onclick = this.createProject.bind(this)
    this.saveProjectElement.onclick = this.saveProject.bind(this)
    this.openProjectElement.onclick = this.openProject.bind(this)
  }

  createProject(e) {
    return new Promise((response,rejected)=>{

      const elementModal = document.getElementById("modalFasadEdit");
      if (elementModal.classList.contains("show")) return;
      let modal = new bootstrap.Modal(elementModal, {
        keyboard: false,
      });

      const image = elementModal.querySelector("img");
      let divInput = document.createElement("div");
      divInput.style.marginTop = "16px";
      let input = document.createElement("input");
      divInput.classList.add("field");
      input.classList.add("input--text");
      input.placeholder = "Название проекта";
      input.required = true;

      let label = document.createElement("label");
      label.innerText = "В название проекта не должно быть меньше 5 букв!";
      label.style.marginTop = 0;
      label.style.color = "red";
      label.style.display = "none";
      divInput.append(label, input);

      this.saveImage().then(res=>{
        image.src = res;
          elementModal.style.zIndex = 2000;
          elementModal.style.position = "absolute";
          elementModal
            .querySelector(".modal-body")
            .classList.add("flex-column");
          elementModal.querySelector(".modal-body").append(divInput);
          modal.show();
      }).catch(error=>{
        rejected(error)
        console.error("oops, something went wrong!", error)
      })

      elementModal.addEventListener(
        "hidden.bs.modal",
        () => {
          elementModal
            .querySelector(".modal-body")
            .classList.remove("flex-column");
          elementModal.querySelector(".modal-body").removeChild(divInput);
          modal.hide();
        },
        { once: true }
      );

      elementModal.querySelector(`button[data-bs-save="save"]`).onclick =
        () => {
          if (input.value.trim().length < 5) {
            label.style.display = "block";
            input.style.borderColor = "red";
            return;
          }
          let id = Date.now();
          let objSave = {
            id,
            userID: "user1",
            date: new Intl.DateTimeFormat("md").format(new Date()),
            name: input.value || "no name",
            img: image.src,
            stateDoor: { ...stateDoor },
            node: container.innerHTML,
          };
          localStorage.setItem("project-" + id, JSON.stringify(objSave));
          localStorage.setItem("openProject",id)
          needSaveProject.qty = true
          needSaveProject.status = false
          modal.hide();
          let nameProject = document.getElementById("nameProject")
          nameProject.style.display = "flex"
          nameProject.innerHTML = `Проект: ${objSave.name}`
          response("")
        };

    })
  }

  saveProject(e) {
    return new Promise((response,rejected)=>{
      let idLocalStorage = localStorage.getItem("openProject")
      if(!idLocalStorage) {
        const text = "У вас не создан проект, создать?"
        const btn = "СОЗДАТЬ"
        this.toastElement(text,btn).action.onclick = e=>this.createProject()
      } else {
        let thisData = JSON.parse(localStorage.getItem("project-" + idLocalStorage))
        this.toastElement(`<div class="spinner-border" style="color:var(--c-primary)" role="status"></div>`,null,{
          "border": "none",
          "background-color":"transparent",
          "box-shadow": "none"
        })
        this.saveImage().then(res=>{
          let objSave = {
            ...thisData,
            date: new Intl.DateTimeFormat("md").format(new Date()),
            img:res,
            stateDoor: {...stateDoor},
            node: container.innerHTML,
          }
          localStorage.setItem("project-" + idLocalStorage, JSON.stringify(objSave));
          let text = `Проект сохранен <i class="bi bi-check2-circle" style="color:green"></i>`
          this.toastElement(text)
          needSaveProject.status = false
          response("")
        }).catch(error=>{
          rejected(error)
          console.error("oops, something went wrong!", error)
        })
      }
    })
      
  }

  openProject(e) {
      let idLocalStorage = localStorage.getItem("openProject")
      if(needSaveProject.status && idLocalStorage) {
        e.preventDefault()
        const text = "У вас не сохранен проект, сохранить?"
        const btn = "СОХРАНИТЬ"
        let {action,dismiss} = this.toastElement(text,btn)
        action.onclick = e=>this.saveProject().then(res=>{
          setTimeout(()=>location.assign(location.origin+"/my_project.html"),300)
        })
        dismiss.onclick = e => location.assign(location.origin+"/my_project.html") 
      } else if (needSaveProject.status && !idLocalStorage) {
        e.preventDefault()
        const text = "У вас не создан проект, создать?"
        const btn = "СОЗДАТЬ"
        let {action,dismiss} = this.toastElement(text,btn)
        action.onclick = e=>this.createProject().then(res=>{
          setTimeout(()=>location.assign(location.origin+"/my_project.html"),300)
        })
        dismiss.onclick = e => location.assign(location.origin+"/my_project.html")
      }
  }

  saveImage() {
    return new Promise((res,rej) => {
      const elementAppend = document.getElementById("saveImages");
      elementAppend.innerHTML = "";
      const cloneNode = container.cloneNode(true);
      cloneNode.style.width = "1044px";
      cloneNode.style.height = "524px";
      cloneNode.querySelector(".final-door-control-right")?.remove();
      cloneNode.querySelectorAll(".rightParams, .topParams").forEach(elem=>elem.remove())
      cloneNode.querySelectorAll(".divDoor").forEach((item) => {
        item.style.position = "relative";
        item.style.left = 0;
        item.style.top = "10px";
        item.querySelector(".horizontal_profile").style.left = "10px";
      });
      elementAppend.append(cloneNode);
      domtoimage
        .toPng(cloneNode)
        .then(function (dataUrl) {
          res(dataUrl);
          elementAppend.innerHTML = ""
        })
        .catch(function (error) {
          rej(error)
          elementAppend.innerHTML = ""
        });
    });
  }

  toastElement(text,btn,style={}) {
    let styleValue = ""
    for(let key in style) {
      styleValue+=`${key}:${style[key]};`
    }
    this.toastElementContainer.innerHTML =  `
    <div id="toastMain" class="toast" role="alert" aria-live="assertive" aria-atomic="true" ${btn || `style="width:fit-content;${styleValue}"`} >
        <div class="toast-body" >
          ${text}
          <div class="mt-2 pt-2 border-top" ${btn || `style="display:none"`}>
            <button id="actionToastBtn" type="button" class="btn btn-outline-primary btn-sm me-2" data-bs-dismiss="toast">${btn}</button>
            <button id="dismissToastBtn" type="button" class="btn btn-outline-danger btn-sm me-2" data-bs-dismiss="toast">НЕТ</button>
            <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-dismiss="toast">ОТМЕНА</button>
          </div>
        </div>
    </div>
    `
    const toastElement = document.getElementById("toastMain")
    const toast = new bootstrap.Toast(toastElement)
    toast.show()
    return {
      action: document.getElementById("actionToastBtn"),
      dismiss: document.getElementById("dismissToastBtn")
    }
  }
};
