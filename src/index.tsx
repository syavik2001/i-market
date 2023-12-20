import React from "react";
import {Suspense} from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router, BrowserRouter} from "react-router-dom";
import App from "./App";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<Suspense fallback="...loading">
				<App />
			</Suspense>
		</Provider>
	</BrowserRouter>,
);
