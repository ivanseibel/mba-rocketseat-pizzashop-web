import { http, HttpResponse } from "msw";
import { GetRestaurantResponse } from "../get-restaurant";

export const getRestaurantMock = http.get<never, never, GetRestaurantResponse>(
  "/managed-restaurant",
  async () => {
    return HttpResponse.json({
      name: "Pizza Shop",
      id: "custom-restaurant-id",
      createdAt: new Date(),
      updatedAt: new Date(),
      description: "The best restaurant in town",
      managerId: "custom-user-id",
    });
  },
);
