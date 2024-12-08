import { http, HttpResponse } from "msw";
import { UpdateProfilePayload } from "../update-profile";

export const updateProfileMock = http.put<never, UpdateProfilePayload>(
  "/profile",
  async ({ request }) => {
    const { name } = await request.json();

    if (name === "Super Pizza Shop") {
      return new HttpResponse(null, { status: 204 });
    }

    return new HttpResponse(null, { status: 400 });
  },
);
