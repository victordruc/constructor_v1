export default class MainRightPanel {
  constructor(container) {
    this.container = container;
    this.children = [];
  }

  addChildren(children) {
    this.children.push(children);
  }

  render() {
    this.children.forEach((item) => item.render(this.container));
  }

  remove() {
    this.children = [];
  }

}
