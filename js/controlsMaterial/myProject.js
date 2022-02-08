const containerProject = document.getElementById("containerProject");

class Projects {
  constructor(element) {
    this.element = element;
    this.projectArray = [];
  }

  render() {
    this.projectArray = [];
    this.element.innerHTML = "";
    for (let key in localStorage) {
      if (key.includes("project-")) {
        this.projectArray.push(JSON.parse(localStorage.getItem(key)));
      }
    }

    function render(projectArray) {
      this.element.innerHTML = "";
      if (!projectArray.length) {
        let h1 = document.createElement("h1");
        h1.innerText = "У вас нет проектов!";
        h1.style.position = "fixed";
        h1.style.margin = "auto";
        h1.style.left = 0;
        h1.style.right = 0;
        h1.style.top = "50%";
        h1.style.textAlign = "center";
        h1.style.setProperty("color", "var(--c-primary)");
        this.element.append(h1);
        return;
      }

      projectArray.forEach((item) => {
        this.element.innerHTML += `
    <div class="col d-flex">
        <div class="card">
            <img src="${item.img}" class="card-img-top" alt="${item.name}">
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">Дата изменения / добавление: ${item.date}</p>
                <div class="card-link d-flex justify-content-between">
                    <a id="${item.id}" href="#" class="btn btn-outline-primary">Удалить</a>
                    <a id="open-${item.id}" href="index.html" class="btn btn-outline-primary">Открыть</a>
                </div>
            </div>
        </div>
    </div>`;
      });

      this.element.innerHTML += `
    <div class="col d-flex my-project__add-card">
      <div class="card ">
        <div class="card-header">пустой проект</div>
        <div id="openDefaultProject" class="card-body d-flex justify-content-center align-items-center">
          <i class="bi bi-plus-lg"></i>
        </div>
      </div>
    </div>
      `;

      projectArray.forEach((item) => {
        let deleteElement = document.getElementById(item.id);
        deleteElement.onclick = (e) => {
          e.preventDefault();
          this.delete(item.id);
        };
        let openElement = document.getElementById(`open-${item.id}`);
        openElement.onclick = (e) => {
          this.open(item.id);
        };
      });

      document.getElementById("openDefaultProject").onclick = (e) => {
        localStorage.removeItem("openProject");
        location.assign(location.origin + "/index.html");
      };
    }

    render.call(this, this.projectArray);

    document.getElementById("navbarSearch").onsubmit = (e) => {
      e.preventDefault();
    };

    document.getElementById("navbarSearch").onkeyup = (e) => {
      this.element.innerHTML = "";
      let value = e.target.value.trim().toLowerCase();
      let arr = this.projectArray.filter(
        (item) =>
          item.name.trim().toLowerCase().includes(value) ||
          item.date.includes(value)
      );
      render.call(this, arr);
    };
  }

  delete(id) {
    let toastElement = document.getElementById("deleteToast");
    let toast = new bootstrap.Toast(toastElement);
    toast.show();
    toastElement.querySelector("#deleteToastBtn").onclick = () => {
      if (localStorage.getItem("openProject") == id) {
        localStorage.removeItem("openProject");
      }
      localStorage.removeItem(`project-${id}`);
      this.render();
    };
  }

  open(id) {
    localStorage.setItem("openProject", id);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let projects = new Projects(containerProject);
  projects.render();
});
