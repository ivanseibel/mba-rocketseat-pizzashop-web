import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Helmet } from "react-helmet-async";
import { OrderTableFilters } from "./order-table-filters";
import { OrderTableRow } from "./order-table-row";

export function Orders() {
  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-3xl tracking-tight">Orders</h1>
      </div>
      <div className="space-y-2.5">
        <OrderTableFilters />

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]"></TableHead>
                <TableHead className="w-[140px]">Id</TableHead>
                <TableHead className="w-[180px]">Finished at</TableHead>
                <TableHead className="w-[140px]">Status</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="w-[140px]">Amount</TableHead>
                <TableHead className="w-[164px]"></TableHead>
                <TableHead className="w-[132px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(10)].map((_, index) => (
                <OrderTableRow key={index} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
