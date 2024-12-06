import { api } from "@/lib/axios";

export interface GetMonthRevenueResponse {
  receipt: number;
  diffFromLastMonth: number;
}

export async function getMonthRevenue() {
  const response = await api.get<GetMonthRevenueResponse>(
    "/metrics/month-receipt",
  );

  console.log("/metrics/month-receipt", response.data);

  return response.data;
}
