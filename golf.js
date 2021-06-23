import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// Loading
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load("/textures/NormalMap.png");

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
// const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);

// Materials

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.normalMap = normalTexture;

material.color = new THREE.Color(0x292929);

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// Point light 2
const pointLightTwo = new THREE.PointLight(0xff0000, 2);
pointLightTwo.position.set(-1.86, 1, -1.65);
pointLightTwo.intensity = 2.3;
scene.add(pointLightTwo);

// const lightTwo = gui.addFolder("Light Two");

// lightTwo.add(pointLightTwo.position, "y").min(-1).max(3).step(0.01);
// lightTwo.add(pointLightTwo.position, "x").min(-6).max(3).step(0.01);
// lightTwo.add(pointLightTwo.position, "z").min(-1).max(3).step(0.01);
// lightTwo.add(pointLightTwo, "intensity").min(0).max(10).step(0.01);

// Point Light 3
const pointLightThree = new THREE.PointLight(0x96ff, 2);
pointLightThree.position.set(1.6, -1.52, -1.6);
pointLightThree.intensity = 2.6;
scene.add(pointLightThree);

// const lightThree = gui.addFolder("Light Three");

// lightThree.add(pointLightThree.position, "y").min(-1).max(3).step(0.01);
// lightThree.add(pointLightThree.position, "x").min(-6).max(3).step(0.01);
// lightThree.add(pointLightThree.position, "z").min(-1).max(3).step(0.01);
// lightThree.add(pointLightThree, "intensity").min(0).max(10).step(0.01);

// const lightThreeColor = {
//   color: 0xff0000,
// };

// lightThree
//   .addColor(lightThreeColor, "color")
//   .onChange(() => pointLightThree.color.set(lightThreeColor.color));

// const pointLightHelper = new THREE.PointLightHelper(pointLightThree, 1);
// scene.add(pointLightHelper);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

document.addEventListener("mousemove", onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowX;
  mouseY = event.clientY - windowY;
}

const updateSphere = (event) => {
  sphere.position.y = window.scrollY;
};

document.addEventListener("scroll", updateSphere);

const clock = new THREE.Clock();

const tick = () => {
  targetX = mouseX * 0.001;
  targetY = mouseY + 0.001;
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;

  sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y);
  // TODO: spins too fast need to debug
  // sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x);
  // sphere.position.z += -0.05 * (targetY - sphere.rotation.x);

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
