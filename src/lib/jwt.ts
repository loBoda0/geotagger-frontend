import { SignJWT, jwtVerify } from "jose";

const keyString = 'uahdkwahdka'
const key = new TextEncoder().encode(keyString)

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('10 sec from now')
    .sign(key)
}

export async function decrypt(input: string) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256']
  })
  return payload
}