import * as Three from "three";
import GameHandler from "../gameHandler";

export default class MouseHandler {
  constructor(scene, camera, canvas, debug = true) {
    this.scene = scene;
    this.camera = camera;
    this.canvas = canvas;
    this.debug = debug;
    this.mouse = new Three.Vector2();
    this.raycaster = new Three.Raycaster();

    window.addEventListener("click", this.onMouseClick.bind(this), false);
  }

  onMouseClick(event) {
    if (event.target.localName === "canvas") {
      const pos = this.GetCanvasRelativePosition(event);
      this.mouse.x = (pos.x / this.canvas.width) * 2 - 1;
      this.mouse.y = (pos.y / this.canvas.height) * -2 + 1; // note we flip Y
      this.CastRay();
    }
  }

  GetCanvasRelativePosition(event) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) * this.canvas.width) / rect.width,
      y: ((event.clientY - rect.top) * this.canvas.height) / rect.height,
    };
  }

  Debug() {
    //console.log(this.mouse);
    this.scene.add(
      new Three.ArrowHelper(
        this.raycaster.ray.direction,
        this.raycaster.ray.origin,
        10,
        0xff0000
      )
    );
  }

  async CastRay() {
    let hitGameMap = false;
    let hitLocation = null;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    let intersects = this.raycaster.intersectObjects(this.scene.children);
    for (let i = 0; i < intersects.length; i++) {
      const intersection = intersects[i];
      //   console.log("INTERSECTION");
      if (intersection.object.name === "BGPLANE") {
        hitLocation = intersection.point;
      } else if (
        intersection.object.name === "_GAMEMAP" &&
        hitGameMap === false
      ) {
        hitGameMap = true;
      }
    }

    if (hitGameMap) {
      // console.log(hitLocation);
      if (this.debug) {
        this.Debug();
      }
      await GameHandler.SendMarker(hitLocation);
    } else {
      // console.log("Didn't Hit The Game Map");
    }
    // console.log("RAYCASTER");
    // console.log(this.#raycaster);
  }
}
