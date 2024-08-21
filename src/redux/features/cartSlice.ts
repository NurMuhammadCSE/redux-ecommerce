import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [] as any[],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.1,
  grandTotal: 0,
};

const selectedItemsFun = (state) => {
  return state.products.reduce((total, product) => {
    return total + product.quantity;
  }, 0);
};

const selectedItemsTotalPrice = (state) => {
  return state.products.reduce((total, product) => {
    return total + product.quantity * product.price;
  }, 0);
};

const selectedItemsTax = (state) => {
  return state.totalPrice * state.taxRate;
};

const selectedItemsGrandTotal = (state) => {
  return state.totalPrice + state.tax;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isExist = state.products.find(
        (item) => item.id === action.payload.id
      );
      if (!isExist) {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      state.selectedItems = selectedItemsFun(state);
      state.totalPrice = selectedItemsTotalPrice(state);
      state.tax = selectedItemsTax(state);
      state.grandTotal = selectedItemsGrandTotal(state);
    },
    clearCart: (state) => {
      state.products = [];
      state.grandTotal = 0;
      state.selectedItems = 0;
      state.tax = 0;
      state.totalPrice = 0;
    },
    updateQuantity: (state, action) => {
      const product = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (product) {
        if (action.payload.type === "increment") {
          product.quantity += 1;
        } else if (action.payload.type === "decrement" && product.quantity > 1) {
          product.quantity -= 1;
        } else if (action.payload.type === "decrement" && product.quantity === 1) {
          state.products = state.products.filter(
            (product) => product.id !== action.payload.id
          );
        }
      }
      state.selectedItems = selectedItemsFun(state);
      state.totalPrice = selectedItemsTotalPrice(state);
      state.tax = selectedItemsTax(state);
      state.grandTotal = selectedItemsGrandTotal(state);
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      state.selectedItems = selectedItemsFun(state);
      state.totalPrice = selectedItemsTotalPrice(state);
      state.tax = selectedItemsTax(state);
      state.grandTotal = selectedItemsGrandTotal(state);
    },
  },
});

export const { addToCart, clearCart, updateQuantity, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
