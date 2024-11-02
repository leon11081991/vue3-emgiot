export interface DetectedCode {
  rawValue: string
  cornerPoints: { x: number; y: number }[]
  boundingBox: { x: number; y: number; width: number; height: number }
}
