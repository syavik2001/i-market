import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import pizzaSlice from "../redux/slices/pizzaSlice";
import {useTranslation} from "react-i18next";

const FullPizza = () => {
	const [pizza, setPizza] = useState<{
		imageUrl: string;
		title: string;
		price: number;
	}>();
	const {id} = useParams();
	const navigate = useNavigate();
	const {t} = useTranslation();

	useEffect(() => {
		async function fetchPizza() {
			try {
				const {data} = await axios.get("https://645aa6b495624ceb21082f35.mockapi.io/items/" + id);
				setPizza(data);
			} catch (error) {
				alert("Error getting food :(");
				navigate("/i-market/");
			}
		}
		fetchPizza();
	}, []);

	if (!pizza) {
		return <>'Loading...'</>;
	}

	return (
		<div className="container">
			<img className="container--img" src={pizza.imageUrl} />
			<h2>{t(pizza.title)}</h2>
			<p> Тут повинен бути опис......</p>
			<h4>
				{pizza.price} {t("uah")}
			</h4>
		</div>
	);
};

export default FullPizza;
