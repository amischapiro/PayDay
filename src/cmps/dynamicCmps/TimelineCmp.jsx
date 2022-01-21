import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export function TimelineCmp() {
	const [dateRange, setDateRange] = useState([null, null]);
	const [startDate, endDate] = dateRange;
	// if(startDate)console.log('TimelineCmp.jsx 💤 9: ', startDate.getTime());
	return (
		<DatePicker
			selectsRange={true}
			startDate={startDate}
			endDate={endDate}
			onChange={(update) => {
				console.log(update)
				setDateRange(update);
			}}
			dateFormat="dd/MM/yyyy"
			// isClearable={true}
		/>
	);
}
