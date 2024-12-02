import { api } from "@/lib/axios";

interface UpdateProfilePayload {
  name: string;
  description: string;
}

export async function updateProfile({
  name,
  description,
}: UpdateProfilePayload) {
  const { data } = await api.put("/profile", { name, description });
  return data;
}
