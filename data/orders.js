export const orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

export function buyAgain(productId) {
  let productFound = false;

  orders.forEach((order) => {
    order.products.forEach((product) => {
      if (product.productId === productId) {
        // Increase the quantity of the product by 1
        product.quantity += 1;
        productFound = true;
      }
    });
  });

  if (productFound) {
    // Save the updated orders array back to localStorage
    saveToStorage();
  }
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}
