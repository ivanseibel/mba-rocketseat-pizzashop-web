import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const orderFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
});

type OrderFilters = z.infer<typeof orderFiltersSchema>;

export function OrderTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const status = searchParams.get("status");

  const form = useForm<OrderFilters>({
    resolver: zodResolver(orderFiltersSchema),
    defaultValues: {
      orderId: orderId ?? "",
      customerName: customerName ?? "",
      status: status ?? "all",
    },
  });

  function handleSubmit(filters: OrderFilters) {
    setSearchParams((prev) => {
      if (filters.orderId) {
        prev.set("orderId", filters.orderId);
      } else {
        prev.delete("orderId");
      }

      if (filters.customerName) {
        prev.set("customerName", filters.customerName);
      } else {
        prev.delete("customerName");
      }

      if (filters.status === "all" || !filters.status) {
        prev.delete("status");
      } else {
        prev.set("status", filters.status);
      }

      prev.set("page", "1");

      return prev;
    });
  }

  function handleClearFilters() {
    setSearchParams((prev) => {
      prev.delete("orderId");
      prev.delete("customerName");
      prev.delete("status");
      prev.set("page", "1");

      return prev;
    });

    form.reset();
  }

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <span className="font-semibold text-sm">Filters:</span>
      <Input
        type="text"
        placeholder="Order id"
        className="h-8 w-auto"
        {...form.register("orderId")}
      />
      <Input
        type="text"
        placeholder="Customer name"
        className="h-8 w-[320px]"
        {...form.register("customerName")}
      />

      <Controller
        control={form.control}
        name="status"
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="delivering">Delivering</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <Button type="submit" variant="secondary" size="xs">
        <Search className="h-4 w-4" />
        <span>Search</span>
      </Button>

      <Button
        type="button"
        variant="outline"
        size="xs"
        onClick={handleClearFilters}
      >
        <X className="h-4 w-4" />
        <span>Clear filters</span>
      </Button>
    </form>
  );
}
