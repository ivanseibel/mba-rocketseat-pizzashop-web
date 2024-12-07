import { getDayOrdersAmount } from "@/api/get-day-orders-amount";
import { MetricCardSkeleton } from "@/components/metric-card-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";

export function DayOrdersAmountCard() {
  const { data: dayOrdersAmount, isFetching } = useQuery({
    queryKey: ["metrics", "day-orders-amount"],
    queryFn: getDayOrdersAmount,
  });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-semibold text-base">Orders (day)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {dayOrdersAmount ? (
          <>
            <span className="font-bold text-2xl tracking-tight">
              {dayOrdersAmount.amount.toLocaleString("en-US")}
            </span>
            <p className="text-muted-foreground text-xs">
              {dayOrdersAmount.diffFromYesterday >= 0 ? (
                <>
                  <span className="text-emeral-500 dark:text-emerald-400">
                    +{dayOrdersAmount.diffFromYesterday}%
                  </span>
                  compared to yesterday
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    {dayOrdersAmount.diffFromYesterday}%
                  </span>
                  compared to yesterday
                </>
              )}
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  );
}
