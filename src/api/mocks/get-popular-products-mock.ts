import { http, HttpResponse } from "msw";
import { GetPopularProductsResponse } from "../get-popular-products";

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>("/metrics/popular-products", async () => {
  return HttpResponse.json([
    {
      product: "Calabresa large",
      amount: 100,
    },
    {
      product: "Pepperoni large",
      amount: 90,
    },
    {
      product: "Marguerita large",
      amount: 80,
    },
    {
      product: "Portuguesa large",
      amount: 70,
    },
    {
      product: "Calabresa medium",
      amount: 60,
    },
  ]);
});
