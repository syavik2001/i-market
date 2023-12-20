import React, {useState} from "react";
import {useTranslation} from "react-i18next";

type CategoriesProps = {
	value: number;
	onChangeCategory: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(({value, onChangeCategory}) => {
	const {t} = useTranslation();
	const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Exquisite"];

	return (
		<div className="categories">
			<ul>
				{categories.map((categoryName, i) => (
					<li key={i} onClick={() => onChangeCategory(i)} className={value === i ? "active" : ""}>
						{t(`${categoryName}`)}
					</li>
				))}
			</ul>
		</div>
	);
});
export default Categories;
