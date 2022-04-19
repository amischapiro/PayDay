import React, { useState, useRef } from 'react';
import { utilService } from '../services/util.service';
import { connect } from 'react-redux';
import { userService } from '../services/user.service';

export function _AddStory(props) {

	const { board, group, updateBoard } = props;
	const currUser = userService.getMiniLoggedInUser();
	const [txt, setTxt] = useState('');
	const [isFocused, toggleIsFocused] = useState(false)

	const inputEl = useRef();

	const onAddStory = async ({ target }) => {
		const value = target.value;

		if (!value) return;
		const newStory = utilService.createStory(value);

		const newBoard = { ...board };
		const groupId = group.id;
		const groupIdx = newBoard.groups.findIndex(
			(group) => group.id === groupId
		);

		if (
			!newBoard.groups[groupIdx].stories ||
			!newBoard.groups[groupIdx].stories.length
		)
			newBoard.groups[groupIdx].stories = [newStory];
		else newBoard.groups[groupIdx].stories.push(newStory);

		await updateBoard(newBoard);
		setTxt('');
	};

	const handleUpdate = (ev) => {
		if (ev.key === 'Enter' || ev.type === 'blur') {
			onAddStory(ev);
			toggleIsFocused(false)
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
		<div className={isFocused ? "add-story focused" : "add-story"} onClick={onFocusInput}>
			<div
				className="story-selector"
				style={{
					backgroundColor: group.style.backgroundColor,
				}}></div>
			<input
				autoComplete="off"
				name="txt"
				type="text"
				placeholder="+ Add Story"
				onBlur={handleUpdate}
				onKeyUp={handleUpdate}
				value={txt}
				onClick={() => toggleIsFocused(true)}
				onChange={handleChange}
				ref={inputEl}
			/>
			<button className="add" onClick={handleUpdate}>
				Add
			</button>
			<div className="story-closer"></div>
		</div>
	);
}

function mapStateToProps({ boardModule }) {
	return {
		// board: boardModule.board,
		// users: state.userModule.users,
		// loggedInUser: state.userModule.loggedInUser
	};
}

const mapDispatchToProps = {};

export const AddStory = connect(mapStateToProps, mapDispatchToProps)(_AddStory);
