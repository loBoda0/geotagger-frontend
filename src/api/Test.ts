import { apiRequest } from "./Api"

export const ConnectionTest = async () => (
  apiRequest('get', '/')
)