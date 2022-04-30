// import React, { useRef } from 'react'
// import { useFrame } from '@react-three/fiber/native';
// import { useGLTF } from '@react-three/drei/native'

// export default function Model(props) {
//     let kp;
//     const group = useRef()
//     const { nodes, materials } = useGLTF('../../../model.glb')
  
//     return (
//       <group ref={group} {...props} dispose={null}>
//         <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={[0.01, 0.01, 0.01]}>
//           <primitive object={nodes.mixamorig1Hips} />
//           <skinnedMesh geometry={nodes.Ch36.geometry} material={materials.Ch36_Body} skeleton={nodes.Ch36.skeleton} />
//         </group>
//       </group>
//     )
//   }
  
//   useGLTF.preload('../../../model.glb')