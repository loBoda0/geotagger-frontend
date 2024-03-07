import { RegisterUserFields } from "@/hooks/auth/useRegisterForm"
import { apiRequest } from "./Api"
import { apiRoutes } from "@/constants/apiConstants"

export const register = async (data: RegisterUserFields) => {
  apiRequest("post", apiRoutes.SIGNUP, data);
};
