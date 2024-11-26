import { api } from "@/lib/axios";

export interface GetRestaurantResponse {
  name: string;
  id: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  description: string | null;
  managerId: string | null;
}

export async function getRestaurant() {
  const response = await api.get<GetRestaurantResponse>("/managed-restaurant");

  return response.data;
}
