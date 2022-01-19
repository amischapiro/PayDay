import React from 'react';
import { StatusCmp } from './StatusCmp.jsx';
import { PriorityCmp } from './PriorityCmp.jsx';
import { TimelineCmp } from './TimelineCmp.jsx';
import { MembersCmp } from './MembersCmp.jsx';

<<<<<<< HEAD
export function DynamicCmp({ cmp, story, onUpdate, members }) {
	switch (cmp) {
		case 'status-picker':
			return <StatusCmp story={story} onUpdate={onUpdate} boardMembers={members} />;
		case 'member-picker':
			return <MembersCmp story={story} onUpdate={onUpdate} boardMembers={members} />;
		case 'priority-picker':
			return <PriorityCmp story={story} onUpdate={onUpdate} boardMembers={members} />;
		case 'timeline-picker':
			return <TimelineCmp story={story} onUpdate={onUpdate} boardMembers={members} />;
=======
export function DynamicCmp({ cmp, story, onUpdate, board }) {
	const { members, priorities, statuses } = board;
	switch (cmp) {
		case 'status-picker':
			return (
				<StatusCmp
					story={story}
					onUpdate={onUpdate}
					boardStatuses={statuses}
				/>
			);
		case 'member-picker':
			return (
				<MembersCmp
					story={story}
					onUpdate={onUpdate}
					boardMembers={members}
				/>
			);
		case 'priority-picker':
			return (
				<PriorityCmp
					story={story}
					onUpdate={onUpdate}
					boardPriorities={priorities}
				/>
			);
		case 'timeline-picker':
			return <TimelineCmp story={story} onUpdate={onUpdate} />;
>>>>>>> a5541a34b184c0f03941b76006dfc87bf724d122
		default:
			return <React.Fragment></React.Fragment>;
	}
}
