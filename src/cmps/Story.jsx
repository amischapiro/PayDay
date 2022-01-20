import React, { useState } from 'react';
import { DynamicCmp } from './dynamicCmps/DynamicCmp';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';

export function Story(props) {
	const { board, story } = props;
	const { cmpsOrder } = board;

	if (!story) return <React.Fragment />;

	return (
		<div className="story">
			<div className="story-txt-area">
				<div className="story-selector"></div>
				<div className="story-txt">
					<h5>{story.title}</h5>
					<MapsUgcOutlinedIcon className="update-bubble" />
				</div>
			</div>
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
