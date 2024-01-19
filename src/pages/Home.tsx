import React, {useContext, useState, useEffect, useRef, useCallback, useMemo} from "react";
import qs from "qs";
import {useNavigate, useParams, useLocation} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import {useTranslation} from "react-i18next";
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
	const params = useParams<{categoryId?: string}>(); // Извлекаем параметры из URL
	const location = useLocation();
	const isMounted = useRef(false);
	const categoryId = useSelector((state: RootState) => state.filter.categoryId);
	const sort = useSelector((state: RootState) => state.filter.sort.sortProperty);
	const currentPage = useSelector((state: RootState) => state.filter.currentPage);
	const searchValue = useSelector((state: RootState) => state.filter.searchValue);
	const {items, status} = useSelector((state: RootState) => state.pizza);
	const {t, i18n} = useTranslation();

	const onChangeCategory = useCallback((idx: number) => {
		dispatch(setCategoryId(idx));
	}, []);

	const onChangePage = (page: number) => {
		dispatch(setCurrentPage(page));
	};

	const getPizzas = useCallback(async () => {
		const order = sort.includes("-") ? "asc" : "desc";
		const sortBy = sort.replace("-", "");
		const category = categoryId > 0 ? `category=${categoryId}` : "";
		const search = searchValue
			? i18n.language === "en"
				? `title=${searchValue}`
				: `titleUkr=${searchValue}`
			: "";

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
	}, [dispatch, sort, categoryId, searchValue, currentPage, i18n.language]);

	useEffect(() => {
		const handlePopstate = (event: PopStateEvent) => {
			// Обработчик изменения истории браузера
			const newUrl = new URL(window.location.href);
			const newCategoryId = newUrl.searchParams.get("categoryId");
			const newSort = newUrl.searchParams.get("sortProperty");
			const newPage = newUrl.searchParams.get("currentPage");

			// Обновляем состояние в соответствии с новым URL
			dispatch(
				setFilters({
					searchValue,
					categoryId: newCategoryId ? Number(newCategoryId) : 0,
					currentPage: newPage ? Number(newPage) : 1,
					sort: sortList.find((obj) => obj.sortProperty === newSort) || sortList[0],
				}),
			);

			// Поднимаем страницу вверх
			setTimeout(() => {
				window.scrollTo(0, 0);
			}, 0);
		};

		window.addEventListener("popstate", handlePopstate);

		return () => {
			window.removeEventListener("popstate", handlePopstate);
		};
	}, []);

	useEffect(() => {
		//if (isMounted.current) {
		//	isMounted.current = true;
		//	return;
		//}

		const newCategoryId = categoryId !== null && !isNaN(categoryId) ? categoryId.toString() : "0";
		const newCurrentPage = !isNaN(currentPage) ? currentPage.toString() : "1";

		const params = new URLSearchParams();
		if (newCategoryId !== "") {
			params.set("categoryId", newCategoryId);
		}
		params.set("sortProperty", sort);
		params.set("currentPage", newCurrentPage);

		const queryString = params.toString();
		if (window.location.search !== `?${queryString}`) {
			navigate(`/i-market/?${queryString}`);
		}

		dispatch(
			setFilters({
				searchValue,
				categoryId: Number(newCategoryId),
				currentPage: Number(newCurrentPage),
				sort: sortList.find((obj) => obj.sortProperty === sort) || sortList[0],
			}),
		);

		getPizzas();
	}, [categoryId, sort, searchValue, currentPage]);

	const pizzas = items.map((obj: any) => (
		<PizzaBlock
			key={obj.id}
			id={obj.id}
			category={obj.category}
			title={i18n.language === "en" ? obj.title : obj.titleUkr}
			price={obj.price}
			image={obj.imageUrl}
			sizes={obj.sizes}
			activeSize={obj.activeSize}
			types={obj.types}
			activeType={obj.activeType}
			rating={obj.rating}
		/>
	));
	const skeletons = [...new Array(12)].map((_, index) => <Skeleton key={index} />);

	return (
		<>
			<div className="container">
				<div className="content__top">
					<Categories value={categoryId} onChangeCategory={onChangeCategory} />
					<Sort value={sort} />
				</div>
				<h2 className="content__title">{t("All pizzas")}</h2>
				{status === "error" ? (
					<div className="content__error-info">
						<h2>{t("Error")}</h2>
						<p>{t("Unable to display products. Please try again later")}</p>
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
