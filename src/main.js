import * as Three from "three"

class Input {
  static rightArrowPressed = false;
  static rightMovePressed = false;
  static upArrowPressed = false;

  static setRightArrowPressedState(rightArrowPressedState) {
    Input.rightArrowPressed = rightArrowPressedState;
  }

  static setRightMovePressedState(rightMovePressedState) {
    Input.rightMovePressed = rightMovePressedState;
  }

  static setUpArrowPressedState(upArrowPressedState) {
    Input.upArrowPressed = upArrowPressedState;
  }
}

const canvas  = document.querySelector("canvas.webgl");

// Scene
const scene = new Three.Scene();

// Object
const geometry= new Three.BoxGeometry(1, 1, 1);
const grid = new Three.GridHelper(50, 50);
const material = new Three.MeshBasicMaterial({ color: 'green' }); 

const jack = new Three.Mesh(geometry, material);
const bryan = new Three.Mesh(geometry, material);

const group = new Three.Group();
const anchor = new Three.Group();
// jack.position.z -= 3;
// jack.position.x -= 2;
bryan.position.x -= 2;
group.add(jack);
anchor.add(bryan);
group.add(anchor);
group.position.z = -3;
group.position.x -= 2;
const mesh = new Three.Mesh(geometry, material); 

scene.add(grid);
scene.add(mesh);
scene.add(group);

// Camera 
const size = { 
  width: 800, 
  height: 600,
};

const camera = new Three.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 3;
scene.add(camera);

// Renderer 
const renderer = new Three.WebGLRenderer({
  canvas: canvas
});

renderer.setSize(size.width, size.height);


window.addEventListener("keydown", function (event) {
  if (event.code === "ArrowRight") {
    Input.setRightArrowPressedState(true);
  }
  if (event.code === "ArrowLeft") {
    mesh.position.x -= 1;
  }
  if (event.code === "ArrowUp") {
    Input.setUpArrowPressedState(true);
  }
  if (event.code === "ArrowDown") {
    camera.position.y -= 0.01;
  }
  if (event.code === "KeyW") {
    camera.position.z -= 0.01;
  }
  if (event.code === "KeyS") {
    camera.position.z += 0.01;
  }
  if (event.code === "KeyD") {
    Input.setRightMovePressedState(true);
  }
});

window.addEventListener("keyup", function (event) {
  if (event.code === "ArrowRight") {
    Input.setRightArrowPressedState(false);
  }

  if (event.code === "ArrowUp") {
    Input.setUpArrowPressedState(false);
  }

  if (event.code === "KeyD") {
    Input.setRightMovePressedState(false);
  }
});

const rotationComponents = [
  { mesh: anchor, angularVelocity: -0.05 },
  { mesh: jack, angularVelocity: 0.01 },
  { mesh: bryan, angularVelocity: 0.1 }
];

function updateRotationSystem(rotationComponents) {
  for (let i = 0; i < rotationComponents.length; ++i) {
    rotationComponents[i].mesh.rotation.y += rotationComponents[i].angularVelocity;
  }
}

renderer.setAnimationLoop(function() {
  // mesh.rotation.y += 0.01;
  if (Input.rightArrowPressed) {
    mesh.position.x += 0.01;
  }

  if (Input.upArrowPressed) {
    camera.position.y += 0.01;
  }

  if (Input.rightMovePressed) {
    camera.position.x += 0.01;
  }

  updateRotationSystem(rotationComponents);

  renderer.render(scene, camera);
});