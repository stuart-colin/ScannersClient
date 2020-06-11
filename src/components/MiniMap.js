import React from "react";
import * as THREE from "three";
import { updatePosition } from "../updatePosition";

const mapStyle = {
  border: "2px solid",
  borderColor: "blue",
  margin: "10px",
  width: "250px",
  height: "250px",
  position: "absolute",
};

const mapContainerStyle = {
  padding: "10px",
  width: "300px",
  height: "300px",
};

const hSliderStyle = {
  width: "250px",
  height: "5px",
  marginTop: "275px",
  marginLeft: "12px",
  position: "absolute",
};

const vSliderStyle = {
  width: "250px",
  height: "5px",
  marginLeft: "150px",
  marginTop: "134px",
  position: "absolute",
  transform: "rotate(-90deg)",
};

class MiniMap extends React.Component {
  constructor(props) {
    super(props);
    updatePosition((err, position) =>
      this.setState({
        position,
      })
    );
  }
  state = { position: { x: "0", y: "0" } };

  componentDidMount() {
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var width = 10;
    var height = 10;
    var camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      1,
      1000
    );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(250, 250);
    document.getElementById("map-container").appendChild(renderer.domElement);
    var bgGeometry = new THREE.BoxGeometry(10, 10, 10);
    var bgMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    var geometry = new THREE.BoxGeometry(0.25, 0.25, 0.25);
    var material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    var bg = new THREE.Mesh(bgGeometry, bgMaterial);
    var cube = new THREE.Mesh(geometry, material);

    scene.add(cube);
    scene.add(bg);
    camera.position.z = 5;
    camera.position.x = 5;
    camera.position.y = 5;

    var animate = () => {
      requestAnimationFrame(animate);
      cube.position.x = this.state.position.x;
      cube.position.y = this.state.position.y;
      renderer.render(scene, camera);
    };
    animate();
    // === THREE.JS EXAMPLE CODE END ===
  }

  render() {
    console.log(this.state);

    return (
      <div className="ui segment" style={mapContainerStyle}>
        <div id="map-container" style={mapStyle}></div>
        <div>
          <input
            id="x-position"
            style={hSliderStyle}
            type="range"
            step="0.0001"
            min="0"
            max="10"
            value={this.state.posX}
            onChange={(e) => this.setState({ posX: e.target.value })}
            className="slider"
          />
        </div>
        <div>
          <input
            id="y-position"
            style={vSliderStyle}
            type="range"
            step="0.0001"
            min="0"
            max="10"
            value={this.state.posY}
            onChange={(e) => this.setState({ posY: e.target.value })}
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
