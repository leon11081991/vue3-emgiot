import { jwtDecode } from 'jwt-decode'

export const useTokenExpire = (token: string) => {

  if (!token) return false

  const decodedToken = jwtDecode(token)


  // const tokenExpire = ref(false)
  // const setTokenExpire = (value: boolean) => {
  //   tokenExpire.value = value
  // }
  // return {
  //   tokenExpire,
  //   setTokenExpire
  // }
}