import { approveOrder } from "@/api/approve-order";
import { cancelOrder } from "@/api/cancel-order";
import { deliverOrder } from "@/api/deliver-order";
import { dispatchOrder } from "@/api/dispatch-order";
import { GetOrdersResponse } from "@/api/get-orders";
import { OrderStatus } from "@/components/order-status";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ArrowRight, Search, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { OrderDetails } from "./order-details";

export interface OrderTableRowProps {
  order: {
    orderId: string;
    createdAt: Date;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  };
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const queryClient = useQueryClient();

  function updateCacheData(orderId: string, newStatus: OrderStatus) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ["orders"],
    });

    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return;

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) =>
          order.orderId === orderId ? { ...order, status: newStatus } : order,
        ),
      });
    });
  }

  const { mutateAsync: cancelOrderAsync, isPending: isPendingCanceling } =
    useMutation({
      mutationFn: cancelOrder,
      onSuccess: async (_, { orderId }) => {
        updateCacheData(orderId, "canceled");
      },
    });

  const { mutateAsync: approveOrderAsync, isPending: isPendingApproving } =
    useMutation({
      mutationFn: approveOrder,
      onSuccess: async (_, { orderId }) => {
        updateCacheData(orderId, "processing");
      },
    });

  const { mutateAsync: dispatchOrderAsync, isPending: isPendingDispatching } =
    useMutation({
      mutationFn: dispatchOrder,
      onSuccess: async (_, { orderId }) => {
        updateCacheData(orderId, "delivering");
      },
    });

  const { mutateAsync: deliverOrderAsync, isPending: isPendingDelivering } =
    useMutation({
      mutationFn: deliverOrder,
      onSuccess: async (_, { orderId }) => {
        updateCacheData(orderId, "delivered");
      },
    });

  async function handleCancelOrder() {
    try {
      await cancelOrderAsync({ orderId: order.orderId });
      toast.success("Order canceled successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel order");
    }
  }

  async function handleApproveOrder() {
    try {
      await approveOrderAsync({ orderId: order.orderId });
      toast.success("Order approved successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to approve order");
    }
  }

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h3 w-3" />
              <span className="sr-only">Order details</span>
            </Button>
          </DialogTrigger>

          <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="font-medium font-mono text-xs">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">
        <span>{order.customerName}</span>
      </TableCell>
      <TableCell className="font-medium">
        <span>
          {(order.total / 100).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      </TableCell>
      <TableCell>
        {order.status === "pending" && (
          <Button
            variant="outline"
            size="xs"
            className="flex items-center justify-center"
            disabled={isPendingApproving}
            onClick={handleApproveOrder}
          >
            <ArrowRight className="h-3 w-3" />
            Process
          </Button>
        )}

        {order.status === "processing" && (
          <Button
            variant="outline"
            size="xs"
            className="flex items-center justify-center"
            disabled={isPendingDispatching}
            onClick={() => dispatchOrderAsync({ orderId: order.orderId })}
          >
            <ArrowRight className="h-3 w-3" />
            Dispach
          </Button>
        )}

        {order.status === "delivering" && (
          <Button
            variant="outline"
            size="xs"
            className="flex items-center justify-center"
            disabled={isPendingDelivering}
            onClick={() => deliverOrderAsync({ orderId: order.orderId })}
          >
            <ArrowRight className="h-3 w-3" />
            Delivered
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="xs"
          className="flex items-center justify-center"
          disabled={
            !["pending", "processing"].includes(order.status) ||
            isPendingCanceling
          }
          onClick={handleCancelOrder}
        >
          <X className="h-3 w-3" />
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  );
}
