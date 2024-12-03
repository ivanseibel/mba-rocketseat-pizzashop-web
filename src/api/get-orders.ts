import { api } from "@/lib/axios";

interface GetOrdersQuery {
  pageIndex: number | null;
}

export interface GetOrdersResponse {
  orders: {
    orderId: string;
    createdAt: Date;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  }[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
}

export async function getOrders({
  pageIndex,
}: GetOrdersQuery): Promise<GetOrdersResponse> {
  const response = await api.get<GetOrdersResponse>("/orders", {
    params: {
      pageIndex: pageIndex ?? 0,
    },
  });

  return response.data;
}
