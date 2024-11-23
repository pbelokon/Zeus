function loadComponent(component) {
  const components = document.querySelector(".object_menu");

  const listElement = document.createElement("li");
  listElement.innerText = `${component.name}`;

  components.appendChild(listElement);
}

function deleteComponent(object, scene) {
  scene.remove(object);
}

export { loadComponent, deleteComponent };
