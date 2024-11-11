import type { JwtDecodeData } from '@/models/interfaces/token.interface'
import { type JwtPayload, jwtDecode } from 'jwt-decode'

export const useToken = () => {
  /** 解碼token */
  const _decodeToken = (token: string): JwtPayload | null => {
    if (!token) return null
    const decodedToken = jwtDecode(token)
    return decodedToken
  }

  /** 檢查token是否過期 */
  const _checkExpire = (decodedToken: JwtPayload | null) => {
    if (!decodedToken || !decodedToken.exp) return true

    const currentTime = Date.now() / 1000
    return decodedToken.exp < currentTime
  }

  /** 檢查token是否有效：返回true表示有效，返回false表示無效 */
  const checkTokenValidity = (token: string | null): boolean => {
    if (!token) return false // 沒有token，直接認定為無效

    try {
      const decodedToken = _decodeToken(token)
      return !_checkExpire(decodedToken) // 如果token沒過期，返回true
    } catch (error) {
      console.error('Error decoding token:', error)
      return false // 如果解碼錯誤，認定為無效
    }
  }

  /** 取得token中的資訊 */
  const getDataFromToken = <T extends JwtPayload | K, K = JwtDecodeData>(
    token: string,
    key?: keyof T
  ): T[keyof T] | T | null => {
    const decodedToken = _decodeToken(token) as T
    if (!decodedToken) return null

    if (key) {
      return decodedToken[key]
    }

    return decodedToken
  }

  return {
    _decodeToken,
    checkTokenValidity,
    getDataFromToken
  }
}
