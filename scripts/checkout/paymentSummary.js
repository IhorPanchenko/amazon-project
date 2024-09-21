import { cart } from "../../data/cart.js";
import { addOrder } from "../../data/orders.js";
import { formatCurrency, calculateTotalAmount } from "../utils/money.js";

function updateCartQuantity() {
  const cartQuantity = cart.calculateCartQuantity();

  document.querySelector(
    ".js-order-item-quantity"
  ).innerHTML = `Items (${cartQuantity}):`;
}

export function renderPaymentSummary() {
  const totals = calculateTotalAmount(cart);

  const paymentSummaryHMTL = `
    <div class="payment-summary-title">Order Summary</div>

    <div class="payment-summary-row">
      <div class="js-order-item-quantity">Items ():</div>
      <div class="payment-summary-money">
        $${formatCurrency(totals.productPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totals.shippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totals.totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        $${formatCurrency(totals.taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totals.totalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>
  `;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHMTL;

  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      try {
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart: cart }),
        });

        const order = await response.json();
        addOrder(order);
      } catch (error) {
        console.log("Unexpected error. Try again later.");
      }

      window.location.href = "orders.html";
    });

  updateCartQuantity();
}
