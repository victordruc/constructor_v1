export default class MainDoor {
  constructor(container) {
    this.container = container;
    this.children = [];
  }

  addChildren(children) {
    this.children.push(children);
  }

  render() {
    this.children.forEach((item) => item.render(this.container));
    this.doorMove();
  }

  remove() {
    this.children = [];
  }

  doorMove() {
    const divDoor = document.getElementsByClassName("divDoor");
    const arrDoor = Array.from(divDoor);
    const container = this.container;
    arrDoor.forEach((divDoor) => {
      divDoor.onmousedown = function (event) {
        let shiftX = event.clientX - divDoor.getBoundingClientRect().left;
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        // divDoor.addEventListener("mouseleave", onMouseUp);
        
        function onMouseMove(event) {
          divDoor.querySelectorAll(".multi").forEach(elem=>{
            elem.style.cursor="move"
          })
          
          let newLeft =
            event.clientX - shiftX - container.getBoundingClientRect().left;

          if (newLeft < 0) {
            newLeft = 0;
          }

          let rightEdge = container.offsetWidth - divDoor.offsetWidth-4;
          if (newLeft > rightEdge) {
            newLeft = rightEdge;
          }
          console.log()
          divDoor.style.left = newLeft*100/container.offsetWidth + "%";
        }

        function onMouseUp() {
          divDoor.querySelectorAll(".multi").forEach(elem=>{
            elem.style.cursor="pointer"
          })
          document.removeEventListener("mouseup", onMouseUp);
          document.removeEventListener("mousemove", onMouseMove);
        }
      };

      divDoor.ondragstart = function (ev) {
        if (!ev.target.id) {
          return false;
        }
      };
    });
  }
}
