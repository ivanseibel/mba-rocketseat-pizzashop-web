import { api } from "@/lib/axios";

export interface ApproveOrderPayload {
  orderId: string;
}

export async function approveOrder({ orderId }: ApproveOrderPayload) {
  await api.patch(`/orders/${orderId}/approve`);
}
