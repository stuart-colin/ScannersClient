import React from "react";
import * as THREE from "three";
import Scene from "../components/scene";
import Camera from "../components/camera";
import MapMesh from "../components/map";
import { log } from "three";
import MouseHandler from "./mouseHandler";

let mapStyle = {
  height: 540,
  width: 540,
};

class MiniMap extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    //Create a scene
    let scene = new Scene({ background: new THREE.Color(0xa0a0a0) });
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
    var debugRenderer = new THREE.WebGLRenderer();
    debugRenderer.setPixelRatio(window.devicePixelRatio);
    debugRenderer.setSize(540, 540);
    debugRenderer.shadowMap.enabled = true;

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x0000ff });

    // var grid = new THREE.GridHelper(130, 130, 0x000000, 0x000000);
    // grid.material.opacity = 0.2;
    // grid.material.transparent = true;
    // scene.Add(grid);

    var bgplane = new THREE.PlaneGeometry(100, 100, 32);
    var bgplanematerial = new THREE.MeshBasicMaterial({
      color: 0xa0a0a0,
      side: THREE.DoubleSide,
    });
    var plane = new THREE.Mesh(bgplane, bgplanematerial);
    plane.name = "BGPLANE";
    plane.position.y = -10;
    plane.rotateX(90);
    scene.Add(plane);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, 0);
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

    camera2.Move(0, 40, 0);
    camera2.Rotate(-90, 0, 180);

    document
      .getElementById("debug_camera")
      .appendChild(debugRenderer.domElement);

    var animate = () => {
      debugRenderer.render(scene.GetScene(), camera2.GetCamera());
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
