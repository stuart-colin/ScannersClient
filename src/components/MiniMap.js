import React from "react";
import * as THREE from "three";
// import { FBXLoader } from "../three/examples/js/loaders";
import { OrbitControls } from "../../node_modules/three/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from "../../node_modules/three/examples/jsm/loaders/FBXLoader.js";

import { updatePosition } from "../updatePosition";
import { log } from "three";
import { Vector3 } from "three/build/three.module";

const mapStyle = {
  border: "2px solid",
  borderColor: "blue",
  margin: "10px",
  width: "960px",
  height: "960px",
  position: "absolute",
};

const mapContainerStyle = {
  padding: "10px",
  width: "300px",
  height: "300px",
};

const hSliderStyle = {
  width: "960px",
  height: "960px",
  marginTop: "500px",
  marginLeft: "12px",
  position: "absolute",
  transform: "rotate(180deg)",
};

const vSliderStyle = {
  width: "960px",
  height: "960px",
  marginLeft: "500px",
  marginTop: "0px",
  position: "absolute",
  transform: "rotate(-90deg)",
};

const height = 100;
const width = 100;

class MiniMap extends React.Component {
  constructor(props) {
    super(props);
    updatePosition((err, position) =>
      this.setState({
        position,
      })
    );
  }
  state = { position: { x: "0", z: "0" } };

  componentDidMount() {
    // === THREE.JS CODE START ===

    var scene = new THREE.Scene();
    // var width = 30;
    // var height = this.height;
    // var camera = new THREE.OrthographicCamera(
    //   width / -2,
    //   width / 2,
    //   height / 2,
    //   height / -2,
    //   1,
    //   3000
    // );
    // camera.position.z = 1000;
    // camera.rotation.setFromVector3(new Vector3(1, 0, 0));
    //camera.position.set(150, 200, -500);
    // camera.zoom = 0.0035;

    //PRE ROTATION:
    // -1.57, -1.57, 0

    function RotateCameraDegrees(x, y, z) {
      camera.rotation.set(
        THREE.MathUtils.degToRad(x),
        THREE.MathUtils.degToRad(y),
        THREE.MathUtils.degToRad(z)
      );
    }

    var camera = new THREE.PerspectiveCamera(45, 1, 1, 5000);
    camera.position.set(0, 200, 0);
    RotateCameraDegrees(270, 0, 180);

    console.log(THREE.MathUtils.radToDeg(camera.rotation.y));

    scene.background = new THREE.Color(0xa0a0a0);

    var light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(0, 200, 0);
    scene.add(light);
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(960, 960);
    renderer.shadowMap.enabled = true;
    document.getElementById("map-container").appendChild(renderer.domElement);
    // var mesh = new THREE.Mesh(
    //   new THREE.PlaneBufferGeometry(2000, 2000),
    //   new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
    // );
    // mesh.rotation.x = -Math.PI / 2;
    // mesh.receiveShadow = true;
    // scene.add(mesh);
    var grid = new THREE.GridHelper(130, 130, 0x000000, 0x000000);
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add(grid);
    var loader = new FBXLoader();
    loader.load(`levelMapJoined.fbx`, function (object) {
      console.log(object);
      object.position.x = 0;
      object.position.y = 0;
      object.position.z = 0;
      object.scale.set(0.05, 0.05, -0.05);
      scene.add(object);
    });

    var geometry = new THREE.BoxGeometry(3, 3, 3);
    var material = new THREE.MeshBasicMaterial({ color: 0x0000ff });

    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, 0);
    scene.add(cube);

    // camera.position.z = 5;
    // camera.position.x = 0;
    // camera.position.y = 0;

    var animate = () => {
      requestAnimationFrame(animate);
      // console.log(
      //   `ROTATION: ${camera.rotation.x},${camera.rotation.y},${camera.rotation.z}`
      // );
      // console.log(
      //   `POSITION: ${camera.position.x},${camera.position.y},${camera.position.z}`
      // );
      //console.log(camera);

      cube.position.x = this.state.position.x;
      cube.position.z = this.state.position.z;
      // if (cube.position.y > 10) {
      //   camera.position.y = cube.position.y;
      // }
      renderer.render(scene, camera);
      //camera.position.x += 0.01;
    };
    animate();

    // var controls = new OrbitControls(camera, renderer.domElement);
    // // controls.target.set(0, 100, 0);
    // controls.update();
    // window.addEventListener("resize", onWindowResize, false);
    // function onWindowResize() {
    //   camera.aspect = window.innerWidth / window.innerHeight;
    //   camera.updateProjectionMatrix();

    //   renderer.setSize(640, 640);
    // }
    // === THREE.JS EXAMPLE CODE END ===
  }

  render() {
    return (
      <div className="ui segment" style={mapContainerStyle}>
        <div id="map-container" style={mapStyle}></div>
        <div>
          <input
            id="x-position"
            style={hSliderStyle}
            type="range"
            step="1"
            min="-15"
            max="15"
            value={this.state.position.x}
            onChange={(e) =>
              this.setState({
                position: { x: e.target.value, z: this.state.position.z },
              })
            }
            className="slider"
          />
        </div>
        <div>
          <input
            id="z-position"
            style={vSliderStyle}
            type="range"
            step="1"
            min="-15"
            max="15"
            value={this.state.position.z}
            onChange={(e) =>
              this.setState({
                position: { z: e.target.value, x: this.state.position.x },
              })
            }
            className="slider"
          />
        </div>
        <div style={{ marginTop: "275px", marginLeft: "275px" }}>
          <span>
            {this.state.posX}, {this.state.posY}
          </span>
        </div>
      </div>
    );
  }
}

export default MiniMap;
