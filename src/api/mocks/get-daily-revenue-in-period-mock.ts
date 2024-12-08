import { http, HttpResponse } from "msw";
import {
  GetDailyRevenueInPeriodPayload,
  GetDailyRevenueInPeriodResponse,
} from "../get-daily-revenue-in-period";

export const getDailyRevenueInPeriodMock = http.get<
  never,
  GetDailyRevenueInPeriodPayload,
  GetDailyRevenueInPeriodResponse
>("/metrics/daily-receipt-in-period", async () => {
  return HttpResponse.json([
    {
      date: "2021-08-01",
      receipt: 1000,
    },
    {
      date: "2021-08-02",
      receipt: 2000,
    },
    {
      date: "2021-08-03",
      receipt: 7000,
    },
    {
      date: "2021-08-04",
      receipt: 2000,
    },
    {
      date: "2021-08-05",
      receipt: 1000,
    },
    {
      date: "2021-08-06",
      receipt: 4000,
    },
    {
      date: "2021-08-07",
      receipt: 5000,
    },
  ]);
});
