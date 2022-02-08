export default class AdminAddMaterial {
    constructor(container, data) {
        this.container = container
        this.data = data
    }

    render() {
        this.container.innerHTML = ""

        let findHTML = `
        <div class="admin_container-add-materials">
            <div class="mb-3">
                <label for="searchProject" class="form-label">Поиск по проекту или пользователя</label>
                <input type="search" class="form-control" id="searchProject" placeholder="Поиск..." autocomplete="off">
            </div>
        </div>

        <div class="admin_list-project">
            <div id="containerProject" class="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 g-4 position-relative">
            </div>
        </div>
        `

        let projectCard = (src,name,date,id,user) =>`
        <div class="col d-flex">
            <div class="card">
                <img src="${src}" class="card-img-top" alt="${name}">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">Дата изменения / добавление: ${date}</p>
                    <p class="card-text">Пользователь (ID): ${user}</p>
                    <div class="card-link d-flex justify-content-center">
                        <a id="${id}" href="#" class="btn btn-outline-primary">Добавить</a>
                    </div>
                </div>
            </div>
        </div>
        `

        this.container.innerHTML = findHTML

        // FIND PROJECT----------------------------------------------------->

        const containerProject = document.getElementById("containerProject")
        const searchProject = document.getElementById("searchProject")
        let timer = null
        searchProject.onkeyup = e => {
          clearTimeout(timer)
          timer = setTimeout(()=>{
            let value = e.target.value.trim().toLowerCase()
            let projectArray = []
            containerProject.innerHTML = ""
           
            for (let key in localStorage) {
                if (key.includes("project-")) {
                  projectArray.push(JSON.parse(localStorage.getItem(key)));
                }
              }
            
            let resultArray = projectArray.filter(item=>{
                let name = item.name.trim().toLowerCase()
                if(new String(item.id).includes(value) || new String(item.userID).includes(value) || name.includes(value)) return true
            })

            if(!value || !resultArray.length) {
                containerProject.innerHTML = ""
                let h1 = document.createElement("h1");
                h1.innerText = "Ничего не найдено";
                h1.style.position = "absolute";
                h1.style.margin = "auto";
                h1.style.left = 0;
                h1.style.right = 0;
                h1.style.top = "38vh";
                h1.style.width = "100%";
                h1.style.textAlign = "center";
                h1.style.setProperty("color", "var(--c-primary)");
                containerProject.append(h1);
                this.toastElement(`Ничего не найдено  <i class="bi bi-x-circle" style="color:red"></i>`)
                return
            } 

            resultArray.forEach(item=>{
                containerProject.innerHTML += projectCard(item.img, item.name, item.date, item.id, item.userID)
            })

            resultArray.forEach(item=>{
                document.getElementById(`${item.id}`).onclick = e => this.addMaterials(e)
            })
          },500)
        }
        // FIND PROJECT-----------------------------------------------------<


    }

    addMaterials(e) {
        const id = e.target.id
        let optionElement = this.data.map(item=>`<option value="${item.id}">${item.name}</option>`)

        let auxMaterialsExist = JSON.parse(localStorage.getItem(`project-${id}`)).auxMaterials || []

        let result = []
        auxMaterialsExist.forEach(item=>{
            let idCheck = this.data.find(el=>el.id == item.id).id
            result.push(this.data.map((elem,index,arr)=>{
            if(elem.id == item.id) {
                if(index == 0) {
                    return `<select class="form-select" data-first-selected = "true">
                    <option selected disabled>Выберите материал</option>
                    <option selected value="${elem.id}">${elem.name}</option>`
                } else if(index == arr.length-1) {
                    return `<option selected value="${elem.id}">${elem.name}</option>
                            </select>
                            <button data-id = ${idCheck} type="button" class="btn btn-outline-danger ms-2">
                                <i class="bi bi-trash"></i>
                            </button>
                            `
                } else {
                    return `<option selected value="${elem.id}">${elem.name}</option>`
                }
            } 
            else {
                if(index == 0) {
                    return `<select class="form-select" data-first-selected = "true">
                    <option selected disabled>Выберите материал</option>
                    <option value="${elem.id}">${elem.name}</option>`
                } else if(index == arr.length-1) {
                    return `<option value="${elem.id}">${elem.name}</option>
                            </select>
                            <button data-id = ${idCheck} type="button" class="btn btn-outline-danger ms-2">
                                <i class="bi bi-trash"></i>
                            </button>
                            `
                } else {
                    return `<option value="${elem.id}">${elem.name}</option>`
                }
            }
        }))
           
        })

        let elementSelect = `
        <form id="formContainerAdmin">
            ${result.map(elem=>(`
                <div class="d-flex justify-content-center align-items-center py-2 materials_container-admin">
                        ${elem.join(" ")}
                </div>
                `
            )).join(" ")}
            <div class="d-flex justify-content-center align-items-center py-2 materials_container-admin">
                <select class="form-select">
                    <option selected disabled>Выберите материал</option>
                    ${optionElement.join(" ")}
                </select>
            </div>
        </form>
        `
        this.modalElement(elementSelect).save.onclick = e => {
            let arrayValue = [...auxMaterialsExist]
            Array.from(document.getElementById("formContainerAdmin").children).forEach(el=>{
                if(el.querySelector("select").options.selectedIndex) {
                    arrayValue.push(el.querySelector("select").value)
                } 
            })
            arrayValue = [...new Set(arrayValue)]
            
            let auxMaterials = this.data.filter(item=>arrayValue.includes(`${item.id}`))

            // if(!auxMaterials.length) return
          
            let initValue = JSON.parse(localStorage.getItem(`project-${id}`))
            let save = {
                ...initValue,
                auxMaterials
            }
            localStorage.setItem(`project-${id}`,JSON.stringify(save))
            this.toastElement(`Материалы добавлены <i class="bi bi-check2-circle" style="color:green"></i>`)
        }

        document.getElementById("formContainerAdmin").onchange = e => {
            let actions = (e) => {
                if(e.target.dataset.firstSelected) {
                    e.target.nextElementSibling.dataset.id = e.target.value
                    e.target.nextElementSibling.onclick = deleteMaterial
                    return
                }
                const btn = document.createElement("button")
                btn.className = "btn btn-outline-danger ms-2"
                btn.type = "button"
                btn.dataset.id = e.target.value
                btn.innerHTML = `<i class="bi bi-trash"></i>`
                e.target.after(btn)
                btn.onclick = deleteMaterial
                e.target.dataset.firstSelected = true
                const select = document.createElement("select")
                select.classList.add("form-select")
                select.innerHTML = `
                <option selected disabled>Выберите материал</option>
                ${optionElement.join(" ")}`
                return select
            }
            let select = actions(e)
            
            if(!select) return
            select.onchange = e => {
                const div = document.createElement("div")
                div.className = "d-flex justify-content-center align-items-center py-2 materials_container-admin"
                const select = actions(e)
                if(!select) return
                div.append(select)
                document.getElementById("formContainerAdmin").append(div)
            }
            const div = document.createElement("div")
            div.className = "d-flex justify-content-center align-items-center py-2 materials_container-admin"
            div.append(select)
            e.currentTarget.append(div)
        }

        document.querySelectorAll("#formContainerAdmin button").forEach(el=>{
            el.onclick = deleteMaterial
        })

        function deleteMaterial(e) {
            e.currentTarget.closest(".materials_container-admin").remove()
        }
    }

    toastElement(text,btn,style={}) {
        let toastContainer = document.getElementById("toastAdmin")
        let styleValue = ""
        for(let key in style) {
          styleValue+=`${key}:${style[key]};`
        }
        toastContainer.innerHTML =  `
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

    modalElement(body) {
        let modalContainer = document.getElementById("modalAdmin")
        modalContainer.innerHTML = `
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div
              class="modal-body d-flex justify-content-center"
              style="max-height: 500px"
            >
                ${body}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                ОТМЕНА
              </button>
              <button id="saveModalAdminOption" type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">
                СОХРАНИTЬ
              </button>
            </div>
          </div>
        </div>
        `
        let modal = new bootstrap.Modal(modalContainer, {
            keyboard: false
        })
        modal.show()
        return {
            save: document.getElementById("saveModalAdminOption")
        }

    }
}