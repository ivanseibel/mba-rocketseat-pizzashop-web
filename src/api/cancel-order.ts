import { api } from "@/lib/axios";

export interface CancelOrderPayload {
  orderId: string;
}

export async function cancelOrder({ orderId }: CancelOrderPayload) {
  await api.patch(`/orders/${orderId}/cancel`);
}
