import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import colors from "tailwindcss/colors";

const data = [
  {
    date: "01-01",
    value: 4000,
  },
  {
    date: "01-02",
    value: 3000,
  },
  {
    date: "01-03",
    value: 2000,
  },
  {
    date: "01-04",
    value: 2780,
  },
  {
    date: "01-05",
    value: 1890,
  },
  {
    date: "01-06",
    value: 2390,
  },
  {
    date: "01-07",
    value: 3490,
  },
];

export function RevenueChart() {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="font-medium text-base">
            Revenue in the period
          </CardTitle>
          <CardDescription>Daily revenu in the period</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart style={{ fontSize: 12 }} data={data}>
            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value: number) =>
                value.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
              }
              width={80}
            />
            <XAxis
              dataKey="date"
              stroke="#888"
              axisLine={false}
              tickLine={false}
              dy={16}
            />
            <Line
              type="linear"
              strokeWidth={2}
              dataKey={"value"}
              stroke={colors.violet[500]}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
