import {
  Viewer,
  ShadowMode,
  Cartesian3,
  Math as CesiumMath,
  SceneMode,
  Globe,
  Color
} from 'cesium'
import { CesiumInterface } from '@/types/customInterface'

export class CustomCesium implements CesiumInterface {
  viewer: Viewer;
  globe: Globe;

  constructor () {
    this.viewer = this.initCesium()
    this.globe = this.viewer.scene.globe
  }

  private initCesium (): Viewer {
    const viewer = new Viewer('cesiumContainer', {
      useDefaultRenderLoop: false,
      selectionIndicator: false,
      infoBox: false,
      skyBox: false,
      navigationInstructionsInitiallyVisible: false,
      fullscreenButton: false,
      orderIndependentTranslucency: false,
      contextOptions: {
        webgl: {
          alpha: false,
          antialias: true,
          preserveDrawingBuffer: true,
          failIfMajorPerformanceCaveat: false,
          depth: true,
          stencil: false
        }
      },
      targetFrameRate: 60,
      sceneMode: SceneMode.SCENE3D,
      imageryProvider: undefined,
      baseLayerPicker: false,
      automaticallyTrackDataSourceClocks: false,
      dataSources: undefined,
      terrainShadows: ShadowMode.DISABLED
    })
    return viewer
  }

  public initCamera (center: Cartesian3): void {
    this.viewer.camera.flyTo({
      destination: center,
      orientation: {
        heading: CesiumMath.toRadians(0),
        pitch: CesiumMath.toRadians(-60),
        roll: CesiumMath.toRadians(0)
      },
      duration: 3
    })
  }

  public setGlobe (): void {
    this.viewer.imageryLayers.get(0).show = false
    this.globe.showGroundAtmosphere = false
    this.globe.showWaterEffect = false
    this.globe.showSkirts = false
    this.globe.baseColor = Color.BLACK
  }
}
