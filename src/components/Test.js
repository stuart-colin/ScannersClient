import React from "react";
import * as THREE from "three";
import Scene from "../components/scene";
import Camera from "../components/camera";
import MapMesh from "../components/map";
import { Vector3, Quaternion, Euler } from "three";
import MouseHandler from "./mouseHandler";
import GameHandler from "../gameHandler";
//import { updatePosition } from "../updatePosition";

let mapStyle = {
  height: 540,
  width: 540,
};

class MiniMap extends React.Component {
  constructor(props) {
    super(props);

    GameHandler.updateClientPlayer((err, clientData) =>
      this.setState(clientData)
    );
  }
  state = {
    position: { x: "0", y: "0", z: "0" },
    rotation: { x: "90", y: "0", z: "0" },
  };

  async componentDidMount() {
    //Create a scene
    let scene = new Scene({ background: new THREE.Color(0x000000) });
    //let scene = new Scene();
    let camera = new Camera("orthographic", { size: 16 });
    let camera2 = new Camera("perspective", {});

    //let camera = new Camera("perspective", {});
    let canvas = document.getElementById("main_camera");
    new MouseHandler(scene.GetScene(), camera.GetCamera(), canvas);
    var renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(540, 540);
    renderer.shadowMap.enabled = true;

    //let debugCanvas = document.getElementById("debug_camera");
    // var debugRenderer = new THREE.WebGLRenderer();
    // debugRenderer.setPixelRatio(window.devicePixelRatio);
    // debugRenderer.setSize(540, 540);
    // debugRenderer.shadowMap.enabled = true;

    var geometry = new THREE.ConeGeometry();
    var material = new THREE.MeshBasicMaterial({ color: 0x0000ff });

    // var grid = new THREE.GridHelper(130, 130, 0x000000, 0x000000);
    // grid.material.opacity = 0.2;
    // grid.material.transparent = true;
    // scene.Add(grid);

    var bgplane = new THREE.PlaneGeometry(100, 100, 32);
    var bgplanematerial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      side: THREE.DoubleSide,
    });
    var plane = new THREE.Mesh(bgplane, bgplanematerial);
    plane.name = "BGPLANE";
    plane.position.y = -10;
    plane.rotateX(90);
    scene.Add(plane);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, 0);
    cube.rotation.set(
      THREE.MathUtils.degToRad(90),
      cube.rotation.y,
      cube.rotation.z
    );
    let map = new MapMesh();
    let mapMeshes = await map.GenerateMapMesh();
    for (let i = 0; i < mapMeshes.length; i++) {
      const mapMesh = mapMeshes[i];
      mapMesh.position.set(0, -1, 0);
      scene.Add(mapMesh);
    }
    scene.Add(cube);
    // camera.Move(0, 0, 0);
    // camera.Rotate(20, 0, 0);
    camera.Move(0, 20, 0);
    camera.Rotate(-90, 0, 180);

    // camera2.Move(0, 40, 0);
    // camera2.Rotate(-90, 0, 180);

    // document
    //   .getElementById("debug_camera")
    //   .appendChild(debugRenderer.domElement);

    var animate = () => {
      // cube.position.set(
      //   this.state.position.x,
      //   cube.position.y,
      //   this.state.position.z
      // );
      // cube.rotation.set(
      //   cube.rotation.x,
      //   cube.rotation.y,
      //   THREE.MathUtils.degToRad(-this.state.rotation.y)
      // );
      let newPosition = new Vector3(
        this.state.position.x,
        cube.position.y,
        this.state.position.z
      );
      let currentRotation = new Vector3(
        cube.rotation.x,
        cube.rotation.y,
        cube.rotation.z
      );

      let newRotation = new Euler(
        cube.rotation.x,
        cube.rotation.y,
        THREE.MathUtils.degToRad(-this.state.rotation.y)
      );

      let newQuaternion = new Quaternion().setFromEuler(newRotation);

      let rot = new Vector3().lerpVectors(currentRotation, newRotation, 0.05);
      cube.position.lerp(newPosition, 0.05);
      //cube.rotation.setFromVector3(rot);
      cube.quaternion.slerp(newQuaternion, 0.05);
      // cube.rotation.set(
      //   cube.rotation.x,
      //   cube.rotation.y,
      //   THREE.MathUtils.degToRad(-this.state.rotation.y)
      // );
      // cube.rotation.lerp(newRotation, 0.05);
      //debugRenderer.render(scene.GetScene(), camera2.GetCamera());

      //Camera move
      let playerPosition = new Vector3(
        cube.position.x,
        camera.GetCamera().position.y,
        cube.position.z
      );
      camera.GetCamera().position.lerp(playerPosition, 0.2);

      renderer.render(scene.GetScene(), camera.GetCamera());
      requestAnimationFrame(animate);
    };
    animate();
  }

  render() {
    return (
      <div>
        <div>
          <canvas id="main_camera" style={mapStyle}></canvas>
        </div>

        <div id="debug_camera" style={mapStyle}></div>
      </div>
    );
  }
}

export default MiniMap;
