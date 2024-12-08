import { http, HttpResponse } from "msw";
import { SignUpPayload } from "../sign-up";

export const signUpMock = http.post<never, SignUpPayload>(
  "/restaurants",
  async ({ request }) => {
    const { restaurantName } = await request.json();

    if (restaurantName === "Pizza Shop") {
      return new HttpResponse(null, { status: 201 });
    }

    return new HttpResponse(null, { status: 400 });
  },
);
