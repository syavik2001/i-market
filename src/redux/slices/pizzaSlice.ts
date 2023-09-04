import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {CartItem} from './cartSlice';
import {Sort} from './filterSlice';

export type SearchPizzaParams = {
	order: string;
	sortBy: string;
	category: string;
	search: string;
	currentPage: string;
};

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
	'pizza/fetchPizzasStatus',
	async (params) => {
		const {order, sortBy, category, search, currentPage} = params;
		const {data} = await axios.get<Pizza[]>(
			`https://645aa6b495624ceb21082f35.mockapi.io/items?page=${currentPage}&limit=4&${search}&${category}&sortBy=${sortBy}&order=${order}`
		);
		return data; // as CartItem[];
	}
);

interface Pizza {
	id: string;
	title: string;
	//category: number;
	price: number;
	sizes: number[];
	image: string;
	types: number[];
	rating: number;
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

interface PizzaSliceState {
	items: Pizza[];
	status: Status;
}

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING,
};

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<Pizza[]>) {
			state.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPizzas.pending, (state) => {
				state.status = Status.LOADING;
				state.items = [];
			})
			.addCase(fetchPizzas.fulfilled, (state, action) => {
				state.items = action.payload;
				state.status = Status.SUCCESS;
			})
			.addCase(fetchPizzas.rejected, (state) => {
				state.status = Status.ERROR;
				state.items = [];
			});
	},
});

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;
