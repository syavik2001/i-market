import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {CartItem} from "./cartSlice";
import {Sort} from "./filterSlice";
import {calcPrice} from "../../utils/calcPrice";

export type SearchPizzaParams = {
	order: string;
	sortBy: string;
	category: string;
	search: string;
	currentPage: string;
};

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
	"pizza/fetchPizzasStatus",
	async (params) => {
		const {order, sortBy, category, search, currentPage} = params;
		const {data} = await axios.get<Pizza[]>(
			`https://645aa6b495624ceb21082f35.mockapi.io/items?page=${currentPage}&limit=12&${search}&${category}&sortBy=${sortBy}&order=${order}`,
		);
		return data; // as CartItem[];
	},
);

interface Pizza {
	id: string;
	title: string;
	//category: number;
	price: number;
	originalPrice: number;
	sizes: number[];
	activeSize: number;
	image: string;
	types: number[];
	activeType: number;
	rating: number;
}

export enum Status {
	LOADING = "loading",
	SUCCESS = "success",
	ERROR = "error",
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
	name: "pizza",
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<Pizza[]>) {
			state.items = action.payload;
		},
		setItemType(state, action: PayloadAction<{id: string; itemType: number}>) {
			const {id, itemType} = action.payload;
			const pizza = state.items.find((pizza) => pizza.id === id);
			if (pizza) {
				pizza.activeType = itemType;
				pizza.price = calcPrice(pizza.activeType, pizza.activeSize, pizza.sizes[0], pizza.originalPrice);
			}
		},
		setItemSize(state, action: PayloadAction<{id: string; itemSize: number}>) {
			const {id, itemSize} = action.payload;
			const pizza = state.items.find((pizza) => pizza.id === id);
			if (pizza) {
				pizza.activeSize = itemSize;
				pizza.price = calcPrice(pizza.activeType, pizza.activeSize, pizza.sizes[0], pizza.originalPrice);
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPizzas.pending, (state) => {
				state.status = Status.LOADING;
				state.items = [];
			})
			.addCase(fetchPizzas.fulfilled, (state, action) => {
				state.items = action.payload.map((pizza) => ({
					...pizza,
					originalPrice: pizza.price,
					activeSize: pizza.sizes[0],
					activeType: 0,
				}));
				state.status = Status.SUCCESS;
			})
			.addCase(fetchPizzas.rejected, (state) => {
				state.status = Status.ERROR;
				state.items = [];
			});
	},
});

export const {setItems, setItemType, setItemSize} = pizzaSlice.actions;

export default pizzaSlice.reducer;
