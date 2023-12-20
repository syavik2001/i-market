import React from "react";
import {useTranslation} from "react-i18next";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock = () => {
	const {t} = useTranslation();
	return (
		<>
			<h1 className={styles.root}>{t("Page not found :(")} </h1>
		</>
	);
};

export default NotFoundBlock;
