import { Scene, PerspectiveCamera, WebGLRenderer, DirectionalLight, AmbientLight } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const generate3DThumbnail = (file) => {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    const url = URL.createObjectURL(file);

    const scene = new Scene();
    const camera = new PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 2;

    const renderer = new WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(256, 256);

    scene.add(new DirectionalLight(0xffffff, 1));
    scene.add(new AmbientLight(0x404040));

    loader.load(
      url,
      (gltf) => {
        scene.add(gltf.scene);
        renderer.render(scene, camera);
        const thumbnail = renderer.domElement.toDataURL("image/jpeg");
        URL.revokeObjectURL(url);
        resolve(thumbnail);
      },
      undefined,
      (err) => reject(err)
    );
  });
};
