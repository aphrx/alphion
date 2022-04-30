// import React from 'react';
// import ExpoTHREE, { THREE } from 'expo-three';
// import { GraphicsView } from 'expo-graphics';

// export default class Avatar extends React.Component {

//   componentDidMount() {
//     THREE.suppressExpoWarnings();
//   }

//   render() {
//     return (
//       <GraphicsView
//         onContextCreate={this.onContextCreate}
//         onRender={this.onRender}
//         onResize={this.onResize}
//       />
//     );
//   }

//   // When our context is built we can start coding 3D things.
//   onContextCreate = async ({ gl, pixelRatio, width, height }) => {

//     // Create a 3D renderer
//     this.renderer = new ExpoTHREE.Renderer({
//       gl,
//       pixelRatio,
//       width,
//       height,
//     });

//     // We will add all of our meshes to this scene.
//     this.scene = new THREE.Scene();

//     this.scene.background = new THREE.Color(0xbebebe)

//     this.camera = new THREE.PerspectiveCamera(45, width/height, 1, 1000)

//     this.camera.position.set(3, 3, 3);

//     this.camera.lookAt(0, 0, 0);

//     this.scene.add(new THREE.AmbientLight(0xffffff));

//     await this.loadModel();
//   };

//   loadModel = async () => { 

//     const model = await ExpoTHREE.loadAsync(
//       [require('../assets/model.obj'), null],
//       null,
//       imageName => resources[imageName]
//     );

//     // this ensures the model will be small enough to be viewed properly
//     ExpoTHREE.utils.scaleLongestSideToSize(model, 1);

//     this.scene.add(model)

//   };


//   // When the phone rotates, or the view changes size, this method will be called.
//   onResize = ({ x, y, scale, width, height }) => {
//     // Let's stop the function if we haven't setup our scene yet
//     if (!this.renderer) {
//       return;
//     }
//     this.camera.aspect = width / height;
//     this.camera.updateProjectionMatrix();
//     this.renderer.setPixelRatio(scale);
//     this.renderer.setSize(width, height);
//   };

//   // Called every frame.
//   onRender = delta => {

//     // Finally render the scene with the Camera
//     this.renderer.render(this.scene, this.camera);
//   };
// }