/*
  Entity: Consists of unique id and components array, acts as a box for components 
*/

class Entity {
  constructor(id) {
    this._id = id;
    this.components = [];
  }

  addComponent(component) {
    this.components.push(component);
  }

  get id() {
    return this._id;
  }
}
export default Entity;
