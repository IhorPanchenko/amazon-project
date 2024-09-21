import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";

export function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
}

export function calculateTotalAmount(cart) {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.cartItems.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    productPriceCents += product.priceCents * cartItem.quantity;
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  return {
    productPriceCents,
    shippingPriceCents,
    totalBeforeTaxCents,
    taxCents,
    totalCents,
  };
}
