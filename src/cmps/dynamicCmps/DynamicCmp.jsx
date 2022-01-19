import React from 'react';
import { StatusCmp } from './StatusCmp.jsx';
import { MemebersCmp } from './MembersCmp.jsx';
import { PriorityCmp } from './PriorityCmp.jsx';
import { TimelineCmp } from './TImelineCmp.jsx';

export function DynamicCmp({ cmp, info, onUpdate }) {
	switch (cmp) {
		case 'status-picker':
			return <StatusCmp info={info} onUpdate={onUpdate} />;
		case 'member-picker':
			return <MemebersCmp info={info} onUpdate={onUpdate} />;
		case 'priority-picker':
			return <PriorityCmp info={info} onUpdate={onUpdate} />;
		case 'timeline-picker':
			return <TimelineCmp info={info} onUpdate={onUpdate} />;
		default:
			return <React.Fragment></React.Fragment>;
	}
}

// export function TaskPreview({ task }) {
//     //GET FROM STORE
//     const cmpsOrder = [
//       "status-picker",
//       "member-picker",
//       "date-picker",
//       "priority-picker",
//     ];
//     return (
//       <section>
//         <h5>{task.txt}</h5>
//         {cmpsOrder.map((cmp, idx) => {
//           return (
//             <DynamicCmp
//               cmp={cmp}
//               key={idx}
//               onUpdate={(data) => {
//                 console.log("Updating: ", cmp, "with data:", data);
//                 // make a copy, update the task
//                 // Call action: updateTask(task)
//               }}
//             />
//           );
//         })}
//       </section>
//     );
//   }