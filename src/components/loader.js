import * as Three from "three";

export default class Camera {
  #camera;
  constructor(type, options) {
    if (type === "orthographic") {
      if (options === null || options === undefined) {
        options = { size: 10, near: 1, far: 1000 };
      } else {
        console.log(options);
        options.size =
          options.size !== undefined || options.size !== null
            ? options.size
            : 10;

        options.near =
          options.near !== undefined || options.near !== null
            ? options.near
            : 1;

        options.far =
          options.far !== undefined || options.far !== null
            ? options.far
            : 1000;
        // options.size == undefined ? options.size : 10;
        // options.near ? options.near : 1,
        // options.far ? options.far : 1000;
      }
      this.#camera = new Three.OrthographicCamera(
        -options.size,
        options.size,
        options.size,
        -options.size,
        options.near,
        options.far
      );
    } else if (type === "perspective") {
      this.#camera = new Three.PerspectiveCamera(
        options.fov ? options.fov : 45,
        options.aspect ? options.aspect : 1,
        options.near ? options.near : 1,
        options.far ? options.far : 1000
      );
    } else {
      return null;
    }
  }
  get camera() {
    return this.GetCamera();
  }
  // Rotate the camera (uses degrees)
  GetCamera() {
    return this.#camera;
  }

  Rotate(x, y, z) {
    this.#camera.rotation.set(
      Three.MathUtils.degToRad(x),
      Three.MathUtils.degToRad(y),
      Three.MathUtils.degToRad(z)
    );
  }

  Move(x, y, z) {
    this.#camera.position.set(x, y, z);
  }
}

export { Camera };
