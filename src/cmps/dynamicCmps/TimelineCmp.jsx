// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';

// import 'react-datepicker/dist/react-datepicker.css';

// export function TimelineCmp({ story, onUpdate }) {
// 	const { timeline } = story.storyData;
// 	let initData = [];
// 	if (timeline.length) {
// 		initData.push(timeline[0]);
// 		initData.push(timeline[1] ? timeline[1] : null);
// 	} else initData = [null, null];
// 	const [dateRange, setDateRange] = useState([initData[0], initData[1]]);
// 	const [startDate, endDate] = dateRange;
// 	// if(startDate)console.log('TimelineCmp.jsx 💤 9: ', startDate.getTime());
// 	return (
// 		<DatePicker
// 			selectsRange={true}
// 			startDate={startDate}
// 			endDate={endDate}
// 			onChange={(update) => {
// 				setDateRange(update);
// 				onUpdate('CHANGE_TIMELINE', update);
// 			}}
// 			dateFormat="dd/MM/yyyy"
// 			// isClearable={true}
// 		/>
// 	);
// }


   
import React, { useState, useEffect, useRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { registerLocale, setDefaultLocale } from "react-datepicker";
// import uk from 'date-fns/locale/en-GB';
// registerLocale('uk', uk)

export function TimelineCmp({ story, group, onUpdate }) {

	const { timeline } = story.storyData;
	let initData = [];
	if (timeline.length) {
		initData.push(timeline[0]);
		initData.push(timeline[1] ? timeline[1] : null);
	} else initData = [null, null];

    const [startDate, setStartDate] = useState(initData[0])
    const [endDate, setEndDate] = useState(initData[1])
    const [isDateSet, setIsDateSet] = useState(false)
    const [isSettingDate, setIsSettingDate] = useState(false)
    const [isHover, setIsHover] = useState(false)
    const { backgroundColor } = group.style
    const firstUpdate = useRef(true);
    // const inputEl = useRef();

	// const [dateRange, setDateRange] = useState([initData[0], initData[1]]);
	// const [startDate, endDate] = dateRange;

    useEffect(() => {
        setIsDateSet((!initData[0] && !initData[1]) ? false : true)
        return () => {
            firstUpdate.current = true
        }
            //  eslint-disable-next-line
    }, [])
   
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false
            return
        } 
        if (!endDate) return
        onSetTimeline()
            //  eslint-disable-next-line
    }, [endDate])
    
    const setDateRange = (newRange) => {
        if (!newRange[1]) {
            setStartDate(newRange[0])
            setEndDate(null)
            setIsSettingDate(true)
            return
        }
        setEndDate(newRange[1])
    }

    const onSetTimeline = async () => {
        const timeline = [startDate, endDate]
        story.timeline = timeline
        // const newActivity = {
        //     id: utilService.makeId(),
        //     type: 'Timeline changed',
        //     createdAt: Date.now(),
        //     byMember: userService.getLoggedinUser(),
        //     story: {
        //         id: story.id,
        //         title: story.title,
        //         changedItem: `${`${startDate}`.substring(4, 10)}-${`${endDate}`.substring(4, 10)}`
        //     },
        //     group: {
        //         id: group.id,
        //         title: group.title
        //     }
        // }
        // newBoard.activities.unshift(newActivity)
        setIsDateSet(true)
        setIsSettingDate(false)
        onUpdate('CHANGE_TIMELINE', timeline)
    }

    const onEnter = () => {
        setIsHover(true)
    }
    const onLeave = () => {
        setIsHover(false)
    }
    const onSetDates = () => {
        setIsSettingDate(true)
    }

    const getNumOfDays = () => {
        if (!startDate || !endDate) return
        // const timestampStart = startDate
        // const timestampEnd = endDate
        const totalDays = (endDate - startDate) / 1000 / 60 / 60 / 24
        return totalDays
    }
    const getPercent = () => {
        const now = Date.now()
        // const timestampStart = startDate
        const totalDays = getNumOfDays()
        let milliPassed = now - startDate
        const daysPassed = Math.floor(milliPassed / 1000 / 60 / 60 / 24)
        let percent = daysPassed / totalDays * 100
        if (percent < 0) percent = 0
        if (percent > 100) percent = 100
        return percent
    }

    // const onFocusInput = () => {
	// 	inputEl.current.focus();
	// };

    return (
        <div className="timeline" onMouseEnter={onEnter} onMouseLeave={onLeave}>

            {!isDateSet && !isSettingDate && !isHover &&
                <span className="no-date">-</span>}

            {!isDateSet && !isSettingDate && isHover &&
                <span className="set-dates" onClick={onSetDates}>Set Dates</span>}

            {!isDateSet && isSettingDate && <DatePicker
                // placeholderText="-"
                popperPlacement="bottom"
                className="date-picker-cmp"
                // locale="uk"
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                    setDateRange(update);
                }}
				// dateFormat="MMMM"
            />}

            {isDateSet && !isSettingDate && isHover &&
                <span className="num-of-days" onClick={() => setIsHover(false) }>{getNumOfDays()}d</span>}

            {isDateSet && !isHover &&
                <div className="date-pick-wrapper">
                    <div className="date-picker-container">
                        <div className="progress-bar"
                            style={{ backgroundColor: backgroundColor, width: `${getPercent()}%`, borderRadius:"25px 0 0 25px", height: '24px' }}>
                        </div>
                        <div className="grey-bck"></div>
                        <DatePicker
                            className="date-picker-cmp"
                            popperPlacement="bottom"
                            popperClassName="date-picker-pos"
                            // dateFormat="us"
                            // locale="uk"
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update) => {
                                setDateRange(update);
                            }}
                        />
                    </div>
                </div>}
        </div>
    );
}