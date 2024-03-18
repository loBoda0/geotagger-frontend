'use server'

import { cookies } from "next/headers";
import { User } from '@/interfaces/user'
import { decrypt, encrypt } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function setAuthCookies(token: string) {
  cookies().set('access_token', token, {
    sameSite: 'strict',
    secure: true
  })
}

export async function getAuthCookies() {
  const authCookie = cookies().get('access_token')?.value
  return authCookie ? authCookie : null
}

export async function setSession(user: User) {
  const expires = new Date(Date.now() + 10 * 1000)
  const session = await encrypt({ user, expires })
  cookies().set('session', session, {
    expires,
    httpOnly: true
  })
}

export async function getSession() {
  const session = cookies().get('session')?.value
  if (!session) {
    return null
  }
  return await decrypt(session)
}

export async function clearSession() {
  cookies().delete('access_token')
  cookies().delete('session')
}

export async function updateSession(request: NextRequest) {
  const session = cookies().get('session')?.value
  if (!session) {
    return null
  }

  const parsed = await decrypt(session)
  parsed.expires = new Date(Date.now() + 10 * 1000)
  const res = NextResponse.next()
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires as Date
  })
  return res
}