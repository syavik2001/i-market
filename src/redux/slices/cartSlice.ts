import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {getCartFromLS} from '../../utils/getCartFromLS';
import {calcTotalPrice} from '../../utils/calcTotalPrice';

export type CartItem = {
	id: string;
	title: string;
	price: number;
	image: string;
	type: string;
	size: number;
	count: number;
};

interface CartSliceState {
	totalPrice: number;
	items: CartItem[];
}

const {items, totalPrice} = getCartFromLS();
const initialState: CartSliceState = {
	totalPrice,
	items,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<CartItem>) {
			const findItem = state.items.find((obj) => obj.id === action.payload.id);
			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				});
			}
			state.totalPrice = calcTotalPrice(state.items);
		},

		minusItem(state, action: PayloadAction<string>) {
			const findItem = state.items.find((obj) => obj.id === action.payload);
			if (findItem) {
				findItem.count--;
			}
			state.totalPrice = calcTotalPrice(state.items);
		},

		removeItem(state, action: PayloadAction<string>) {
			state.items = state.items.filter((obj) => obj.id !== action.payload);
			state.totalPrice = calcTotalPrice(state.items);
		},

		clearItem(state) {
			state.items = [];
			state.totalPrice = 0;
		},
	},
});

//export const selectCart = (state) => state.cart;
//export const selectCartItemById = (id) => (state) => state.cart.items.find((obj) => obj.id === id);

export const {addItem, removeItem, minusItem, clearItem} = cartSlice.actions;

export default cartSlice.reducer;
