import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Entity from "./ECS/Entity";
import { loadComponent } from "./scripts/scripts";
import { addCube } from "./scripts/objectsScripts";

//############[Base]############

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0xff0000 }),
);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);

camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Axes Helper
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

//############[Entity example]############
const example = new Entity(1, {});

const mesh2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: "green" }),
);

mesh2.name = "Box Geometry";
console.log(mesh2.name);
example.addComponent(mesh2);
scene.add(example.components[0]);
example.components[0].position.x = 2;
renderer.setSize(sizes.width, sizes.height);

loadComponent(example.components[0]);

// Spawn Object
const spawn = document.querySelector("#spawn");
spawn.addEventListener("click", () => {
  addCube(scene);
});

//############[Selector]############

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

document.addEventListener("mousedown", (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);

  const intersections = raycaster.intersectObjects(scene.children, true);

  if (intersections.length > 0) {
    const selectedObject = intersections[0].object;
    const color = new THREE.Color(Math.random(), Math.random(), Math.random());
    selectedObject.material.color = color;
    console.log("Selected Object:", selectedObject);
    console.log("Object Name:", selectedObject.name);
  }
});

// Context Menu
window.addEventListener("contextmenu", function (event) {
  event.preventDefault();
  const contextmenu = document.getElementById("context-menu");
  contextmenu.style.top = event.offsetY + "px";
  contextmenu.style.left = event.offsetX + "px";
  contextmenu.classList.add("active");
});

//############[Delete]############

//############[Animate]############

const clock = new THREE.Clock(scene);

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
