import { http, HttpResponse } from "msw";
import { GetProfileResponse } from "../get-profile";

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  "/me",
  async () => {
    return HttpResponse.json({
      name: "John Doe",
      id: "custom-user-id",
      email: "johndoe@email.com",
      phone: "123456789",
      role: "manager",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },
);
