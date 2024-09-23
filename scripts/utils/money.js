import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";

const TAX_RATE = 0.1;

export function formatCurrency(priceCents) {
  if (typeof priceCents !== "number") {
    throw new Error("Invalid price value");
  }
  return (Math.round(priceCents) / 100).toFixed(2);
}

export function calculateTotalAmount(cart) {
  if (!cart || !Array.isArray(cart.cartItems)) {
    throw new Error("Invalid cart data");
  }

  const { productPriceCents, shippingPriceCents } = cart.cartItems.reduce(
    (totals, cartItem) => {
      const product = getProduct(cartItem.productId);
      const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

      totals.productPriceCents += product.priceCents * cartItem.quantity;
      totals.shippingPriceCents += deliveryOption.priceCents;
      return totals;
    },
    { productPriceCents: 0, shippingPriceCents: 0 }
  );

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * TAX_RATE;
  const totalCents = totalBeforeTaxCents + taxCents;

  return {
    productPriceCents,
    shippingPriceCents,
    totalBeforeTaxCents,
    taxCents,
    totalCents,
  };
}
