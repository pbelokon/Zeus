//############[THREEJS - RENDERER]############
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

//############[TOOLS]############
import Entity from "./ECS/Entity";
import { loadComponent } from "./scripts/scripts";
import { addCube, delete_element } from "./scripts/objectsScripts";

//############[WINDOW]############
// Origin
const origin = {
  x: 0,
  y: 0,
  z: 0,
};
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Window Sizes
const window_sizes = {
  width: window.innerWidth - 300,
  height: window.innerHeight,
};

// Scene
const scene = new THREE.Scene();

// BOX 1
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0xff0000 }),
);

scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window_sizes.width / window_sizes.height,
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

// EXAMPLE - Adding geometry
mesh2.name = "Box Geometry";
console.log(mesh2.name);
example.addComponent(mesh2);
scene.add(example.components[0]);
example.components[0].position.x = 2;
renderer.setSize(window_sizes.width, window_sizes.height);

loadComponent(example.components[0]);

// Spawn Object
const spawn = document.querySelector("#spawn");
spawn.addEventListener("click", () => {
  addCube(scene, origin);
});

// Delete
const delete_button = document.querySelector("#delete");
delete_button.addEventListener("click", () => {
  delete_element(scene, selectedObject);
});

//############[Selector]############

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let selectedObject; // current selected object

document.addEventListener("mousedown", (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);

  const intersections = raycaster.intersectObjects(scene.children, true);

  if (intersections.length > 0) {
    selectedObject = intersections[0].object;
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
