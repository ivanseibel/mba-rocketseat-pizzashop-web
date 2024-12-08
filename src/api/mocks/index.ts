import { setupWorker } from "msw/browser";
import { env } from "../../env";
import { getDailyRevenueInPeriodMock } from "./get-daily-revenue-in-period-mock";
import { getDayOrdersAmountMock } from "./get-day-orders-amount-mock";
import { getMonthCanceledOrdersAmountMock } from "./get-month-canceled-orders-amount-mock";
import { getMonthOrdersAmountMock } from "./get-month-orders-amount-mock";
import { getMonthRevenueMock } from "./get-month-revenue-mock";
import { getOrderDetailsMock } from "./get-order-details-mock";
import { getOrdersMock } from "./get-orders-mock";
import { getPopularProductsMock } from "./get-popular-products-mock";
import { getProfileMock } from "./get-profile-mock";
import { getRestaurantMock } from "./get-restaurant-mock";
import { signInMock } from "./sign-in-mock";
import { signUpMock } from "./sign-up-mock";
import { updateProfileMock } from "./update-profile-mock";

export const worker = setupWorker(
  signInMock,
  signUpMock,
  getDayOrdersAmountMock,
  getMonthOrdersAmountMock,
  getMonthCanceledOrdersAmountMock,
  getMonthRevenueMock,
  getDailyRevenueInPeriodMock,
  getPopularProductsMock,
  getRestaurantMock,
  getProfileMock,
  updateProfileMock,
  getOrdersMock,
  getOrderDetailsMock,
);

export async function enableMSW() {
  if (env.MODE !== "test") return;

  await worker.start();
}
