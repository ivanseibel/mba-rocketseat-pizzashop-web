import { cancelOrder } from "@/api/cancel-order";
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

  const { mutateAsync: cancelOrderFn, isPending } = useMutation({
    mutationFn: cancelOrder,
    onSuccess: async (_, { orderId }) => {
      updateCacheData(orderId, "canceled");
    },
  });

  async function handleCancelOrder() {
    try {
      await cancelOrderFn({ orderId: order.orderId });
      toast.success("Order canceled successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel order");
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
        <Button
          variant="outline"
          size="xs"
          className="flex items-center justify-center"
        >
          <ArrowRight className="h-3 w-3" />
          Approve
        </Button>
      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="xs"
          className="flex items-center justify-center"
          disabled={
            !["pending", "processing"].includes(order.status) || isPending
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
