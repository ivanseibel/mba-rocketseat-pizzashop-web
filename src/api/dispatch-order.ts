import { api } from "@/lib/axios";

export interface DispatchOrderPayload {
  orderId: string;
}

export async function dispatchOrder({ orderId }: DispatchOrderPayload) {
  await api.patch(`/orders/${orderId}/dispatch`);
}
