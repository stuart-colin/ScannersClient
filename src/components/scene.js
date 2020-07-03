import * as Three from "three";
export default class Scene {
  #scene;
  constructor(options) {
    if (options === undefined || options === null) {
      this.autoUpdate = true;
      this.background = null;
      this.environment = null;
      this.fog = null;
      this.overrideMaterial = null;
    } else {
      this.autoUpdate = options.autoUpdate ? options.autoUpdate : true;
      this.background = options.background ? options.background : null;
      this.environment = options.environment ? options.environment : null;
      this.fog = options.fog ? options.fog : null;
      this.overrideMaterial = options.overrideMaterial
        ? options.overrideMaterial
        : null;
    }

    this.#scene = new Three.Scene();
    this.#scene.autoUpdate = this.autoUpdate;
    this.#scene.background = this.background;
    this.#scene.environment = this.environment;
    this.#scene.fog = this.fog;
    this.#scene.overrideMaterial = this.overrideMaterial;
  }
  get scene() {
    return this.GetScene();
  }

  GetScene() {
    return this.#scene;
  }

  Add(data) {
    this.#scene.add(data);
    console.log(`${data}: added to scene`);
  }
}
