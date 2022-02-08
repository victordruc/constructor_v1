import { profileData } from "../data/data.js";
import { fittings } from "../data/data.js";
import { fotofasad } from "../data/data.js";
import { needSaveProject } from "../app.js";

export const stateDoor = new Proxy({
  qty: 5,
  height: 2100,
  width: 3000,
  nameProfile: profileData[0].name,
  nameProfileId: profileData[0].id,
  imgName: profileData[0].color[0].name,
  imgObj: { ...profileData[0].color[0].src },
  profileData: [...profileData],
  fotos: [...fotofasad],
  fittings: [...fittings],
  materials: [],
  priceMaterials: profileData[0].color[0].price,
  railInfo: {
    widthTop: 2300,
    widthBottom: 2300,
    type: 1,
  },
  fittingsPrice: [],
  constructionTypeDoor: "Нижнеопорные",
  doorLeafType:"doors-sash-type-1",
  vertPrice: 100,
  horPrice: 50,
  dividersThickness: 8,
  protectiveFilm: [],
  protectiveFilmPrice: 500,
  get price() {
    return {
      doors: this.qty * 1000,
      meterials: this.materials,
      fittingsPrice: this.fittingsPrice,
      height: this.height * 2,
      width: this.width * 1,
      priceMaterials: this.priceMaterials
    };
  },
},{
  set(target,prop,val) {
    needSaveProject.status = true
    target[prop] = val;
    return true
  },
})


window.s = stateDoor