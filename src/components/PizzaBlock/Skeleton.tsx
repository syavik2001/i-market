import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
	<ContentLoader
		className="pizza-block"
		speed={2}
		width={280}
		height={500}
		viewBox="0 0 280 500"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb">
		<circle cx="136" cy="122" r="122" />
		<rect x="0" y="260" rx="10" ry="10" width="280" height="20" />
		<rect x="0" y="300" rx="10" ry="10" width="280" height="88" />
		<rect x="0" y="400" rx="10" ry="10" width="95" height="30" />
		<rect x="122" y="400" rx="25" ry="25" width="152" height="45" />
	</ContentLoader>
);

export default Skeleton;
