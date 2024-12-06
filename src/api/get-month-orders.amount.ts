import { api } from "@/lib/axios";

export interface GetMonthOrdersAmountResponse {
  amount: number;
  diffFromLastMonth: number;
}

export async function getMonthOrdersAmount() {
  const response = await api.get<GetMonthOrdersAmountResponse>(
    "/metrics/month-orders-amount",
  );

  console.log("/metrics/month-orders-amount", response.data);

  return response.data;
}
