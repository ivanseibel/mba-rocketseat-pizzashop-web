type OrderStatus =
  | "pending"
  | "canceled"
  | "processing"
  | "delivering"
  | "delivered";

interface OrderStatusProps {
  status: OrderStatus;
}

const orderStatusMap = {
  pending: "Not started",
  canceled: "Canceled",
  processing: "Being prepared",
  delivering: "Out for delivery",
  delivered: "Delivered",
};

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {/* <span className="h-2 w-2 rounded-full bg-slate-400" /> */}

      {status === "pending" && (
        <span className="h-2 w-2 rounded-full bg-slate-400" />
      )}
      {status === "canceled" && (
        <span className="h-2 w-2 rounded-full bg-rose-500" />
      )}
      {["processing", "delivering", "delivered"].includes(status) && (
        <span className="h-2 w-2 rounded-full bg-amber-500" />
      )}
      {status === "delivered" && (
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
      )}

      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status]}
      </span>
    </div>
  );
}
