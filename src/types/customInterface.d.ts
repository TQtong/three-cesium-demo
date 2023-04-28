import { CustomCesium } from '@/base/cesium'
import { Globe, Viewer } from 'cesium'

/**
 * @description: position
 */
export interface Position {
    x: number,
    y: number,
    z: number
}

export interface BoundingBox {
    minX: number,
    minY: number,
    maxX: number,
    maxY: number,
}

export interface CustomLayer {
    url: string,
    name: string
}

export interface CesiumInterface {
    viewer: Viewer,
    globe: Globe
}

export interface CesiumStore {
    cesium: CesiumInterface
}
