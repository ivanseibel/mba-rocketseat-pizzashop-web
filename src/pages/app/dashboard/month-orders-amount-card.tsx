import { getMonthOrdersAmount } from "@/api/get-month-orders.amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";

export function MonthOrdersAmountCard() {
  const { data: monthOrdersAmount } = useQuery({
    queryKey: ["metrics", "month-orders-amount"],
    queryFn: getMonthOrdersAmount,
  });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-semibold text-base">
          Orders (month)
        </CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {monthOrdersAmount ? (
          <>
            <span className="font-bold text-2xl tracking-tight">
              {monthOrdersAmount.amount.toLocaleString("en-US")}
            </span>
            <p className="text-muted-foreground text-xs">
              {monthOrdersAmount.diffFromLastMonth >= 0 ? (
                <>
                  <span className="text-emeral-500 dark:text-emerald-400">
                    +{monthOrdersAmount.diffFromLastMonth}%
                  </span>
                  compared to last month
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    {monthOrdersAmount.diffFromLastMonth}%
                  </span>
                  compared to last month
                </>
              )}
            </p>
          </>
        ) : (
          <>
            <Skeleton className="h-8" />
            <Skeleton className="h-4" />
          </>
        )}
      </CardContent>
    </Card>
  );
}
