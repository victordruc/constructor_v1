import { changeMaterial } from "../controlsMaterial/controlsMaterials.js";
import { stateDoor } from "../controlsMaterial/stateDoor.js";
import { changePrice } from "../controlsMaterial/controlsMaterials.js";
import Cropper from "../lib/cropper.js";

export default class RightPanelMaterialList {
  constructor(data) {
    this.data = data;
    this.checked = false;
  }

  render(container) {
    let html = `
        <div  class="panel-content is-active">
        <div id="goBackMaterials" class="heading heading--secondary is-route">
          <i class="icon icon--back">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -.5 15 11" class="svg--inline inlined-svg" role="img" aria-labelledby="title"><title>Иконка с материалами</title>
                <path d="M4.692,0.143 C4.894,-0.058 5.212,-0.058 5.414,0.143 C5.609,0.337 5.609,0.661 5.414,0.855 L1.755,4.500 L13.830,4.500 C14.112,4.500 14.343,4.723 14.343,5.004 C14.343,5.284 14.112,5.514 13.830,5.514 L1.755,5.514 L5.414,9.153 C5.609,9.355 5.609,9.679 5.414,9.872 C5.212,10.074 4.894,10.074 4.692,9.872 L0.167,5.364 C-0.028,5.169 -0.028,4.846 0.167,4.652 L4.692,0.143 Z"></path>
            </svg>
          </i>
          <span>${this.data.name.toUpperCase()}</span>
        </div>
        ${this.data.protectiveFilm?`
        <div class="form-check d-flex justify-content-center pt-3">
            <input id="inputProtectiveFilm" class="form-check-input" type="checkbox" value="${this.data.id}" ${stateDoor.protectiveFilm.includes(this.data.id) && "checked"}>
            <label class="form-check-label ps-2">
                Защитная пленка
            </label>
        </div>   
        `:``} 
          <div id="panelContentTextures">
            <ul id="imageContainer" class="list list--textures">
            </ul>
          </div>
        </div>`;

    container.innerHTML = html;

    this.data.protectiveFilm?document.getElementById("inputProtectiveFilm").onchange = this.protectiveFilm.bind(this):null
    
    document.getElementById("goBackMaterials").addEventListener("click", () => {
      changeMaterial(null, "rightPenel", this.dropFunction);
    });

    if(this.data.fasad) {
      let divAddImage = document.createElement("div")
      let button = document.createElement("button")
      let input = document.createElement("input")
      input.type="file"
      input.style.display= "none"
      button.innerText = "Загрузить изображение"
      button.classList.add("btn")
      divAddImage.classList.add("d-flex","justify-content-center", "fotofasad--add--image")
      button.onclick=(e)=>{
        input.click()
        e.preventDefault()
      }
      input.onchange=(input)=>{
        let documetLi = document.createElement("li");
        documetLi.className = "list-item";
        let reader = new FileReader()
        reader.readAsDataURL(input.currentTarget.files[0])
        reader.onloadend = function () {
          let id = Date.now()
          stateDoor.fotos.push({
            id,
            price: 0,
            img: reader.result,
            availability: true
          })
        documetLi.innerHTML = ` <img src="${reader.result}" data-price-material=${0} data-price-id=${id} data-dragable-fasad=true draggable = true alt="Изображение текстуры">`
        document.querySelector("#imageContainer").append(documetLi);
        }
        
      }
      divAddImage.append(button,input)
      document.getElementById("panelContentTextures").append(divAddImage) 
    }

    this.data.img.forEach((img) => {
      let documetLi = document.createElement("li");
      documetLi.className = "list-item";
      if(img.availability && !this.data.fasad) {
        documetLi.innerHTML = ` <img src="${img.img}" data-price-material=${img.price} data-price-id=${img.id} title="Цена: ${img.price} МДЛ" draggable = true alt="Изображение текстуры">
        `;
      } else if(!this.data.fasad) {
        documetLi.innerHTML = ` <img src="${img.img}" data-price-material=${img.price} data-price-id=${img.id} title="Нет в наличии" style="cursor: no-drop; border-color: red" draggable = true alt="Изображение текстуры">
        `;
      } else {
        documetLi.innerHTML = ` <img src="${img.img}" data-price-material=${img.price} data-price-id=${img.id} data-dragable-fasad=true draggable = true alt="Изображение текстуры">
        `;
      }
      document.querySelector("#imageContainer").append(documetLi);
    });
    this.drop();
    this.click();
  }

  drop() {
    const dropImg = document.getElementById("imageContainer");
    const container = document.querySelector("#finalDoor");

    container.ondragover =  (ev) => {
      ev.preventDefault();
    };

    dropImg.ondragstart = (ev) => {
      ev.dataTransfer.setData("img", ev.target.src);
      ev.dataTransfer.setData("img_id", ev.target.dataset.priceId);
      ev.dataTransfer.setData("img_price", ev.target.dataset.priceMaterial);
      ev.dataTransfer.setData("fasad",ev.target.dataset.dragableFasad)
    };

    container.addEventListener("drop", this.dropFunction)

    // container.ondrop =  (ev) => {
    //   ev.preventDefault();
    //   let data = ev.dataTransfer.getData("img");
    //   let id = ev.dataTransfer.getData("img_id");
    //   let price = ev.dataTransfer.getData("img_price");
    //   let dragableFasad = ev.dataTransfer.getData("fasad")
    //   // ------------------------ FotoFasad -------------------------
    //   if (ev.target.className == "bacground-image" || ev.target.className == "multi") {
    //     if(dragableFasad == "true" && data) {
    //       this.fotofasadControl(data,ev,container)
    //       return
    //     }
    //   // ------------------------ FotoFasad -------------------------

    //     if (data) {
    //       ev.target.style.backgroundImage = `url(${data})`;
    //       let existTargetDoor = ev.target.id;
    //       const idDoor = Date.now();

    //       stateDoor.materials = stateDoor.materials.map((item) => {
    //         if (item.idDoor == existTargetDoor) {
    //           return (item = { ...item, idDoor, price });
    //         }
    //         return item;
    //       });

    //       if (!existTargetDoor) {
    //         stateDoor.materials.push({ id, price, idDoor });
    //       }
    //       ev.target.id = idDoor;
    //       changePrice(stateDoor.price);
    //       ev.target.ondragstart = (ev) => {
    //         ev.dataTransfer.setData("imgBackDoor", ev.target.id);
    //       };
    //     }
    //   }
    // };
  }

  click() {
    const changeImage = document.getElementById("imageContainer");
    const container = document.querySelector("#finalDoor");
    let click
    let clickContainer
    let lastCheck = null;
    changeImage.addEventListener("click", click = (ev) => {
      lastCheck?.classList.remove("is-active");
      ev.target.parentElement.classList.add("is-active");
      lastCheck = ev.target.parentElement;
      let scrImage = ev.target.src;
      let dragableFasad = ev.target.dataset.dragableFasad
      container.style.boxShadow = "0 0 24px #ef7c01";
      container.dataset.dropImage = "true"
      let id = ev.target.dataset.priceId;
      let price = ev.target.dataset.priceMaterial;
      let idMaterials = this.data.id
      let protectiveFilm = this.data.checked
      container.removeEventListener("click", clickContainer)
      container.addEventListener(
        "click",
        clickContainer = (ev) => {
          if (ev.target.className !== "bacground-image" && ev.target.className !== "multi") return;

          // ------------------------ FotoFasad -------------------------

          // if (dragableFasad=="true") {
          //   this.fotofasadControl(scrImage,ev,container)
          //   container.style.boxShadow = null;
          //   delete container.dataset.dropImage
          //   return
          // }

          // ------------------------ FotoFasad -------------------------

          if(dragableFasad == "true") {
            changeImage.removeEventListener("click",click)
            this.cropImage(scrImage).then(res=>{
              scrImage = res
              changeImage.addEventListener("click",click)
              drops()
            }).catch(e=>{
              container.style.boxShadow = null;
              delete container.dataset.dropImage
              changeImage.addEventListener("click",click)
              return
            })
          } else {
            // changeImage.addEventListener("click",click)
            drops()
          }

          function drops() {
            ev.target.style.backgroundImage = `url(${scrImage})`;
          
            let existTargetDoor = ev.target.id;
            const idDoor = Date.now();
  
            stateDoor.materials = stateDoor.materials.map((item) => {
              if (item.idDoor == existTargetDoor) {
                return (item = { ...item, idDoor, price, idMaterials, protectiveFilm });
              }
              return item;
            });
  
            if (!existTargetDoor) {
              stateDoor.materials.push({ id, price, idDoor, idMaterials, protectiveFilm });
            }
            ev.target.id = idDoor;
            changePrice(stateDoor.price);
            
  
            ev.target.ondragstart = (ev) => {
              ev.dataTransfer.setData("imgBackDoor", ev.target.id);
            };
            container.style.boxShadow = null;
            delete container.dataset.dropImage
          }
        },
        { once: true }
      );
      
    })
    
    
  }

  dropFunction = (ev) => {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("img");
    let id = ev.dataTransfer.getData("img_id");
    let price = ev.dataTransfer.getData("img_price");
    let dragableFasad = ev.dataTransfer.getData("fasad");
    let idMaterials = this.data.id
    let protectiveFilm = this.checked
    
    if (ev.target.className == "bacground-image" || ev.target.className == "multi") {
    // ------------------------ FotoFasad -------------------------

    if(dragableFasad == "true" && data) {
        this.cropImage(data).then(res=>{
          data = res
          drops()
        }).catch(e=>{
          return
        })
      } else {
        drops()
      }

      // if(dragableFasad == "true" && data) {
      //   this.fotofasadControl(data,ev,container)
      //   return
      // }

    // ------------------------ FotoFasad -------------------------
      function drops() {
        if (data) {
          ev.target.style.backgroundImage = `url(${data})`;
          let existTargetDoor = ev.target.id;
          const idDoor = Date.now();
  
          stateDoor.materials = stateDoor.materials.map((item) => {
            if (item.idDoor == existTargetDoor) {
              return (item = { ...item, idDoor, price, idMaterials, protectiveFilm });
            }
            return item;
          });
  
          if (!existTargetDoor) {
            stateDoor.materials.push({ id, price, idDoor, idMaterials, protectiveFilm });
          }
          ev.target.id = idDoor;
          changePrice(stateDoor.price);
          ev.target.ondragstart = (ev) => {
            ev.dataTransfer.setData("imgBackDoor", ev.target.id);
          };
        }
      }
      

    }
  };


  fotofasadControl(data,ev,container) {
    let divForFasad = document.createElement("div")
    let img = document.createElement("img")
    img.classList.add("img-foto-fasad--image")
    img.src = `${data}`
    divForFasad.classList.add("img-foto-fasad")
    divForFasad.draggable = true

    divForFasad.style.zIndex = 2
    let divForControl = document.createElement("div")
    divForControl.classList.add("div-for-control")
    divForFasad.onclick=(e)=>{
      e.stopPropagation()
      document.querySelectorAll(".div-for-control").forEach(item=>{
        Array.from(item.children).forEach(item=>item.remove())
      })
      document.querySelectorAll(".img-foto-fasad").forEach(item=>item.classList.remove("isSelected"))
      e.currentTarget.classList.add("isSelected")
      
      let divControlRight = document.createElement("div")
      divControlRight.classList.add("final-door-control-right")
      divControlRight.innerHTML = `
        <div data-control="move">
          <svg version="1.2" baseProfile="tiny-ps" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28">
            <title>Переместить</title>
            <style>
            tspan { white-space:pre }
            .shp0 { fill: #ffffff } 
            </style>
            <path id="move" class="shp0" d="M27.14 14.36L23.86 17.26C23.6 17.5 23.19 17.48 22.95 17.21C22.71 16.95 22.73 16.54 23 16.3L25 14.52L14.33 14.52L14.33 25.19L16.11 23.19C16.34 22.93 16.75 22.91 17.02 23.14C17.29 23.37 17.31 23.79 17.08 24.06L14.17 27.33C14.16 27.35 14.14 27.37 14.12 27.39C13.85 27.63 13.44 27.6 13.2 27.33L10.29 24.06C10.05 23.79 10.08 23.38 10.34 23.14C10.61 22.9 11.02 22.93 11.26 23.19L13.03 25.19L13.03 14.52L2.36 14.52L4.36 16.3C4.62 16.54 4.65 16.95 4.42 17.21C4.18 17.48 3.77 17.5 3.5 17.27L0.22 14.36C0.2 14.35 0.19 14.33 0.17 14.31C-0.07 14.04 -0.04 13.63 0.22 13.39L3.5 10.49C3.77 10.25 4.18 10.27 4.42 10.54C4.66 10.8 4.63 11.21 4.36 11.45L2.36 13.23L13.03 13.23L13.03 2.56L11.25 4.56C11.02 4.82 10.61 4.84 10.34 4.61C10.08 4.38 10.05 3.96 10.29 3.69L13.19 0.42C13.21 0.4 13.23 0.38 13.25 0.36C13.51 0.12 13.92 0.15 14.16 0.42L17.07 3.69C17.31 3.96 17.29 4.37 17.02 4.61C16.75 4.85 16.34 4.82 16.1 4.56L14.33 2.56L14.33 13.23L25 13.23L22.99 11.45C22.73 11.21 22.71 10.8 22.94 10.54C23.17 10.27 23.59 10.25 23.86 10.48L27.14 13.39C27.16 13.41 27.17 13.43 27.19 13.44C27.43 13.71 27.41 14.12 27.14 14.36Z" />
          </svg>
        </div>
        <div data-control="rotate" title="Изменить размер">
          <img src="images/fasad_rot.png">
        </div>
        <div data-control="hor">
        <svg version="1.2" baseProfile="tiny-ps" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 28" width="24" height="28">
        <title>Отразить по горизонтали</title>
        <style>
          tspan { white-space:pre }
          .shp2 { fill: #ffffff } 
        </style>
        <path id="hor" class="shp2" d="M11.22 0.61L12.78 0.61L12.78 3.8L11.22 3.8L11.22 0.61ZM11.22 5.37L12.78 5.37L12.78 8.51L11.22 8.51L11.22 5.37ZM11.22 10.08L12.78 10.08L12.78 13.22L11.22 13.22L11.22 10.08ZM11.22 14.78L12.78 14.78L12.78 17.92L11.22 17.92L11.22 14.78ZM11.22 19.49L12.78 19.49L12.78 22.63L11.22 22.63L11.22 19.49ZM11.22 24.2L12.78 24.2L12.78 27.39L11.22 27.39L11.22 24.2ZM23.77 6.09L23.77 21.91L13.88 14L23.77 6.09ZM22.2 18.65L16.4 14L22.2 9.35L22.2 18.65ZM10.12 14L0.23 21.91L0.23 6.09L10.12 14ZM1.8 9.35L7.6 14L1.8 18.65L1.8 9.35Z" />
      </svg>
        </div>
      `
      
      let lastEl = null
      let timer=null
      Array.from(divControlRight.children).forEach(item=>{
        item.onclick=(e)=>{
          e.stopPropagation()
          divForControl.innerHTML=""
          lastEl?.classList.remove("isSelected")
          lastEl?.querySelector("img")?lastEl.querySelector("img").src = "images/fasad_rot.png":true
          if(e.currentTarget.querySelector("img")) {
            e.currentTarget.querySelector("img").src = "images/fasad_rot_click.png"
          }
          e.currentTarget.classList.add("isSelected")
          lastEl = e.currentTarget

          switch(e.currentTarget.dataset.control) {
            case "move":
            for(let i=0;i<4;i++) {
              let moveDiv = document.createElement("div")
              moveDiv.classList.add("fasad-control--move")
              let imgMoveDiv = document.createElement("img")
              imgMoveDiv.src="images/control_move.png"
              imgMoveDiv.style.transform = `rotate(${90*i}deg)`

              

              moveDiv.onclick=(e)=>{
                e.stopPropagation()
              }

              moveDiv.onmousedown=(e)=>{
                function move() {
                  let precision = -4
                  let leftImgPos=divForFasad.getBoundingClientRect().left-precision
                  let leftContPos=divForFasad.closest(".imgBackDoor").getBoundingClientRect().left
                  let rightImgPos=divForFasad.getBoundingClientRect().right+precision
                  let rightContPos=divForFasad.closest(".imgBackDoor").getBoundingClientRect().right
                  let topImgPos=divForFasad.getBoundingClientRect().top-precision
                  let topContPos=divForFasad.closest(".imgBackDoor").getBoundingClientRect().top
                  let bottomImgPos=divForFasad.getBoundingClientRect().bottom+precision
                  let bottomContPos=divForFasad.closest(".imgBackDoor").getBoundingClientRect().bottom
                  let left = parseInt(divForFasad.style.left||0)
                  let right = parseInt(divForFasad.style.right||0)
                  let top = parseInt(divForFasad.style.top||0)
                  let bottom = parseInt(divForFasad.style.bottom||0)
                  if(leftImgPos>leftContPos && i==3) {
                    divForFasad.style.left = `${left-10}px`
                  } else if(rightImgPos< rightContPos && i==1) {
                    divForFasad.style.right = `${right-10}px`
                  } else if(topImgPos>topContPos && i==0) {
                    divForFasad.style.top = `${top-10}px`
                  } else if(bottomImgPos<bottomContPos && i==2) {
                    divForFasad.style.bottom = `${bottom-10}px`
                  }
                }
                move()
                timer = setInterval(move,200)
              }
              moveDiv.onmouseleave =()=>{
                clearInterval(timer)
              }
              moveDiv.onmouseup =()=>{
                clearInterval(timer)
              }

              moveDiv.append(imgMoveDiv)
              divForControl.append(moveDiv)
            }
            break;
            case "rotate":
              for(let i=0;i<4;i++) {
                let extindsDiv = document.createElement("div")
                extindsDiv.classList.add("fasad-control--extinds")
                for(let j=0;j<2;j++) {
                  let divDouleContol = document.createElement("div")
                  let imgextindsDiv = document.createElement("img")
                  imgextindsDiv.src="images/minus_control.png"
                  divDouleContol.append(imgextindsDiv)
                  extindsDiv.append(divDouleContol)

                  
                  let target = null

                  divDouleContol.onclick=(e)=>{
                    e.stopPropagation()
                  }
                  
                  divDouleContol.onmousedown=(e)=>{
                    e.stopPropagation()
                    target = e?.currentTarget
                    changeSize()
                    function changeSize() {  
                      let changeOrientation = target.closest(".rotate")
                      if(!changeOrientation) {
                        let heightProcent = (divForFasad.getBoundingClientRect().height)*100/(divForFasad.closest(".imgBackDoor").getBoundingClientRect().height)
                        let widthProcent = (divForFasad.getBoundingClientRect().width)*100/(divForFasad.closest(".imgBackDoor").getBoundingClientRect().width)
                        if((i==0||i==2)&&j==0 && heightProcent>10) {
                          divForFasad.style.height=`${heightProcent-1}%`
                        } else if((i==0||i==2)&&j==1 && heightProcent<100) {
                          divForFasad.style.height=`${heightProcent+1}%`
                        } else if((i==1||i==3)&&j==0 && widthProcent>10) {
                          divForFasad.style.width=`${widthProcent-1}%`
                        }  else if((i==1||i==3)&&j==1 && widthProcent<100) {
                          divForFasad.style.width=`${widthProcent+1}%`
                        }
                      } else {
                        let heightProcent = (divForFasad.getBoundingClientRect().height)*100/(divForFasad.closest(".imgBackDoor").getBoundingClientRect().height)
                        let widthProcent = (divForFasad.getBoundingClientRect().width)*100/(divForFasad.closest(".imgBackDoor").getBoundingClientRect().width)
                        divForFasad.style.height = divForFasad.style.height || 50+"%"
                        divForFasad.style.width = divForFasad.style.width || 80+"%"
                        if((i==0||i==2)&&j==0 && widthProcent>20) {
                          divForFasad.style.height=`${parseInt(divForFasad.style.height)-1}%`
                        } else if((i==0||i==2)&&j==1 && widthProcent<96) {
                          divForFasad.style.height=`${parseInt(divForFasad.style.height)+1}%`
                        } else if((i==1||i==3)&&j==0 && heightProcent>20) {
                          divForFasad.style.width=`${parseInt(divForFasad.style.width)-1}%`
                        }  else if((i==1||i==3)&&j==1 && heightProcent<96) {
                          divForFasad.style.width=`${parseInt(divForFasad.style.width)+1}%`
                        }
                      }
                    }
                    timer = setInterval(changeSize,200)
                  }

                  divDouleContol.onmouseup=()=>{
                    clearInterval(timer)
                  }
                  divDouleContol.onmouseleave=()=>{
                    clearInterval(timer)
                  }

                }
                extindsDiv.style.transform = `rotate(${90*i}deg)`
                divForControl.append(extindsDiv)
              }
            break;
            case "hor": 
              divForFasad.classList.toggle("rotate")
            break;
          }

        }
      })
      document.querySelectorAll(".final-door-control-right").forEach(item=>{
        item.remove()
      })
      container.append(divControlRight)
    }
    document.body.addEventListener("click",()=>{
      divForFasad.classList.remove("isSelected")
      document.querySelectorAll(".final-door-control-right").forEach(item=>{
        item.remove()
      })
      divForControl.innerHTML=""
    })
    divForFasad.append(img,divForControl)
    let id = Date.now()
    divForFasad.id = id
    
    if(ev.target.className == "multi") {
      ev.target.parentElement.append(divForFasad)
    } else {
      ev.target.append(divForFasad)
    }
    
    divForFasad.ondragstart = (ev) => {
      ev.stopPropagation();
      ev.dataTransfer.setData("fasad", id);
      document.querySelector(".final-door-control-right")?.remove()
    };
  }

  async cropImage(data) {
    return new Promise((res,rej)=>{
    let elementModal = document.getElementById('modalFasadEdit')
    let modal = new bootstrap.Modal(elementModal, {
      keyboard: false
    })
    elementModal.style.zIndex=2000
    elementModal.style.position="absolute"
    modal.show()
    let image = elementModal.querySelector("img")
    image.src = data
    let cropper = null
    elementModal.addEventListener("shown.bs.modal",()=>{
      cropper = new Cropper(image,{
        ready: e=>{
          cropper.zoomTo(1)
          const containerData = cropper.getContainerData();
          cropper.setAspectRatio(containerData.width/containerData.height)
        },

        zoom: e=>{
          if(e.detail.oldRatio === 1) {
            e.preventDefault()
          }
        }
      })
      

    }, {once:true})

    elementModal.addEventListener("hidden.bs.modal",()=>{
      cropper.destroy()
      rej()
      modal.hide()
    },{once:true})

    elementModal.querySelector(`button[data-bs-save="save"]`).onclick=()=>{
      cropper.getCroppedCanvas().toBlob(blob=>{
        let reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = function () {
          res(reader.result)
        }
        modal.hide()
      })
      
    }
    },{once:true})
    
  }

  protectiveFilm(e) {
    if(e.target.checked) {
      stateDoor.protectiveFilm.push(this.data.id)
      this.checked = true
      stateDoor.materials.forEach(item=>{
        if(item.idMaterials == this.data.id) {
          item.protectiveFilm = true
        }
      })
    } else {
      stateDoor.protectiveFilm = stateDoor.protectiveFilm.filter(item=>item !=this.data.id)
      this.checked = false
      stateDoor.materials.forEach(item=>{
        if(item.idMaterials == this.data.id) {
          item.protectiveFilm = false
        }
      })
    }
    stateDoor.protectiveFilm = [...new Set(stateDoor.protectiveFilm)]
    changePrice(stateDoor.price)
  }
}