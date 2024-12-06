import { api } from "@/lib/axios";

export interface GetDayOrdersAmountResponse {
  amount: number;
  diffFromYesterday: number;
}

export async function getDayOrdersAmount() {
  const response = await api.get<GetDayOrdersAmountResponse>(
    "/metrics/day-orders-amount",
  );

  console.log("/metrics/day-orders-amount", response.data);

  return response.data;
}
