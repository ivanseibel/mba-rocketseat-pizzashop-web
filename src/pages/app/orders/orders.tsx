import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";
import { Helmet } from "react-helmet-async";

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
        <form className="flex items-center gap-2">
          <span className="font-semibold text-sm">Filters:</span>
          <input
            type="text"
            placeholder="Customer name"
            className="h8 w-[320px]"
          />
        </form>

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
                <TableRow key={index.toString()}>
                  <TableCell>
                    <Button variant="outline" size="xs">
                      <Search className="h3 w-3" />
                      <span className="sr-only">Order details</span>
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium font-mono text-xs">
                    xxx-xxx-xxx
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    15 minutes ago
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-slate-400" />
                      <span className="font-medium text-muted-foreground">
                        Pendent
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">John Doe</TableCell>
                  <TableCell className="font-medium">$100.00</TableCell>
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
                    >
                      <X className="h-3 w-3" />
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
