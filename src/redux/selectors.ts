import {createSelector} from '@reduxjs/toolkit';
import {CartItem} from './slices/cartSlice';
import {RootState} from './store';

export const getCartItem = (id: string, activeType: string, activeSize: number) =>
	createSelector(
		(state: RootState) => state.cart.items,
		(items: CartItem[]) =>
			items.find((item: CartItem) => item.id === id && item.type === activeType && item.size === activeSize)
	);
