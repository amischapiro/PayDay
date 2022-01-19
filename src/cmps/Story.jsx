import React, { useState } from 'react';
import { DynamicCmp } from './dynamicCmps/DynamicCmp';

export function Story({ story, board }) {
	const { cmpsOrder } = board;
	return (
		<div>
			<h5>{story.title}</h5>
			{cmpsOrder.map((cmp, idx) => {
				return (
					<DynamicCmp
						key={idx}
						cmp={cmp}
						info={story}
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
