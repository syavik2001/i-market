import React, {useRef, useContext, useCallback, useState} from 'react';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';

import {useDispatch} from 'react-redux';
import {setSearchValue} from '../../redux/slices/filterSlice';

const Search = () => {
	const dispatch = useDispatch();
	const [value, setValue] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	const updateSearchValue = useCallback(
		debounce((str) => {
			dispatch(setSearchValue(str));
		}, 500),
		[]
	);

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
		updateSearchValue(event.target.value);
	};

	const onClickClear = () => {
		dispatch(setSearchValue(''));
		setValue('');
		inputRef.current?.focus();
	};

	return (
		<div className={styles.root}>
			<svg
				className={styles.icon}
				height="512"
				viewBox="0 0 512 512"
				width="512"
				xmlns="http://www.w3.org/2000/svg">
				<title />
				<path d="M456.69,421.39,362.6,327.3a173.81,173.81,0,0,0,34.84-104.58C397.44,126.38,319.06,48,222.72,48S48,126.38,48,222.72s78.38,174.72,174.72,174.72A173.81,173.81,0,0,0,327.3,362.6l94.09,94.09a25,25,0,0,0,35.3-35.3ZM97.92,222.72a124.8,124.8,0,1,1,124.8,124.8A124.95,124.95,0,0,1,97.92,222.72Z" />
			</svg>
			<input
				ref={inputRef}
				value={value}
				onChange={onChangeInput}
				className={styles.input}
				placeholder="Поиск пиццы..."
			/>
			{value && (
				<svg
					onClick={onClickClear}
					className={styles.clearIcon}
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg">
					<g>
						<path d="M0 0h24v24H0z" fill="none" />
						<path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
					</g>
				</svg>
			)}
		</div>
	);
};

export default Search;
