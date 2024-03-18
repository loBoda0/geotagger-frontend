import { NextRequest } from "next/server";
import { updateSession } from "./hooks/session";

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}