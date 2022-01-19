import React, { useState } from 'react';
import { DynamicCmp } from './dynamicCmps/DynamicCmp';

<<<<<<< HEAD
export function Story(props) {
	const { board, story } = props
	const { cmpsOrder, members } = board

	console.log(story);


	if (!story) return <React.Fragment />

=======
export function Story({ story, board }) {
	const { cmpsOrder } = board;
>>>>>>> a5541a34b184c0f03941b76006dfc87bf724d122
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
<<<<<<< HEAD
						members={members}
						story={story}
=======
						board={board}
>>>>>>> a5541a34b184c0f03941b76006dfc87bf724d122
					/>
				);
			})}
		</div>
	);
}
