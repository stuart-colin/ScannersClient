import React from "react";
import * as THREE from "three";
import Scene from "../components/scene";
import Camera from "../components/camera";
import { log } from "three";

class MiniMap extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //Create a scene
    let scene = new Scene({ background: new THREE.Color(0xa0a0a0) });
    let camera = new Camera("orthographic", { size: 16 });
    //let camera = new Camera("perspective", {});
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(540, 540);
    renderer.shadowMap.enabled = true;

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x0000ff });

    var grid = new THREE.GridHelper(130, 130, 0x000000, 0x000000);
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.Add(grid);

    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, 0);
    scene.Add(cube);
    camera.Move(0, 20, 0);
    camera.Rotate(-90, 0, 0);

    document.getElementById("three-container").appendChild(renderer.domElement);
    var animate = () => {
      requestAnimationFrame(animate);

      renderer.render(scene.scene, camera.camera);
    };
    animate();
  }

  render() {
    return <div id="three-container"></div>;
  }
}

export default MiniMap;
