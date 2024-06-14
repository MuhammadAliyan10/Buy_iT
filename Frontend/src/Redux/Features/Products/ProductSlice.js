import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  card: {
    cardItems: [],
    totalAmount: 0,
    totalCardItems: 0,
  },
};

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    addToCard(state, action) {
      state.card.cardItems.push(action.payload);
      state.card.totalAmount += action.payload.price;
      state.card.totalCardItems = state.card.cardItems.length;
    },
    removeFromCard(state, action) {
      state.card.cardItems = state.card.cardItems.filter(
        (item) => item.id !== action.payload
      );
      state.card.totalAmount = state.card.cardItems.reduce(
        (total, item) => total + item.price,
        0
      );
      state.card.totalCardItems = state.card.cardItems.length;
    },
  },
});

export const { addToCard, removeFromCard } = productSlice.actions;

export default productSlice.reducer;
