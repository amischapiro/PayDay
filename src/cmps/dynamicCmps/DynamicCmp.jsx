import React from 'react';
import { StatusCmp } from './StatusCmp.jsx';
import { PriorityCmp } from './PriorityCmp.jsx';
import { TimelineCmp } from './TimelineCmp.jsx';
import { MembersCmp } from './MembersCmp.jsx';
import { NumberCmp } from './NumberCmp.jsx';
import { LinkCmp } from './LinkCmp.jsx';

export function DynamicCmp({ cmp, story, onUpdate, board, group }) {
	
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
			return <TimelineCmp story={story} onUpdate={onUpdate} group={group} />;
		case 'number-picker':
			return <NumberCmp story={story} onUpdate={onUpdate} />;
		case 'link-picker':
			return <LinkCmp story={story} onUpdate={onUpdate} />;
		default:
			return <React.Fragment></React.Fragment>;
	}
}
