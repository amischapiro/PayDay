import React, { useState } from 'react';
import { connect } from 'react-redux';
import { DynamicCmp } from './dynamicCmps/DynamicCmp';

function _Story({ story, cmpOrder }) {
	//GET FROM STORE
	const cmpsOrder = [
		'status-picker',
		'member-picker',
		'date-picker',
		'priority-picker',
	];
	return (
		<section>
			<h5>{story.txt}</h5>
			{cmpsOrder.map((cmp, idx) => {
				return (
					<DynamicCmp
						cmp={cmp}
						key={idx}
						onUpdate={(data) => {
							console.log('Updating: ', cmp, 'with data:', data);
							// make a copy, update the task
							// Call action: updateTask(task)
						}}
					/>
				);
			})}
		</section>
	);
}

function mapStateToProps(state) {
    return {
        story: state.boardModule.board
    }
}

const mapDispatchToProps = {};

export const Story = connect(mapStateToProps, mapDispatchToProps)(_Story);
