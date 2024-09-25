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

  /** 檢查token是否過期：true：過期，false：未過期 */
  const isTokenExpired = (token: string): boolean => {
    if (!token) return true

    const decodedToken = _decodeToken(token)
    try {
      return _checkExpire(decodedToken)
    } catch (error) {
      console.error('Error decoding token:', error)
      return true
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
    isTokenExpired,
    getDataFromToken
  }
}
