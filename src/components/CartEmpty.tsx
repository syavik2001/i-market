import React from "react";
import cartEmptyImg from "../assets/img/empty-cart2.png";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const CartEmpty = () => {
	const {t} = useTranslation();
	return (
		<>
			<div className="cart cart--empty">
				<h2>
					{t("Cart is empty")} <span>😕</span>
				</h2>
				<p>
					{t("You dont ordered goods.")}
					<br />
					{t("Go to main page and make an order.")}
				</p>
				<img src={cartEmptyImg} alt="Empty cart" />
				<Link to="/i-market/" className="button button--black">
					<span>{t("Go back")}</span>
				</Link>
			</div>
		</>
	);
};

export default CartEmpty;
