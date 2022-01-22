import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export function TimelineCmp({ story, onUpdate }) {
	const { timeline } = story.storyData;
	let initData = [];
	if (timeline.length) {
		initData.push(timeline[0]);
		if(timeline[1]) initData.push(timeline[1]);
		else initData.push(null);
	} else initData = [null, null];
	const [dateRange, setDateRange] = useState([initData[0], initData[1]]);
	const [startDate, endDate] = dateRange;
	// if(startDate)console.log('TimelineCmp.jsx 💤 9: ', startDate.getTime());
	return (
		<DatePicker
			selectsRange={true}
			startDate={startDate}
			endDate={endDate}
			onChange={(update) => {
				setDateRange(update);
				onUpdate('CHANGE_TIMELINE', update);
			}}
			dateFormat="dd/MM/yyyy"
			// isClearable={true}
		/>
	);
}
