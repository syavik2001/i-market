export const calcPrice = (
	activeType: number,
	activeSize: number,
	initialSize: number,
	initialPrice: number
) => {
	const sizePriceRatio = activeSize / initialSize;
	let newPrice = initialPrice * sizePriceRatio;

	if (activeType === 1) {
		newPrice = newPrice * 1.3;
	}
	console.log('nice', newPrice, initialPrice, initialSize, activeSize, activeType);
	return +newPrice.toFixed(0);
};
