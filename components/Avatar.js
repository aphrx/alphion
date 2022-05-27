// // // // const assetObj = Asset.fromModule(require('../assets/model.obj'));
// // // // const assetMtl = Asset.fromModule(require('../assets/model.mtl'));

// // import React from 'react';
// // import ExpoTHREE, { THREE } from 'expo-three';
// // import { GraphicsView } from 'expo-graphics';

// // export default class Avatar extends React.Component {

// //   componentDidMount() {
// //     THREE.suppressExpoWarnings();
// //   }

// //   // When our context is built we can start coding 3D things.
// //   onContextCreate = async ({ gl, pixelRatio, width, height }) => {
// //     console.log("creating contextt")
// //     // Create a 3D renderer
// //     this.renderer = new ExpoTHREE.Renderer({
// //       gl,
// //       pixelRatio,
// //       width,
// //       height,
// //     });

// //     // We will add all of our meshes to this scene.
// //     console.log('loading')
// //     this.scene = new THREE.Scene();
// //     this.scene.background = new THREE.Color(0xbebebe)
// //     this.camera = new THREE.PerspectiveCamera(45, width/height, 1, 1000)
// //     this.camera.position.set(3, 3, 3);
// //     this.camera.lookAt(0, 0, 0);
// //     this.scene.add(new THREE.AmbientLight(0xffffff));
    
// //     await this.loadModel();
// //   };

// //   loadModel = async () => {
// //     console.log("loading model")
// //     const obj = {
// //         "model.obj": require('../assets/model.obj'),
// //         "model.mtl": require('../assets/model.mtl'),
// //       }
  
// //       const model = await ExpoTHREE.loadAsync(
// //         [obj['model.obj'], obj['model.mtl']],
// //         null,
// //         obj
// //       );

// //     // this ensures the model will be small enough to be viewed properly
// //     ExpoTHREE.utils.scaleLongestSideToSize(model, 1);
// //     this.scene.add(model)
// //   };

// //   // When the phone rotates, or the view changes size, this method will be called.
// //   onResize = ({ x, y, scale, width, height }) => {
// //     // Let's stop the function if we haven't setup our scene yet
// //     if (!this.renderer) {
// //       return;
// //     }
// //     this.camera.aspect = width / height;
// //     this.camera.updateProjectionMatrix();
// //     this.renderer.setPixelRatio(scale);
// //     this.renderer.setSize(width, height);
// //   };

// //   // Called every frame.
// //   onRender = delta => {
// //     // Finally render the scene with the Camera
// //     this.renderer.render(this.scene, this.camera);
// //   };

// //   render() {
// //     console.log("hi")
// //     return (
// //       <GraphicsView
// //         onContextCreate={this.onContextCreate}
// //         onRender={this.onRender}
// //         onResize={this.onResize}
// //       />
// //     );
// //   }
// // }

// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
// import { GLView } from 'expo-gl';
// import { Asset } from 'expo-asset';
// import { Renderer} from 'expo-three';
// import * as React from 'react';
// import {
//   AmbientLight,
//   Fog,
//   PerspectiveCamera,
//   PointLight,
//   Scene,
//   SpotLight,
// } from 'three';

// export default function Avatar() {
//   console.log("glview?")

//   let timeout;

//   React.useEffect(() => {
//     // Clear the animation loop when the component unmounts
//     return () => clearTimeout(timeout);
//   }, []);


//   return (
    
//     <GLView
//       style={{ flex: 1 }}
//       onContextCreate={async (gl) => {
//         console.log
//         const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
//         const sceneColor = 668096;

//         // Create a WebGLRenderer without a DOM element
//         const renderer = new Renderer({ gl });
//         renderer.setSize(width, height);
//         renderer.setClearColor(0x668096);

//         const camera = new PerspectiveCamera(70, width / height, 0.01, 1000);
//         camera.position.set(2, 5, 5);

//         const scene = new Scene();
//         scene.fog = new Fog(sceneColor, 1, 10000);

//         const ambientLight = new AmbientLight(0x101010);
//         scene.add(ambientLight);

//         const pointLight = new PointLight(0xffffff, 2, 1000, 1);
//         pointLight.position.set(0, 200, 200);
//         scene.add(pointLight);

//         const spotLight = new SpotLight(0xffffff, 0.5);
//         spotLight.position.set(0, 500, 100);
//         spotLight.lookAt(scene.position);
//         scene.add(spotLight);
    
//         const asset = Asset.fromModule(require('../assets/model.obj'));
//         await asset.downloadAsync();

//         // instantiate a loader
//         const loader = new OBJLoader();

//         // load a resource
//         loader.load(
//             // resource URL
//             asset.localUri,
//             // called when resource is loaded
//             function ( object ) {
//                 object.scale.set(0.065, 0.065, 0.065)
//                 scene.add( object );
//                 camera.lookAt(object.position)
//             //rotate my obj file
//                 function rotateObject(object, degreeX=0, degreeY=0, degreeZ=0) {
//                     object.rotateX(THREE.Math.degToRad(degreeX));
//                     object.rotateY(THREE.Math.degToRad(degreeY));
//                     object.rotateZ(THREE.Math.degToRad(degreeZ));
//                  }
                 
//                  // usage:
//                  console.log("glview2")
//                  rotateObject(object, 0, 0, 70);

//                 //animate rotation
//                 function update() {
//                     object.rotation.x += 0.015
//                 }
//                 const render = () => {
//                     console.log("rendering")
//                     timeout = requestAnimationFrame(render);
//                     update();
//                     renderer.render(scene, camera);
//                     gl.endFrameEXP();
//                   };
//                 render();
//             },
           
//             // called when loading is in progresses
//             function ( xhr ) {

//                 console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

//             },
//             // called when loading has errors
//             function ( error ) {

//                 console.log( error );

//             }
        
//         );   
//       }}
//     />
//   );  
// }


// // // const assetObj = Asset.fromModule(require('../assets/model.obj'));
// // // const assetMtl = Asset.fromModule(require('../assets/model.mtl'));

// import React from 'react'
// import { View } from 'react-native'
// import Expo from 'expo'
// import ExpoTHREE, { , loadObjAsync } from 'expo-three'
// 
// import { BoxBufferGeometry } from '../node_modules/three/build/three'
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { Asset } from 'expo-asset';
import React from 'react'
import { View } from 'react-native'
import { loadObjAsync, loadTextureAsync, Renderer } from 'expo-three';
import { resolveAsync } from 'expo-asset-utils';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
import { GLView } from 'expo-gl'
import { Scene, Mesh, MeshStandardMaterial, PerspectiveCamera, PointLight, HemisphereLight, AmbientLight } from 'three'


const Avatar = () => {

  onContextCreate = async (gl, data) => {
    // const {setRenderer, setCamera, setScene} = data;
    // const { selected } = data;
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    const sceneColor = 0xabd2c3;
    // Create a WebGLRenderer without a DOM element
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    renderer.setClearColor(sceneColor);
  
    const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(50, 100, 200);
    
    const scene = new Scene();
  
    const pointLight = new PointLight(0xffffff, 2, 1000, 1);
    pointLight.position.set(0, 30, 100);
    // scene.add(pointLight);
  
    // HemisphereLight - color feels nicer
    const hemisphereLight = new HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(hemisphereLight);
  
    // AmbientLight - add more brightness?
    const ambientLight = new AmbientLight(0x404040); // soft white light
    scene.add(ambientLight);
  
    const icebear = {
      type: 'fbx',
      name: 'icebear',
      isometric: false,
      model: require('../assets/model.fbx'),
      textures: [
        // {
        //   name: 'axepCube3',
        //   image: require('../models/icebear/textures/TXaxe.xjpg'),
        // },
        // {
        //   name: 'polySurface10',
        //   image: require('../models/icebear/textures/TXpolar.xjpg'),
        // },
      ],
      scale: {
        x: 1,
        y: 1,
        z: 1,
      },
      position: {
        x: 0,
        y: -1,
        z: 0,
      },
      animation: {
        rotation: {
          y: 0.01, // to animate horizontally
        },
      },
    };
    
    const model = await loadModel(icebear);
    scene.add(model);
    
    function update() {
      // define your own update here
      // eg. if (model) model.rotation.y += icebear.animation.rotation.y;
    }
    
    // Setup an animation loop
    const render = () => {
      requestAnimationFrame(render);
      // model.rotation.x += 0.01
      model.rotation.y += 0.01
      update();
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
  
    render();
  };

  return (
    <View>
      <GLView 
        onContextCreate={ onContextCreate }
        style = {{width: 450, height:500}}
      />
    </View>
  )
}

async function loadFileAsync({ asset, funcName }) {
  if (!asset) {
    throw new Error(`ExpoTHREE.${funcName}: Cannot parse a null asset`);
  }
  return (await resolveAsync(asset)).localUri ?? null;
}

export async function loadFbxAsync({ asset, onAssetRequested }) {
  const uri = await loadFileAsync({
    asset,
    funcName: 'loadFbxAsync',
  });
  if (!uri) return;
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  const arrayBuffer = decode(base64);
  const loader = new FBXLoader();
  return loader.parse(arrayBuffer, onAssetRequested);
}
export async function loadGLTFAsync({ asset, onAssetRequested }) {
  const uri = await loadFileAsync({
    asset,
    funcName: 'loadGLTFAsync',
  });
  if (!uri) return;
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  const arrayBuffer = decode(base64);
  const loader = new GLTFLoader();
  return new Promise((resolve, reject) => {
    loader.parse(
      arrayBuffer,
      onAssetRequested,
      result => {
        resolve(result);
      },
      err => {
        reject(err);
      },
    );
  });
}

export const loadModel = async function(item) {
  const texturesLength = item.textures?.length || 0;
  console.log(`[loadModel] -> Textures length: ${texturesLength}`);
  const textures = [];
  for (let i = 0; i < texturesLength; i++) {
    const texture = await loadTextureAsync({
      asset: item.textures[i].image,
    });
    if (item.type === 'glb') {
      texture.flipY = false;
    }
    textures.push({ name: item.textures[i]?.name || '-', map: texture });
  }
  console.log(`[loadModel] -> Textures done loading`);
  // console.log(textures);

  let obj = null;
  if (item.type === 'obj') {
    obj = await loadObjAsync({
      asset: item.model,
      mtlAsset: item?.material || undefined,
    });
  } else if (item.type === 'fbx') {
    obj = await loadFbxAsync({ asset: item.model });
  } else if (item.type === 'gltf' || item.type === 'glb') {
    const result = await loadGLTFAsync({ asset: item.model });
    console.log(result);
    obj = result.scene;
  }

  console.log(`[loadModel] -> Model done loading, adding textures now...`);

  if (texturesLength > 0) {
    if (texturesLength === 1) {
      obj.traverse(function(object) {
        if (object instanceof THREE.Mesh) {
          object.material.map = textures[0]?.map;
        }
      });
    } else {
      obj.traverse(function(object) {
        if (object instanceof THREE.Mesh) {
          // console.log(
          //   `[loadModel] -> Traverse object name: ${object.name}`,
          // );
          // console.log(object);
          // const selected = textures?.find(x => x.name === object.name);
          // object.material.map = selected?.map;
        }
      });
    }
  }
  console.log(`[loadModel] -> Textures done applied...`);

  if (item.scale) {
    obj.scale.set(item.scale.x, item.scale.y, item.scale.z);
  }
  if (item.position) {
    obj.position.set(item.position.x, item.position.y, item.position.z);
  }
  if (item.rotation) {
    obj.rotation.x = item.rotation.x;
    obj.rotation.y = item.rotation.y;
    obj.rotation.z = item.rotation.z;
  }
  return obj;
};

export default Avatar