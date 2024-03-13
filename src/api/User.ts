import { RegisterUserFields } from "@/hooks/auth/useRegisterForm"
import { apiRequest } from "./Api"
import { apiRoutes } from "@/constants/apiConstants"
import { User } from "@/interfaces/user"
import { ErrorResponse } from "@/interfaces/ErrorResponse"
import { LoginUserFields } from "@/hooks/auth/useLoginForm"

export const register = async (data: RegisterUserFields) => {
  const { confirm_password, ...payload } = data
  return apiRequest<RegisterUserFields, User | ErrorResponse>("post", apiRoutes.SIGNUP, payload)
}

export const signIn = async (data: LoginUserFields) => {
  return apiRequest<LoginUserFields, User | ErrorResponse>("post", apiRoutes.LOGIN, data)
}
