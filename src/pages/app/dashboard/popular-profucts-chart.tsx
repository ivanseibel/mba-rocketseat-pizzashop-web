import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { BarChart } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import colors from "tailwindcss/colors";

const data = [
  {
    product: "Pepperoni large",
    quantity: 10,
  },
  {
    product: "Margarita medium",
    quantity: 20,
  },
  {
    product: "Hawaiian small",
    quantity: 18,
  },
  {
    product: "BBQ large",
    quantity: 31,
  },
  {
    product: "Vegetarian medium",
    quantity: 22,
  },
];

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500],
];

function label({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
  index,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  value: number;
  index: number;
}) {
  const RADIAN = Math.PI / 180;
  const radius = 12 + innerRadius + (outerRadius - innerRadius);
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      className="fill-muted-foreground text-xs"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {data[index].product.length > 20
        ? data[index].product.substring(0, 20).concat("...")
        : data[index].product}{" "}
      ({value})
    </text>
  );
}

export function PopularProductsChart() {
  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="font-medium text-base">
            Popular Products
          </CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart style={{ fontSize: 12 }}>
            <Pie
              data={data}
              dataKey={"quantity"}
              nameKey={"product"}
              cx={"50%"}
              cy={"50%"}
              outerRadius={86}
              innerRadius={64}
              strokeWidth={8}
              labelLine={false}
              label={label}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index]}
                  className="stroke-background hover:opacity-75"
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
