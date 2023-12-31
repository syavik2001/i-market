import React, {useState, useEffect, createContext} from "react";
import {useSelector, useDispatch} from "react-redux";

import "./scss/app.scss";

import {BrowserRouter as Router, Route, Link, Routes, BrowserRouter} from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
//import NotFound from './pages/NotFound';
//import Cart from "./pages/Cart";
//import FullPizza from './pages/FullPizza';
import {useTranslation} from "react-i18next";

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ "./pages/Cart"));
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ "./pages/FullPizza"));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound"));

//export const SearchContext = createContext();

function App() {
	//const filter = useSelector((state) => state.filter.value);
	//const dispatch = useDispatch()
	const {t, i18n} = useTranslation();
	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<Routes>
					<Route path="/i-market/" element={<Home />} />
					<Route
						path="/i-market/cart/"
						element={
							<React.Suspense fallback={<div>Кошик завантажується...</div>}>
								<Cart />
							</React.Suspense>
						}
					/>
					<Route
						path="/i-market/pizza/:id"
						element={
							<React.Suspense fallback={<div>Завантаження...</div>}>
								<FullPizza />
							</React.Suspense>
						}
					/>
					<Route
						path="/i-market/*"
						element={
							<React.Suspense fallback={<div>Завантаження...</div>}>
								<NotFound />
							</React.Suspense>
						}
					/>
				</Routes>
			</div>
		</div>
	);
}

export default App;
