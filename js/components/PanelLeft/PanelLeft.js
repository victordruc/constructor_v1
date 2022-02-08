import PanelFurnitureDoors from "./PanelFurnitureDoors.js";
import PanelLeftPanelMain from "./PanelLeftPanelMain.js";
import PanelProfileDoors from "./PanelProfileDoors.js";
import PanelLeftDoors from "./PanelLeftDoors.js";
import PanelAdmin from "./PanelAdmin.js";
import { stateDoor } from "../../controlsMaterial/stateDoor.js";
import { doorControl } from "../../controlsMaterial/controlsMaterials.js";


export default class PanelLeft {
    constructor(container) {
        this.container = container;
        this.children = [];
        this.panelLeftDoor = new PanelLeftDoors(stateDoor, doorControl);
    }

    addChildren(children) {
        this.children.push(children);
    }

    render() {
        this.children.forEach((item) => {
            item.render(this.container)
            item.drop?item.drop():null
        });
    }

    remove() {
        this.children.forEach((item) => {
            item.drop?item.drop(true):null
        });
        this.children = [];
    }

    changeMenu() {
        this.addChildren(new PanelLeftPanelMain(stateDoor, doorControl))
        this.render()
        const arrNav = Array.from(document.getElementById("leftNavbar").children)
        let last= arrNav[1]
        if(window.innerWidth<=991) {
            this.container.style.display="none"
            last?.classList.remove("is-active")
        }
        window.onresize = () => {
            if(window.innerWidth<=991) {
                this.container.style.display="none"
                last?.classList.remove("is-active")
                return
            } else {
                this.container.style.display="block"
                last?.classList.add("is-active")
            }
        }
        
        
        arrNav.forEach(nav => {
            nav.addEventListener("click", e => {
                if(window.innerWidth<=991 && last==e.currentTarget) {
                    e.currentTarget.classList.remove("is-active")
                    last = null
                    this.container.style.display="none"
                    return
                }
                
                this.container.style.display="block"
                last?.classList.remove("is-active")
                this.remove()
                const index = e.currentTarget.dataset.index
                e.currentTarget.classList.add("is-active")

                switch (+index) {
                    case 1: this.addChildren(new PanelLeftPanelMain(stateDoor, doorControl)); break
                    case 2: this.addChildren(this.panelLeftDoor); break
                    case 3: this.addChildren(new PanelProfileDoors(stateDoor, doorControl)); break
                    case 4: this.addChildren(new PanelFurnitureDoors(stateDoor, doorControl)); break
                    case 5: this.addChildren(new PanelAdmin(stateDoor, doorControl)); break

                }
                this.render()
                last = e.currentTarget
            })
        })

    }

}
