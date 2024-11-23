import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";

export function OrderTableRow() {
  return (
    <TableRow>
      <TableCell>
        <Button variant="outline" size="xs">
          <Search className="h3 w-3" />
          <span className="sr-only">Order details</span>
        </Button>
      </TableCell>
      <TableCell className="font-medium font-mono text-xs">
        xxx-xxx-xxx
      </TableCell>
      <TableCell className="text-muted-foreground">15 minutes ago</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          <span className="font-medium text-muted-foreground">Pendent</span>
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
  );
}
