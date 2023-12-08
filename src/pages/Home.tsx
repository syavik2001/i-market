import React, {useContext, useState, useEffect, useRef, useCallback} from "react";
import qs from "qs";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import {fetchPizzas, SearchPizzaParams} from "../redux/slices/pizzaSlice";
import {RootState, useAppDispatch} from "../redux/store";

const Home: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const isMounted = useRef(false);
	const categoryId = useSelector((state: RootState) => state.filter.categoryId);
	const sort = useSelector((state: RootState) => state.filter.sort.sortProperty);
	const currentPage = useSelector((state: RootState) => state.filter.currentPage);
	const searchValue = useSelector((state: RootState) => state.filter.searchValue);
	const {items, status} = useSelector((state: RootState) => state.pizza);

	const onChangeCategory = useCallback((idx: number) => {
		dispatch(setCategoryId(idx));
	}, []);

	const onChangePage = (page: number) => {
		dispatch(setCurrentPage(page));
	};

	const getPizzas = async () => {
		const order = sort.includes("-") ? "asc" : "desc";
		const sortBy = sort.replace("-", "");
		const category = categoryId > 0 ? `category=${categoryId}` : "";
		const search = searchValue ? `title=${searchValue}` : "";

		dispatch(
			fetchPizzas({
				order,
				sortBy,
				category,
				search,
				currentPage: String(currentPage),
			}),
		);
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		if (isMounted.current) {
			const params = {
				categoryId: categoryId > 0 ? categoryId : null,
				sortProperty: sort,
				currentPage,
			};
			const queryString = qs.stringify(params, {skipNulls: true});
			navigate(`/i-market/?${queryString}`);
		}

		// 15.07
		//const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams;
		//const sortObj = sortList.find((obj) => obj.sortProperty === params.sortBy);
		//dispatch(
		//	setFilters({
		//		searchValue: params.search,
		//		categoryId: Number(params.category),
		//		currentPage: Number(params.currentPage),
		//		sort: sortObj || sortList[0],
		//	})
		//);

		getPizzas();
		//isMounted.current = true;
	}, [categoryId, sort, searchValue, currentPage]);

	useEffect(() => {
		if (window.location.search) {
			const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams;
			const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
			dispatch(
				setFilters({
					searchValue: params.search,
					categoryId: Number(params.category),
					currentPage: Number(params.currentPage),
					sort: sort || sortList[0],
				}),
			);
		}
		isMounted.current = true;
	}, []);

	//fetch(
	//  `https://645aa6b495624ceb21082f35.mockapi.io/items?page=${currentPage}&limit=4&${search}&${category}&sortBy=${sortBy}&order=${order}`)
	//  .then((res) => res.json())
	//  .then((arr) => {
	//    setItems(arr);
	//    setIsLoading(false)
	//  }); -----Получение данных с бэка через Фетч

	const pizzas = items
		//.filter(obj => {
		//  if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
		//    return true;
		//  }
		//  return false;
		//}) Фильтрация статических пиц!!!(не обращаясь к бэку)
		.map((obj: any) => (
			<PizzaBlock
				key={obj.id}
				id={obj.id}
				category={obj.category}
				title={obj.title}
				price={obj.price}
				image={obj.imageUrl}
				sizes={obj.sizes}
				activeSize={obj.activeSize}
				types={obj.types}
				activeType={obj.activeType}
				rating={obj.rating}
			/>
		));
	const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

	return (
		<>
			<div className="container">
				<div className="content__top">
					<Categories value={categoryId} onChangeCategory={onChangeCategory} />
					<Sort value={sort} />
				</div>
				<h2 className="content__title">Всі піци</h2>
				{status === "error" ? (
					<div className="content__error-info">
						<h2>Помилка</h2>
						<p>Неможливо відобразити товари. Спробуйте пізніше.</p>
					</div>
				) : (
					<div className="content__items">{status === "loading" ? skeletons : pizzas}</div>
				)}
				{status === "success" ? <Pagination currentPage={currentPage} onChangePage={onChangePage} /> : null}
			</div>
		</>
	);
};

export default Home;
