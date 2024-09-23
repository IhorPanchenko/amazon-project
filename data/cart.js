import { validDeliveryOption } from "./deliveryOptions.js";

export class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    const storedItems = localStorage.getItem(this.#localStorageKey);
    this.cartItems = storedItems
      ? JSON.parse(storedItems)
      : this.#getDefaultCartItems();
  }

  #getDefaultCartItems() {
    return [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "1",
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "2",
      },
    ];
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId, quantity) {
    const matchingItem = this.cartItems.find(
      (cartItem) => cartItem.productId === productId
    );

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: "1",
      });
    }

    this.saveToStorage();
  }

  removeFromCart(productId) {
    this.cartItems = this.cartItems.filter(
      (cartItem) => cartItem.productId !== productId
    );

    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    const cartItem = this.cartItems.find(
      (item) => item.productId === productId
    );

    if (cartItem && validDeliveryOption(deliveryOptionId)) {
      cartItem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    }
  }

  calculateCartQuantity() {
    return this.cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
  }

  updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) return;

    const matchingItem = this.cartItems.find(
      (cartItem) => cartItem.productId === productId
    );

    if (matchingItem) {
      matchingItem.quantity = newQuantity;
      this.saveToStorage();
    }

    matchingItem.quantity = newQuantity;
    this.saveToStorage();
  }

  resetCart() {
    this.cartItems = [];
    this.saveToStorage();
  }
}

export const cart = new Cart("cart");
