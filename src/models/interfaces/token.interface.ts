import type { JwtPayload } from 'jwt-decode'

export interface JwtDecodeData extends JwtPayload {
  name: string
  photo: string
}
