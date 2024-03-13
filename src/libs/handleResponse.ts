import { ErrorResponse } from "@/interfaces/ErrorResponse";
import { User } from "@/interfaces/user";

export const isErrorResponse = (data: User | ErrorResponse): data is ErrorResponse => {
  return 'message' in data;
}

export const  isUser = (data: User | ErrorResponse): data is User => {
  return 'email' in data;
}