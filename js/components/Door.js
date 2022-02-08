import { multiDivMutationObserver } from "../controlsMaterial/controlsMaterials.js";

export default class Door {
  constructor(qty, pos, imgBack, vertProfile, horProfile, height, width) {
    this.qty = qty;
    this.imgBack = imgBack;
    this.vertProfile = vertProfile;
    this.horProfile = horProfile;
    this.pos = pos;
    this.height = height;
    this.width = width;
  }

  render(container) {
    if(this.qty<=2) {
      container.style.width = 50+"%"
    } else {
      container.style.width = null
    }
    let divDoor = document.createElement("div");
    divDoor.classList.add("divDoor");
    divDoor.style.width = 100 / this.qty + "%";
    divDoor.style.setProperty('height', 'calc(100% - 10px)');;
    // divDoor.style.backgroundImage = `url(${this.imgBack})`;
    divDoor.style.backgroundColor = `rgb(215 214 214 / 62%)`;
    divDoor.style.position = "absolute";
    divDoor.style.left = (100 / this.qty) * this.pos + "%";
    divDoor.style.bottom = 0;
    divDoor.style.display = "flex"
    divDoor.style.justifyContent = "center"
    divDoor.style.alignItems = "center"
    divDoor.style.zIndex = 2100

    divDoor.onmouseenter = () => {
      let topInfo = document.createElement("div");
      topInfo.id = "topInfo";
      let p = document.createElement("p");
      p.innerText = parseInt(this.width / this.qty);
      topInfo.append(p);
      divDoor.prepend(topInfo);

      let heightInfo = document.createElement("div");
      heightInfo.id = "heightInfo";
      let pHeight = document.createElement("p");
      pHeight.innerText = parseInt(this.height);
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

    let backgroundDiv = document.createElement("div");
    backgroundDiv.classList.add("imgBackDoor");
    backgroundDiv.style.setProperty('width', 'calc(100% - 20px)');
    backgroundDiv.style.setProperty('height', 'calc(100% - 10px)');
    backgroundDiv.style.position = "absolute"
    backgroundDiv.style.top = 0
    multiDivMutationObserver(backgroundDiv,container)

    let img = document.createElement("div")
    img.style.width = "100%";
    img.style.height = "100%"
    img.style.position = "absolute"
    img.classList.add("bacground-image")
    img.draggable = true;
    backgroundDiv.append(img)

    let divMulti = document.createElement("div")
    divMulti.classList.add("multi")
    divMulti.draggable = true
    divMulti.style.position = "absolute"
    divMulti.style.zIndex = 1
    divMulti.style.height = "100%"
    divMulti.style.width = "100%"
    divMulti.style.left = 0
    divMulti.style.top = 0
    backgroundDiv.append(divMulti)
    
    // backgroundDiv.addEventListener("click",(e)=>{
    //   if(!container.dataset.dropImage) {
    //     e.stopPropagation()
    //   } else {
    //     return
    //   }
      
    //   container.querySelectorAll(".imgBackDoor.isSelected").forEach(item=>item.classList.remove("isSelected"))
    //   backgroundDiv.classList.add("isSelected")
    //   let divControlRight = document.createElement("div")
    //   divControlRight.classList.add("final-door-control-right")
    //   document.querySelectorAll(".final-door-control-right").forEach(item=>item.remove())
    //   document.querySelectorAll(".img-foto-fasad").forEach(item=>item.classList.remove("isSelected"))
    //   divControlRight.innerHTML = `
    //     <div data-control="rotate_material" title="Изменить размер">
    //       <img src="images/rotate_control.png">
    //     </div>
    //   `
    //   container.append(divControlRight)
    //   divControlRight.onclick=(e)=>{
    //     e.stopPropagation()
    //     Array.from(e.currentTarget.children).forEach(item=>{
    //       switch(item.dataset.control) {
    //         case "rotate_material":
    //           let regExp = /[0-9]/g
    //           let result = img.style.transform?+img.style.transform.match(regExp).join(""):0
    //           result = result==180?-180:result
    //           img.style.transform = `rotate(${result+180}deg)`
    //           break
    //       }
    //     })
    //   }

    //   divControlRight.onmousedown = (e)=>{
    //     divControlRight.children[0].style.backgroundColor = "white"
    //     divControlRight.children[0].children[0].style.filter = "invert(26%) sepia(70%) saturate(1162%) hue-rotate(323deg) brightness(92%) contrast(92%)"
    //   }

    //   divControlRight.onmouseup= (e)=>{
    //     divControlRight.children[0].style.backgroundColor = null
    //     divControlRight.children[0].children[0].style.filter = null
    //   }

    //   document.body.addEventListener("click",()=>{
    //     divControlRight.remove()
    //     backgroundDiv.classList.remove("isSelected")
    //   },{once:true})
    // })

    let leftProfileDoor = document.createElement("div");
    leftProfileDoor.classList.add("vertical_profile");
    leftProfileDoor.style.position = "absolute";
    leftProfileDoor.style.left = 0;
    leftProfileDoor.style.top = 0;
    leftProfileDoor.style.height = "100%";
    leftProfileDoor.style.width = "10px";
    leftProfileDoor.style.backgroundImage = `url(${this.vertProfile})`;
    leftProfileDoor.style.backgroundSize = `100%`;

    let rightProfileDoor = leftProfileDoor.cloneNode(true);
    rightProfileDoor.style.right = 0;
    rightProfileDoor.style.left = null;

    let bottomProfileDoor = document.createElement("div");
    bottomProfileDoor.classList.add("horizontal_profile");
    bottomProfileDoor.style.position = "absolute";
    bottomProfileDoor.style.left = 0;
    bottomProfileDoor.style.right = 0;
    bottomProfileDoor.style.margin = "auto";
    bottomProfileDoor.style.bottom = 0;
    bottomProfileDoor.style.height = "10px";
    bottomProfileDoor.style.setProperty('width', 'calc(100% - 20px)');
    bottomProfileDoor.style.backgroundImage = `url(${this.horProfile})`;
    bottomProfileDoor.style.backgroundSize = `100%`;


    let topProfileDoor = bottomProfileDoor.cloneNode(true);
    topProfileDoor.style.left = 0;
    topProfileDoor.style.bottom = null;
    topProfileDoor.style.top = 0;
    // topProfileDoor.style.zIndex = 2150;
    topProfileDoor.style.width = "100%";

    divDoor.append(
      leftProfileDoor,
      rightProfileDoor,
      bottomProfileDoor,
      backgroundDiv,
    );
    !container.firstElementChild && container.append(topProfileDoor);
    container.append(divDoor);
  }
}
