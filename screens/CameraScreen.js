import React, { useState, useEffect, Dimensions } from "react";
import {StyleSheet,View} from "react-native";
import { cameraWithTensors } from "../node_modules/@tensorflow/tfjs-react-native/dist/index";
import Camera from "../node_modules/expo-camera/build/Camera";
import * as cocoSsd from '@tensorflow-models/coco-ssdd';
import * as tf from '@tensorflow/tfjs'

const CameraScreen = ({ route, navigation }) => {

  // const [model, setModel] = useState<cocoSsd.ObjectDetection>();
  
  let textureDims = 
    Platform.OS == 'ios' 
      ? { height: 1920, width: 1080 } 
      : { height: 1200, width: 1600 }

  const TensorCamera = cameraWithTensors(Camera)

  const handleCameraStream = (images) => {
    const loop = async () => {
      const nextImageTensor = images.next().value
    };
    loop();
  }

  useEffect(() => {
    (async () => {
      const {status} = await Camera.requestCameraPermissionsAsync();
      await tf.ready();
      setModel(await cocoSsd.load())
    })
  })

  return (
    <View style={styles.container}>
      {/* <TensorCamera 
        style={styles.camera}
        type={Camera.Constants.Type.back}
        cameraTextureHeight={textureDims.height}
        cameraTextureWidth={textureDims.width}
        resizeHeight={200}
        resizeWidth={152}
        resizeDepth={3}
        onReady={handleCameraStream}
        autorender={true}
        useCustomShadersToResize={false}
      > */}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  }
});

export default CameraScreen;
