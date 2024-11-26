import { api } from "@/lib/axios";

export interface SignInPayload {
  email: string;
}

export async function signIn(payload: SignInPayload) {
  await api.post("/authenticate", payload);
}
