import type { DetectedCode } from '@/models/interfaces/qrCode.interface'
import { ref } from 'vue'

/** 處理偵測 QRCode */
export const useQRCode = () => {
  type TrackType = 'outline' | 'centered text' | 'bounding box'

  // Track
  /** 處理偵測QRCode顯示為跟隨形狀外框線 */
  const paintOutline = (detectedCodes: DetectedCode[], ctx: CanvasRenderingContext2D) => {
    for (const detectedCode of detectedCodes) {
      const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

      ctx.lineWidth = 4
      ctx.strokeStyle = 'red'

      ctx.beginPath()
      ctx.moveTo(firstPoint.x, firstPoint.y)
      for (const { x, y } of otherPoints) {
        ctx.lineTo(x, y)
      }
      ctx.lineTo(firstPoint.x, firstPoint.y)
      ctx.closePath()
      ctx.stroke()
    }
  }
  /** 處理偵測QRCode顯示為中心文字 */
  const paintCenterText = (detectedCodes: DetectedCode[], ctx: CanvasRenderingContext2D) => {
    for (const detectedCode of detectedCodes) {
      const { boundingBox, rawValue } = detectedCode

      const centerX = boundingBox.x + boundingBox.width / 2
      const centerY = boundingBox.y + boundingBox.height / 2

      const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width)

      ctx.font = `bold ${fontSize}px sans-serif`
      ctx.textAlign = 'center'

      ctx.lineWidth = 3
      ctx.strokeStyle = '#35495e'
      ctx.strokeText(detectedCode.rawValue, centerX, centerY)

      ctx.fillStyle = '#5cb984'
      ctx.fillText(rawValue, centerX, centerY)
    }
  }
  /** 處理偵測QRCode顯示為外框線 */
  const paintBoundingBox = (detectedCodes: DetectedCode[], ctx: CanvasRenderingContext2D) => {
    for (const detectedCode of detectedCodes) {
      const {
        boundingBox: { x, y, width, height }
      } = detectedCode

      ctx.lineWidth = 2
      ctx.strokeStyle = '#007bff'
      ctx.strokeRect(x, y, width, height)
    }
  }

  const handlePaintTrack = (track: TrackType) => {
    if (track === 'outline') {
      return paintOutline
    }

    if (track === 'centered text') {
      return paintCenterText
    }

    return paintBoundingBox
  }

  const trackFunctions = {
    default: undefined,
    outline: handlePaintTrack('outline'),
    'centered text': handlePaintTrack('centered text'),
    'bounding box': handlePaintTrack('bounding box')
  }

  const error = ref('')

  /** 處理偵測QRCode  */
  const onDetect = (detectedCodes: DetectedCode[]): string[] => {
    return detectedCodes.map((code) => code.rawValue)
  }

  /** 處理QRCode錯誤 */
  const onError = (err: Error) => {
    console.log('onError', err)
    error.value = `[${err.name}]: `

    if (err.name === 'NotAllowedError') {
      error.value += 'you need to grant camera access permission'
    } else if (err.name === 'NotFoundError') {
      error.value += 'no camera on this device'
    } else if (err.name === 'NotSupportedError') {
      error.value += 'secure context required (HTTPS, localhost)'
    } else if (err.name === 'NotReadableError') {
      error.value += 'is the camera already in use?'
    } else if (err.name === 'OverconstrainedError') {
      error.value += 'installed cameras are not suitable'
    } else if (err.name === 'StreamApiNotSupportedError') {
      error.value += 'Stream API is not supported in this browser'
    } else if (err.name === 'InsecureContextError') {
      error.value +=
        'Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
    } else {
      error.value += err.message
    }
  }

  return {
    trackFunctions,
    error,
    onDetect,
    onError
  }
}
