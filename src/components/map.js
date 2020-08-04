import axios from "axios";
import * as Three from "three";

export default class MapMesh {
  constructor() {}

  async GetMapData() {
    let data = await axios.get(`http://localhost:3333/map/mapdata`);
    return data.data;
  }

  async GenerateMapMesh() {
    let mapVerts = await this.GetMapData();
    let meshes = [];

    let vec3s = [];
    let cubes = [];
    // pust all the points into vector3s
    for (let i = 0; i <= mapVerts.verts.length; i++) {
      const point = mapVerts.verts[i];
      if (i % 3 === 0 && i !== 0) {
        //create a new vector3 and add to list
        let vec3 = new Three.Vector3(
          mapVerts.verts[i - 3],
          mapVerts.verts[i - 2],
          mapVerts.verts[i - 1]
        );
        vec3s.push(vec3);
      }
    }

    for (let i = 0; i <= vec3s.length; i++) {
      const vec3 = vec3s[i];
      if (i % 8 === 0 && i !== 0) {
        //create a reference for all the cubes
        let cube = [];
        //console.log("VEC");
        //console.log(i);
        cube.push(vec3s[i - 8]);
        cube.push(vec3s[i - 7]);
        cube.push(vec3s[i - 6]);
        cube.push(vec3s[i - 5]);
        cube.push(vec3s[i - 4]);
        cube.push(vec3s[i - 3]);
        cube.push(vec3s[i - 2]);
        cube.push(vec3s[i - 1]);
        cubes.push(cube);
      }
    }

    //console.log("CUBES");
    //console.log(cubes);

    //for each box build a geometry and add it to the mesh list
    for (let i = 0; i < cubes.length; i++) {
      let start;
      let end;
      const cube = cubes[i];

      const cubeGeometry = new Three.Geometry();
      const cubeMaterial = new Three.MeshBasicMaterial({ color: 0xa0a0a0 });
      //console.log(`CUBE: ${i}`);
      for (let j = 0; j < cube.length; j++) {
        const vec = cube[j];
        cubeGeometry.vertices.push(vec);
        cubeGeometry.faces.push(
          // front
          new Three.Face3(0, 3, 2),
          new Three.Face3(0, 1, 3),
          // right
          new Three.Face3(1, 7, 3),
          new Three.Face3(1, 5, 7),
          // back
          new Three.Face3(5, 6, 7),
          new Three.Face3(5, 4, 6),
          // left
          new Three.Face3(4, 2, 6),
          new Three.Face3(4, 0, 2),
          // top
          new Three.Face3(2, 7, 6),
          new Three.Face3(2, 3, 7),
          // bottom
          new Three.Face3(4, 1, 0),
          new Three.Face3(4, 5, 1)
        );
      }

      //Create a mesh, and add it to the mesh list
      const cubeMesh = new Three.Mesh(cubeGeometry, cubeMaterial);
      cubeMesh.name = "_GAMEMAP";
      meshes.push(cubeMesh);
    }

    //Since these are cubes for now, for every 6 points do the following
    // let geometry = new Three.BufferGeometry();
    // let verts = new Float32Array(mapVerts.verts);
    // console.log(verts);
    // //console.log(verts2);
    // geometry.setAttribute("position", new Three.BufferAttribute(verts, 3));
    let material = new Three.MeshBasicMaterial({
      color: 0x000000,
      //side: Three.DoubleSide,
    });
    return meshes;
  }
}

export { MapMesh };
