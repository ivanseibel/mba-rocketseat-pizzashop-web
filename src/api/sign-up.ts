import { api } from "@/lib/axios";

export interface SignUpPayload {
  restaurantName: string;
  managerName: string;
  email: string;
  phone: string;
}

export async function signUp({
  restaurantName,
  managerName,
  email,
  phone,
}: SignUpPayload) {
  await api.post("/restaurants", {
    restaurantName,
    managerName,
    email,
    phone,
  });
}
