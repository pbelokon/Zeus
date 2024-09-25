import * as THREE from "three";

function addCube(scene, origin) {
  const newCube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: "purple" }),
  );

  newCube.position.x = origin.x += 1;
  scene.add(newCube);
}

function delete_element(scene, selected_object) {
  if (selected_object !== null) {
    scene.remove(selected_object);
  }
}

export { addCube, delete_element };
