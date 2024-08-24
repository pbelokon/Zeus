function loadComponent(component) {
  const components = document.querySelector(".components");

  const listElement = document.createElement("li");
  listElement.innerText = `${component.name}`;

  components.appendChild(listElement);
}

function deleteComponent(object, scene) {
  scene.remove(object);
}

export { loadComponent, deleteComponent };
