import { getOrders } from "@/api/get-orders";
import { Pagination } from "@/components/pagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { OrderTableFilters } from "./order-table-filters";
import { OrderTableRow } from "./order-table-row";
import { OrderTableSkeleton } from "./order-table-skeleton";

export function Orders() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const orderId = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const status = searchParams.get("status");

  const { data: result, isLoading: isLoadingOrders } = useQuery({
    queryKey: ["orders", pageIndex, orderId, customerName, status],
    queryFn: () =>
      getOrders({ pageIndex: pageIndex, orderId, customerName, status }),
  });

  function handlePageChange(pageIndex: number) {
    setSearchParams((prev) => {
      prev.set("page", String(pageIndex + 1));
      return prev;
    });
  }

  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-3xl tracking-tight">Orders</h1>

        <div className="space-y-2.5">
          <OrderTableFilters />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">Id</TableHead>
                  <TableHead className="w-[160px]">Created at</TableHead>
                  <TableHead className="w-[180px]">Status</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="w-[140px]">Amount</TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                  <TableHead className="w-[132px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result?.orders.map((order) => (
                  <OrderTableRow key={order.orderId} order={order} />
                ))}
                {isLoadingOrders && <OrderTableSkeleton />}
              </TableBody>
            </Table>
          </div>

          {result && (
            <Pagination
              pageIndex={result.meta.pageIndex}
              totalCount={result.meta.totalCount}
              perPage={result.meta.perPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </>
  );
}
