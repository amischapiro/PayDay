import React, { useState, useRef } from 'react';

export function NumberCmp({ story, onUpdate }) {
	const { number } = story.storyData;
	// console.log('NumberCmp.jsx 💤 5: ', number);
	const [txt, setTxt] = useState(number || '');
	const inputEl = useRef();

	const onAddNumber = async ({ target }) => {
		const value = target.value;
		if (!value) return;

		await onUpdate('CHANGE_NUMBER', value);
		setTxt(value || '');
	};

	const handleUpdate = (ev) => {
		if (ev.key === 'Enter' || ev.type === 'blur') {
			onAddNumber(ev);
		}
	};

	const handleChange = ({ target }) => {
		const { value } = target;
		setTxt(value);
	};

	const onFocusInput = () => {
		inputEl.current.focus();
	};

	return (
		<div className="add-number" onClick={onFocusInput}>
			<input
				autoComplete="off"
				name="txt"
				type="text"
				// placeholder="+ Add Story"
				onBlur={handleUpdate}
				onKeyUp={handleUpdate}
				value={txt}
				onChange={handleChange}
				ref={inputEl}
				onSubmit={(ev) => {
					handleUpdate(ev);
				}}
			/>
		</div>
	);
}
