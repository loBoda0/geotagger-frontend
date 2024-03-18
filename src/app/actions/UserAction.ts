'use server'

import { apiRequest } from "@/api/Api"
import { apiRoutes } from "@/constants/apiConstants"
import { LoginUserFields } from "@/hooks/auth/useLoginForm"
import { RegisterUserFields } from "@/hooks/auth/useRegisterForm"

export const registerActions = async (data: RegisterUserFields) => {
  const { confirm_password, ...payload } = data
  return apiRequest<RegisterUserFields, any>("post", apiRoutes.SIGNUP, payload)
}

export const signInActions = async (data: LoginUserFields) => (
  apiRequest<LoginUserFields, any>("post", apiRoutes.LOGIN, data)
)