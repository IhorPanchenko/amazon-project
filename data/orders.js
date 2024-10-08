export const orders = (() => {
  try {
    return JSON.parse(localStorage.getItem("orders")) || [];
  } catch (e) {
    console.error("Error parsing orders from localStorage", e);
    return [];
  }
})();

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

export function getOrder(orderId) {
  return orders.find((order) => order.id === orderId) || null;
}
