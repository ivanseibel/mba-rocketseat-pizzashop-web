import { http, HttpResponse } from "msw";
import {
  GetOrderDetailsParams,
  GetOrderDetailsResponse,
} from "../get-order-details";

export const getOrderDetailsMock = http.get<
  never,
  GetOrderDetailsParams,
  GetOrderDetailsResponse
>(`/orders/:orderId`, async ({ params }) => {
  const { orderId } = params;

  return HttpResponse.json({
    id: orderId,
    createdAt: new Date().toISOString(),
    status: "pending",
    totalInCents: 1900,
    customer: {
      name: "John Doe",
      email: "johndoe@email.com",
      phone: "+123456789",
    },
    orderItems: [
      {
        id: "item-1",
        priceInCents: 1000,
        quantity: 1,
        product: {
          name: "Calabresa large",
        },
      },
      {
        id: "item-2",
        priceInCents: 900,
        quantity: 1,
        product: {
          name: "Pepperoni large",
        },
      },
    ],
  });
});
