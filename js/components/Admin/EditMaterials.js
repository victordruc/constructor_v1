export default class EditMaterials {
  constructor(container, data) {
    this.container = container;
    this.data = data;
  }

  render() {

    let categoryRow = this.data.map(el=>{
      return  `
                <option value="${el.id}">${el.name}</option>
            `
    }).join(" ")

    let html =  `
        <div class="row admin_edit-materials" style="color:black">
            <div class="col-xl-6">
                <div id="adminEditCategory" class="admin_edit-materials-row">
                    <h3>Редактировать категории материалов</h3>
                    <select class="form-select">
                        <option selected>Выберите категорию</option>
                        ${categoryRow}
                    </select>
                    <div id="adminEditCategoryContainer">
                    
                    </div>
                </div>
            </div>

            <div class="col-xl-6">
                <div id="adminEditMaterials" class="admin_edit-materials-row">
                    <h3>Редактировать материалы</h3>
                    <select class="form-select">
                        <option selected>Выберите категорию</option>
                        ${categoryRow}
                    </select>
                    <div id="adminEditMaterialsContainer">
                    
                    </div>
                </div>
            </div>
        </div>
    `
    this.container.innerHTML = html

    document.getElementById("adminEditCategory").onchange = this.editCategory.bind(this)
    document.getElementById("adminEditMaterials").onchange = this.editMaterials.bind(this)
  }

  editCategory(e) {
    const name = this.data.find(item=>item.id==e.target.value).name
    const containerRender = document.getElementById("adminEditCategoryContainer")
    const input = `
    <div class="input-group my-3">
        <button data-admin-category = "delete" class="btn btn-outline-danger" type="button">Удалить</button>
        <input type="text" class="form-control" placeholder="Редактировать название" value="${name}">
    </div>

    <div class="d-flex justify-content-end">
        <button data-admin-category = "cancel" type="button" class="btn btn-outline-secondary me-2">Отмена</button>
        <button data-admin-category = "save" type="button" class="btn btn-outline-primary">Сохранить</button>
    </div>
    `
    containerRender.innerHTML = input

    containerRender.querySelectorAll("button").forEach(item=>{
        item.onclick = ()=>{
            switch(item.dataset.adminCategory) {
                case "cancel": 
                    containerRender.innerHTML = ""
                break
                case "save": 
                    console.log("save")
                break
                case "delete": 
                    console.log("delete")
                break
            }
        }
    })
  }

  editMaterials(e) {
    const images = this.data.find(item=>item.id==e.target.value).img
    const containerRender = document.getElementById("adminEditMaterialsContainer")
    containerRender.innerHTML = ""
    const imagesContainer = document.createElement("div")
    imagesContainer.className = "row"

    images.forEach(item=>{
        let div = document.createElement("div")
        div.className = "pt-3 col-xl-3 col-xxl-2 col-lg-2 col-md-3 col-sm-4 col-6 list-images"
        div.innerHTML = `<img class="admin-materials_images" src="${item.img}" alt="Список материалов">`
        div.onclick = ()=>editMatFunction(item)
        imagesContainer.append(div)
    })

    let div = document.createElement("div")
    div.className = "pt-3 col-xl-3 col-xxl-2 col-lg-2 col-md-3 col-sm-4 col-6 list-images"
    div.innerHTML = `<div class="focus_add_material d-flex justify-content-center align-items-center"><i class="bi bi-plus-lg"></i></div>`

    imagesContainer.append(div)

    let divBtn = document.createElement("div")
    divBtn.className = "d-flex justify-content-end pt-3"
    divBtn.innerHTML = `<button data-admin-materials = "cancel" type="button" class="btn btn-outline-secondary me-2">Отмена</button>
                        <button data-admin-materials = "save" type="button" class="btn btn-outline-primary">Сохранить</button>`

    containerRender.append(imagesContainer,divBtn)

    function editMatFunction(item) {
        console.log(item)
    }

  }
}
