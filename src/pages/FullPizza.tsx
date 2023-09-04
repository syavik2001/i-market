import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import pizzaSlice from '../redux/slices/pizzaSlice';

const FullPizza = () => {
	const [pizza, setPizza] = useState<{
		image: string;
		title: string;
		price: number;
	}>();
	const {id} = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchPizza() {
			try {
				const {data} = await axios.get('https://645aa6b495624ceb21082f35.mockapi.io/items/' + id);
				setPizza(data);
			} catch (error) {
				alert('Error getting food :(');
				navigate('/');
			}
		}
		fetchPizza();
	}, []);

	if (!pizza) {
		return <>'Loading...'</>;
	}

	return (
		<div className="container">
			<img src={pizza.image} />
			<h2>{pizza.title}</h2>
			<p> Hello Text......</p>
			<h4>{pizza.price} hrn</h4>
		</div>
	);
};

export default FullPizza;
