import React, { useState } from "react";
import { useTranslation } from "react-i18next";




const Categorie = React.memo(({ value, onChangeCategory }) => {
  const { t } = useTranslation();
  const remAllGoods = "Do you want remove all goods?";
  const categories = ['All', "М'ясні", "Вегетаріанська", "Гриль", "Гострі", "Закриті"];

  if (window.confirm({ t(`${remAllGoods}`) })) {
    dispatch(clearItem());
  }

  {t(`${ obj.name }`)}{" "}

  return (

    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li key={i} onClick={() => onChangeCategory(i)} className={value === i ? "active" : ""}>
            {t({ categoryName })}
          </li>
        ))}
      </ul>
    </div>
  );
});
export default Categorie;
