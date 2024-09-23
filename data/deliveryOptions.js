import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  return (
    deliveryOptions.find((option) => option.id === deliveryOptionId) ||
    deliveryOptions[0]
  );
}

export function validDeliveryOption(deliveryOptionId) {
  return deliveryOptions.some((option) => option.id === deliveryOptionId);
}

function isWeekend(date) {
  const dayOfWeek = date.day();
  return dayOfWeek === 0 || dayOfWeek === 6;
}

export function calculateDeliveryDate(deliveryOption) {
  if (!deliveryOption) return;

  let remainingDays = deliveryOption.deliveryDays;
  let deliveryDate = dayjs();

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, "day");

    if (!isWeekend(deliveryDate)) {
      remainingDays--;
    }
  }

  const dateString = deliveryDate.format("dddd, MMMM D");

  return dateString;
}
