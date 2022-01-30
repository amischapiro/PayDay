import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function DueDateCmp({ story, onUpdate }) {
	const { dueDate } = story.storyData;
	const [startDate, setStartDate] = useState(dueDate || new Date());

    useEffect(() => {
        console.log(startDate);
        // onUpdate('CHANGE_DUE_DATE', startDate);
    }, [startDate])
	return (
		<DatePicker
			selected={startDate}
			onChange={(date) => setStartDate(date)}
			dateFormat="MMM d">
			{(Date.now() > startDate) &&
				<div style={{ color: 'red' }}>
					Past due date!
				</div>
			}
		</DatePicker>
	);
}
