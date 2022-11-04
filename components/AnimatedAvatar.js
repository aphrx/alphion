
// import React from 'react'
// import { View } from 'react-native'
// import { loadObjAsync, loadTextureAsync, Renderer } from 'expo-three';
// import { resolveAsync } from 'expo-asset-utils';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import * as FileSystem from 'expo-file-system';
// import { decode } from 'base64-arraybuffer';
// import { GLView } from 'expo-gl'
// import { Model } from './Model'
// import { Scene, PerspectiveCamera, PointLight, HemisphereLight, AmbientLight, DirectionalLight } from 'three'

// const AnimatedAvatar = () => {
//   let clock = new THREE.Clock();
//   let mixer = new THREE.AnimationMixer();
//   let animationAction = null;

//   onContextCreate = async (gl, data) => {
//     // const {setRenderer, setCamera, setScene} = data;
//     // const { selected } = data;
//     const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
//     // const sceneColor = 0xff7f7f;
//     // Create a WebGLRenderer without a DOM element
//     const renderer = new Renderer({ gl });
//     renderer.setSize(width, height);
//     // renderer.setClearColor(sceneColor);
  
//     const camera = new PerspectiveCamera(75, width / height, 1, 10000);
//     camera.position.set(5, 35, 60);
    
//     const scene = new Scene();
  
//     // const pointLight = new PointLight(0xffffff, 2, 1000, 1);
//     // pointLight.position.set(0, 100, 200);
//     // scene.add(pointLight);
  
//     // // HemisphereLight - color feels nicer
//     // const hemisphereLight = new HemisphereLight(0x111111, 0x444444,  1);
//     // scene.add(hemisphereLight);
  
//     // AmbientLight - add more brightness?
//     const ambientLight = new AmbientLight(0xffffff); // soft white light
//     scene.add(ambientLight);

//     // const directionalLight = new DirectionalLight( 0xebf3ff)
//     // directionalLight.position.set(0, 50, 100)
//     // scene.add(directionalLight)
  
//     const avatar = {
//       type: 'fbx',
//       name: 'avatar',
//       isometric: false,
//       model: require('../assets/model2.fbx'),
//       textures: [


//         // {
//         //   name: 'glossiness',
//         //   image: require('../assets/textures/glossiness.png'),
//         // },
//         // {
//         //   name: 'specular',
//         //   image: require('../assets/textures/Ch36_1001_Specular.png'),
//         // },

//         {
//           name: 'diffuse',
//           image: require('../assets/textures/Ch36_1001_Diffuse.png'),
//         },
//         // {
//         //   name: 'normal',
//         //   image: require('../assets/textures/Ch36_1001_Normal.png'),
//         // },

//       ],
//       scale: {
//         x: 0.4,
//         y: 0.4,
//         z: 0.4,
//       },
//       position: {
//         x: -5,
//         y: 0,
//         z: -5,
//       }
//     };
    
//     // const model = await loadModel(avatar);
//     // mixer = new THREE.AnimationMixer(model);
//     // animationAction = mixer.clipAction(model.animations[0])

//     let model = Model
//     scene.add(model);
    
//     function update() {
//       // define your own update here
//       // eg. if (model) model.rotation.y += avatar.animation.rotation.y;
//       // const delta = clock.getDelta();

//       // if ( model ) model.update( delta );
//     }
    
//     // Setup an animation loop
//     const render = () => {
//       requestAnimationFrame(render);
//       // model.rotation.x += 0.01
//       model.rotation.y += 0.01
//       // animationAction.play()
//       update();
//       renderer.render(scene, camera);
//       gl.endFrameEXP();
//     };
  
//     render();
//   };

//   return (
//     <View>
//       <GLView 
//         onContextCreate={ onContextCreate }
//         style = {{width: 450, height:500}}
//       />
//     </View>
//   )
// }

// async function loadFileAsync({ asset, funcName }) {
//   if (!asset) {
//     throw new Error(`ExpoTHREE.${funcName}: Cannot parse a null asset`);
//   }
//   return (await resolveAsync(asset)).localUri ?? null;
// }

// export async function loadFbxAsync({ asset, onAssetRequested }) {
//   const uri = await loadFileAsync({
//     asset,
//     funcName: 'loadFbxAsync',
//   });
//   if (!uri) return;
//   const base64 = await FileSystem.readAsStringAsync(uri, {
//     encoding: FileSystem.EncodingType.Base64,
//   });
//   const arrayBuffer = decode(base64);
//   const loader = new FBXLoader();
//   return loader.parse(arrayBuffer, onAssetRequested);
// }
// export async function loadGLTFAsync({ asset, onAssetRequested }) {
//   const uri = await loadFileAsync({
//     asset,
//     funcName: 'loadGLTFAsync',
//   });
//   if (!uri) return;
//   const base64 = await FileSystem.readAsStringAsync(uri, {
//     encoding: FileSystem.EncodingType.Base64,
//   });
//   const arrayBuffer = decode(base64);
//   const loader = new GLTFLoader();
//   return new Promise((resolve, reject) => {
//     loader.parse(
//       arrayBuffer,
//       onAssetRequested,
//       result => {
//         resolve(result);
//       },
//       err => {
//         reject(err);
//       },
//     );
//   });
// }

// export async function loadModel(item) {
//   const texturesLength = item.textures?.length || 0;
//   console.log(`[loadModel] -> Textures length: ${texturesLength}`);
//   const textures = [];
//   for (let i = 0; i < texturesLength; i++) {
//     const texture = await loadTextureAsync({
//       asset: item.textures[i].image,
//     });
//     if (item.type === 'glb') {
//       texture.flipY = false;
//     }
//     textures.push({ name: item.textures[i]?.name || '-', map: texture });
//   }
//   console.log(`[loadModel] -> Textures done loading`);
//   // console.log(textures);

//   let obj = null;
//   if (item.type === 'obj') {
//     obj = await loadObjAsync({
//       asset: item.model,
//       mtlAsset: item?.material || undefined,
//     });
//   } else if (item.type === 'fbx') {
//     obj = await loadFbxAsync({ asset: item.model });
    
//   } else if (item.type === 'gltf' || item.type === 'glb') {
//     const result = await loadGLTFAsync({ asset: item.model });
//     obj = result.scene;
//   }

//   console.log(`[loadModel] -> Model done loading, adding textures now...`);

//   if (texturesLength > 0) {
//     if (texturesLength === 1) {
//       obj.traverse(function(object) {
//         if (object instanceof THREE.Mesh) {
//           object.material.map = textures[0]?.map;
//         }
//       });
//     } else {
//       obj.traverse(function(object) {
//         if (object instanceof THREE.Mesh) {
//           // console.log(
//           //   `[loadModel] -> Traverse object name: ${object.name}`,
//           // );
//           // console.log(object);
//           const selected = textures?.find(x => x.name === object.name);
//           object.material.map = selected?.map;
//         }
//       });
//     }
//   }
//   console.log(`[loadModel] -> Textures done applied...`);

//   if (item.scale) {
//     obj.scale.set(item.scale.x, item.scale.y, item.scale.z);
//   }
//   if (item.position) {
//     obj.position.set(item.position.x, item.position.y, item.position.z);
//   }
//   if (item.rotation) {
//     obj.rotation.x = item.rotation.x;
//     obj.rotation.y = item.rotation.y;
//     obj.rotation.z = item.rotation.z;
//   }
//   return obj;
// };

// export default AnimatedAvatar