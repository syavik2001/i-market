import React, {useState, useEffect, createContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import './scss/app.scss';

import {BrowserRouter as Router, Route, Link, Routes, BrowserRouter} from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
//import NotFound from './pages/NotFound';
//import Cart from "./pages/Cart";
//import FullPizza from './pages/FullPizza';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

//export const SearchContext = createContext();

function App() {
	//const filter = useSelector((state) => state.filter.value);
	//const dispatch = useDispatch()

	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/cart"
						element={
							<React.Suspense fallback={<div>Cart is loading...</div>}>
								<Cart />
							</React.Suspense>
						}
					/>
					<Route
						path="/pizza/:id"
						element={
							<React.Suspense fallback={<div>Is loading...</div>}>
								<FullPizza />
							</React.Suspense>
						}
					/>
					<Route
						path="/*"
						element={
							<React.Suspense fallback={<div>Is loading...</div>}>
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
