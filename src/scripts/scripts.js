function loadComponent(component) {
  const components = document.querySelector(".components");

  const listElement = document.createElement("li");
  listElement.innerText = `${component.name}`;

  components.appendChild(listElement);
}

export { loadComponent };
