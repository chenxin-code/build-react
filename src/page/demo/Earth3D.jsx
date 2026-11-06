import { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as TWEEN from '@tweenjs/tween.js'
import earthTexture from '../../res/3d-earth/earth.jpg'
import universeBg from '../../res/3d-earth/universe.png'
import './Earth3D.css'

function Earth3D() {
  const earthRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const cameraRef = useRef(null)
  const controlsRef = useRef(null)
  const animFrameRef = useRef(null)
  const [rotation, setRotation] = useState(true)
  const rotationRef = useRef(true)
  const fovRef = useRef(100)
  const animatingRef = useRef(true)

  useEffect(() => {
    rotationRef.current = rotation
  }, [rotation])

  const render = useCallback(() => {
    const renderer = rendererRef.current
    const scene = sceneRef.current
    const camera = cameraRef.current
    const earthDom = earthRef.current

    if (!renderer || !scene || !camera || !earthDom) return

    renderer.clear()

    if (animatingRef.current) {
      fovRef.current -= 0.6
      if (fovRef.current <= 45) {
        animatingRef.current = false
        camera.position.set(0, 0, 200)
        camera.lookAt(0, 0, 0)
      } else {
        const newCamera = new THREE.PerspectiveCamera(
          fovRef.current,
          earthDom.clientWidth / earthDom.clientHeight,
          1,
          1000,
        )
        newCamera.position.set(0, 0, 200)
        newCamera.lookAt(0, 0, 0)
        cameraRef.current = newCamera
      }
    }

    if (rotationRef.current) {
      scene.rotation.y += 0.003
    }

    renderer.render(scene, cameraRef.current)
    TWEEN.update()
    animFrameRef.current = requestAnimationFrame(render)
  }, [])

  useEffect(() => {
    const earthDom = earthRef.current
    if (!earthDom) return

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(earthDom.clientWidth, earthDom.clientHeight)
    renderer.setClearColor(0x000, 0)
    earthDom.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const camera = new THREE.PerspectiveCamera(
      fovRef.current,
      earthDom.clientWidth / earthDom.clientHeight,
      1,
      1000,
    )
    camera.position.set(0, 0, 200)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enableZoom = true
    controls.autoRotate = false
    controls.autoRotateSpeed = 2
    controls.enablePan = true
    controlsRef.current = controls

    const textureLoader = new THREE.TextureLoader()
    textureLoader.load(earthTexture, (texture) => {
      const sphereGeometry = new THREE.SphereGeometry(70, 100, 100)
      const meshBasicMaterial = new THREE.MeshBasicMaterial({ map: texture })
      const mesh = new THREE.Mesh(sphereGeometry, meshBasicMaterial)
      mesh.name = '3d-earth'
      scene.add(mesh)
    })

    animFrameRef.current = requestAnimationFrame(render)

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
      sceneRef.current = null
      rendererRef.current = null
    }
  }, [render])

  return (
    <div className="universe" style={{ backgroundImage: `url(${universeBg})` }}>
      <div className="button-box">
        <button onClick={() => setRotation(!rotation)}>
          {rotation ? '关闭自转' : '开启自转'}
        </button>
      </div>
      <div style={{ width: '100%', height: '100%' }}>
        <div ref={earthRef} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  )
}

export default Earth3D
