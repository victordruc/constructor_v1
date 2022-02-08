import AdminAddMaterial from "../components/Admin/AdminAddMaterial.js";
import { auxiliarData } from "../data/data.js";
import EditMaterials from "../components/Admin/EditMaterials.js";

const containerRender = document.getElementById("container");
const addMaterials = document.getElementById("listNavigationAdmin");
const adminAddMaterial = new AdminAddMaterial(containerRender, auxiliarData);
const editMaterials = new EditMaterials(containerRender, auxiliarData);

Array.from(addMaterials.children).forEach(item=>{
  item.onclick = (e) => {
    e.preventDefault();
    switch (e.target.dataset.nav) {
      case "addMaterials":
        adminAddMaterial.render();
        return;

      case "addMaterialsList":
        editMaterials.render();
        return;
  
      default:
        containerRender.innerHTML = "";
    }
  };
})

document.addEventListener("DOMContentLoaded", () => {
  adminAddMaterial.render();
  openNavigationMenu()
})

function openNavigationMenu() {
  const btn = document.querySelector(".navbar-toggler")
  btn.onclick = e => {
    e.stopPropagation()
    addMaterials.classList.toggle("isActive")
  }
  addMaterials.addEventListener("click",e=>{
    e.stopPropagation()
  })
  document.body.addEventListener("click",()=>{
    addMaterials.classList.remove("isActive")
  })
}