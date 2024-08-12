import * as THREE from "three";

function addCube(scene) {
  const newCube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: "purple" }),
  );

  scene.add(newCube);
}

export { addCube };
