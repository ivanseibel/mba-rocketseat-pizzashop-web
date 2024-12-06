import { api } from "@/lib/axios";

export interface DeliverOrderPayload {
  orderId: string;
}

export async function deliverOrder({ orderId }: DeliverOrderPayload) {
  await api.patch(`/orders/${orderId}/deliver`);
}
