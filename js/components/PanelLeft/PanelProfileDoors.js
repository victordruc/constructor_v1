import { changePrice } from "../../controlsMaterial/controlsMaterials.js";

export default class PanelProfileDoors {
  constructor(data, render) {
    this.data = data;
	this.renderDoor = render
	this.id = data.nameProfileId
	this.name = data.nameProfile
  }

  render(container) {
    let liProfile = this.data.profileData.map(
      (item) =>
        `<div class="list-item profileType" title="${item.name}" data-id-profile = ${item.id}>
			<label>
			<input type="radio" value="profile-type-6" name="profile" ${(this.data.nameProfile == item.name)&& "checked" }>
			<span class="selected"></span> <img src="./img/profile.png" alt="Изображение типа профиля"> 
			</label>
		</div>`
    );

    let liColorProfile = this.data.profileData.find(item=>item.id==this.data.nameProfileId).color.map(
      (item) =>
        `<li class="list-item silver"  title="${item.availability?item.name:"Нет в наличии"}" data-id-color="${item.id}">
			<label>
			<input type="radio" name="colors" value="silver" ${(this.data.imgName == item.name)&& "checked"}>
			<span class="selected"></span> <span class="color" style="background-image: url(${item.src.vert}); background-repeat: no-repeat; background-size: 100%; ${!item.availability&&"border:1px solid red; cursor: no-drop"}"></span> 
			</label>
		</li>`
    );

    let html = `
        <div class="heading heading--primary">
            <h1>Конструктор дверей для шкафов купе</h1>
        </div>

        <div class="panel-content is-active panel--profile">
				<div class="panel-item data--profile-type">
					
					<div class="panel-info-modal">
					<h3>Тип профиля</h3>
						<i class="bi bi-question-circle-fill"></i>
						<div class="panel-item--popover px-4">
							<h4>Тип профиля</h4>
							<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam sequi pariatur animi possimus cum laborum veniam placeat, quas eveniet rerum.</p>
						</div>
					</div>

					<div class="slick-profile">	
						${liProfile.join("")}
					</div>

					<div class="slick-profile__name">
						${this.data.nameProfile}
					</div>

					<div class="slick-profile__control">
						<button>
							<i class="bi bi-arrow-left-circle-fill"></i>
						</button>
						<span>
							Профиль
						</span>
						<button>
							<i class="bi bi-arrow-right-circle-fill"></i>
						</button>
					</div>

				</div>
				<svg viewBox="0 0 300 2" class="divider">
					<line stroke-dasharray="5" x1="0" x2="100%" y1="0" y2="0"></line>
					<line stroke-dasharray="5" x1="0" x2="100%" y1="1" y2="1"></line>
				</svg>
				<div class="panel-item data--profile-color">

					<div class="panel-info-modal">
					<h3>Цвет профиля</h3>
						<i class="bi bi-question-circle-fill"></i>
						<div class="panel-item--popover px-4">
							<h4>Цвет профиля</h4>
							<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam sequi pariatur animi possimus cum laborum veniam placeat, quas eveniet rerum.</p>
						</div>
					</div>

					<ul class="list list--checkbox list--color" id="colorListProfile">
						${liColorProfile.join("")}
					</ul>
				</div>
			</div>
        `;
    container.innerHTML = html;
	this.changeColorProfile()

	document.querySelectorAll(".panel-info-modal").forEach(item=>{
		item.children[1].onmouseenter=(e)=>{
			let infoPaste = document.getElementById("information") 
			infoPaste.append(item.children[2].cloneNode(true))
			infoPaste.classList.add("active")
			infoPaste.style.top = `${e.pageY}px`
			infoPaste.style.left = `${e.pageX}px`
		}
		item.children[1].onmouseleave=()=>{
			let infoPaste = document.getElementById("information") 
			infoPaste.classList.remove("active")
			infoPaste.innerHTML=""
		}
	})

    

	let initialSlide = liProfile.findIndex(item=>item.includes("checked"))

	$('.slick-profile').on('init', (event, slick)=>{
		let itemsSelected = Array.from(slick.$slides).find(item=>item.classList.contains("slick-current"))
		itemsSelected.querySelector("input").checked = true
		$(".slick-profile__control > span").text(`Профиль ${slick.currentSlide+1} из ${slick.slideCount}`)
	});

	$(".slick-profile").slick({
		dots: false,
		infinite: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		initialSlide,
		nextArrow: $(".slick-profile__control > button:nth-of-type(2)"),
		prevArrow: $(".slick-profile__control > button:nth-of-type(1)")
	})

	$('.slick-profile').on('afterChange', (ev, slick, currentSlide)=>{
		$(".slick-profile__control > span").text(`Профиль ${currentSlide+1} из ${slick.slideCount}`)
	});

	Array.from(document.getElementsByClassName("profileType")).forEach(
		(item) => {
		  item.addEventListener("click", e => {
			  document.querySelector(".slick-profile__name").innerText = e.currentTarget.title
			this.data.profileData.forEach((item) => {
			  if (e.currentTarget.dataset.idProfile == item.id) {
				liColorProfile = item.color.map(
				  (item) =>
					`<li class="list-item silver" title="${item.availability?item.name:"Нет в наличии"}" data-id-color="${item.id}">
							  <label>
							  <input type="radio" name="colors" value="silver">
							  <span class="selected"></span> <span class="color" style="background-image: url(${item.src.vert}); background-repeat: no-repeat; background-size: 100%; ${!item.availability?"border:1px solid red; cursor: no-drop":""}"></span> 
							  </label>
					  </li>`
				);
				this.name = item.name  
				this.id = item.id 
			  }
			});
			document.getElementById("colorListProfile").innerHTML = liColorProfile.join("");
			this.changeColorProfile()
		  });
		}
	  );

  }

  changeColorProfile() {
	let imgObj = null
	Array.from(document.querySelector("#colorListProfile").children).forEach(item=>{
		item.addEventListener("click", (e)=>{
			this.data.profileData.forEach(item=>{
				item.color.forEach(color=>{
					if(+e.currentTarget.dataset.idColor === +color.id) {
						imgObj = color
						return
					}
					  
				})
			})
			this.data.imgObj = {...imgObj.src}
			this.data.priceMaterials = imgObj.price
			this.data.imgName = imgObj.name
			this.data.nameProfile = this.name
			this.data.nameProfileId = this.id 

			changePrice(this.data.price)
			
			Array.from(document.getElementsByClassName("vertical_profile")).forEach(item=>{
				item.style.backgroundImage = `url(${imgObj.src.vert})`
			})
			Array.from(document.getElementsByClassName("horizontal_profile")).forEach(item=>{
				item.style.backgroundImage = `url(${imgObj.src.hor})`
			})

		})
	})

	

  }
}
