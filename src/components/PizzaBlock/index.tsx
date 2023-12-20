import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {CartItem, addItem} from "../../redux/slices/cartSlice";
import {Link} from "react-router-dom";
import {RootState} from "../../redux/store";
import {setItemType, setItemSize} from "../../redux/slices/pizzaSlice";
import {getCartItem} from "../../redux/selectors";
import {useTranslation} from "react-i18next";

const typeNames = ["slim", "traditional"];

type PizzaBlockProps = {
	id: string;
	title: string;
	category: number;
	price: number;
	sizes: number[];
	activeSize?: number;
	image: string;
	types: number[];
	activeType?: number;
	rating: number;
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({
	id,
	title,
	price,
	image,
	sizes,
	types,
	activeType = 0,
	activeSize = sizes[0],
	// rating,
}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation();
	const cartItem = useSelector(getCartItem(id, typeNames[activeType], activeSize));

	const addedCount = cartItem ? cartItem.count : 0;

	const onClickAddToCart = () => {
		const item: CartItem = {
			id,
			title,
			price,
			image,
			type: typeNames[activeType],
			size: activeSize,
			count: 0,
		};
		dispatch(addItem(item));
	};

	const onClickChangeType = (typeIndex: number) => {
		dispatch(setItemType({id: id, itemType: typeIndex}));
	};

	const onClickChangeSize = (size: number) => {
		dispatch(setItemSize({id: id, itemSize: size}));
	};

	return (
		<div className="pizza-block-wrapper">
			<div className="pizza-block">
				<Link key={id} to={`/i-market/pizza/${id}`}>
					<img className="pizza-block__image" src={image} alt="Pizza" />
					<h4 className="pizza-block__title">{t(title)}</h4>
				</Link>
				<div className="pizza-block__selector">
					<ul>
						{types.map((type, i) => (
							<li
								key={type}
								onClick={() => onClickChangeType(i)}
								className={activeType === i ? "active" : ""}>
								{t(typeNames[type])}{" "}
							</li>
						))}
					</ul>
					<ul>
						{sizes.map((size, i) => (
							<li
								key={size}
								onClick={() => onClickChangeSize(size)}
								className={activeSize === size ? "active" : ""}>
								{size} {t("sm")}.
							</li>
						))}
					</ul>
				</div>
				<div className="pizza-block__bottom">
					<div className="pizza-block__price">
						{" "}
						{price} {t("uah")}
					</div>
					<button onClick={onClickAddToCart} className="button button--outline button--add">
						<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
								fill="white"
							/>
						</svg>
						<span>{t("Add")}</span>
						{addedCount > 0 && <i>{addedCount}</i>}
					</button>
				</div>
			</div>
		</div>
	);
};
export default PizzaBlock;
