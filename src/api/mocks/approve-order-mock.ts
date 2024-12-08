import { http, HttpResponse } from "msw";
import { ApproveOrderPayload } from "../approve-order";

export const approveOrderMock = http.patch<ApproveOrderPayload, never, never>(
  "/orders/:orderId/approve",
  async ({ params }) => {
    const { orderId } = params;

    if (orderId === "error-order-id") {
      return new HttpResponse(null, { status: 400 });
    }

    return new HttpResponse(null, { status: 204 });
  },
);
