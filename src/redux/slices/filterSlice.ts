import {PayloadAction, createSlice} from "@reduxjs/toolkit";

export enum SortPropertyEnum {
	RATING_DESC = "rating",
	RATING_ASC = "-rating",
	TITLE_ASC = "-title",
	PRICE_ASC = "-price",
	PRICE_DESC = "price",
}

export interface Sort {
	name: string;
	sortProperty: SortPropertyEnum;
}

export interface FilterSliceState {
	searchValue: string;
	categoryId: number;
	currentPage: number;
	sort: Sort;
}

const initialState: FilterSliceState = {
	searchValue: "",
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: "rating",
		sortProperty: SortPropertyEnum.RATING_DESC,
	},
};

export const filterSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		},

		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload;
		},

		setSort(state, action: PayloadAction<Sort>) {
			state.sort = action.payload;
		},

		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},

		setFilters(state, action: PayloadAction<FilterSliceState>) {
			if (Object.keys(action.payload).length) {
				state.currentPage = Number(action.payload.currentPage);
				state.categoryId = Number(action.payload.categoryId);
				state.sort = action.payload.sort;
			} else {
				state.currentPage = 1;
				state.categoryId = 0;
				state.sort = {
					name: "rating",
					sortProperty: SortPropertyEnum.RATING_DESC,
				};
			}
		},
	},
});

export const {setSearchValue, setCategoryId, setSort, setCurrentPage, setFilters} = filterSlice.actions;

export default filterSlice.reducer;
