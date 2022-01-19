import React, { useState } from 'react';
import { DynamicCmp } from './dynamicCmps/DynamicCmp';

export function Story(props) {
	const { board, story } = props
	const { cmpsOrder } = board

	console.log(story);


	if (!story) return <React.Fragment />

	return (
		<div>
			<h5>{story.title}</h5>
			{cmpsOrder.map((cmp, idx) => {
				return (
					<DynamicCmp
						key={idx}
						cmp={cmp}
						story={story}
						onUpdate={(data) => {
							console.log('Updating:', cmp, 'with data:', data);
							// make a copy, update the task
							// Call action: updateTask(task)
						}}
						board={board}
					/>
				);
			})}
		</div>
	);
}
