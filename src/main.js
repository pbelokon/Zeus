import * as Three from "three"

const canvas  = document.querySelector("canvas.webgl");


// Scene
const scene = new Three.Scene(); 

// Object 
const geometry= new Three.BoxGeometry(1,1,1); 
const material = new Three.MeshBasicMaterial({color:'green'}); 
const mesh = new Three.Mesh(geometry, material); 


scene.add(mesh); 
console.log(geometry.id)

// Camera 
const size ={ 
  width: 800, 
  height: 600,
}

const camera = new Three.PerspectiveCamera(75, size.width / size.height)
camera.position.z = 3
scene.add(camera)


// Renderer 
const renderer = new Three.WebGLRenderer({
  canvas: canvas
})


renderer.setSize(size.width, size.height)
renderer.render(scene, camera )