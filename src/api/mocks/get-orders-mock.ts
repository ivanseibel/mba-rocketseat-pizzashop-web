import { faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";
import { GetOrdersResponse } from "../get-orders";

type Orders = GetOrdersResponse["orders"];

type OrderStatus = GetOrdersResponse["orders"][0]["status"];
const statuses: OrderStatus[] = [
  "pending",
  "canceled",
  "processing",
  "delivering",
  "delivered",
];

const orders: Orders = Array.from({ length: 60 }).map((_, index) => ({
  orderId: `order-${index + 1}`,
  customerName: faker.person.fullName(),
  status: statuses[Math.floor(Math.random() * statuses.length)],
  createdAt: new Date(),
  total: Math.floor(Math.random() * 1000),
}));

export const getOrdersMock = http.get<never, never, GetOrdersResponse>(
  "/orders",
  async ({ request }) => {
    const { searchParams } = new URL(request.url);

    const pageIndex = searchParams.get("pageIndex") ?? "0";
    const customerName = searchParams.get("customerName");
    const status = searchParams.get("status");
    const orderId = searchParams.get("orderId");

    const filteredOrders = orders.filter((order) => {
      if (customerName && !order.customerName.includes(customerName)) {
        return false;
      }

      if (status && order.status !== status) {
        return false;
      }

      if (orderId && order.orderId !== orderId) {
        return false;
      }

      return true;
    });

    const perPage = 10;

    const paginatedOrders = filteredOrders.slice(
      Number(pageIndex) * perPage,
      Number(pageIndex) * perPage + perPage,
    );

    return HttpResponse.json({
      orders: paginatedOrders,
      meta: {
        pageIndex: Number(pageIndex),
        perPage,
        totalCount: filteredOrders.length,
      },
    });
  },
);
