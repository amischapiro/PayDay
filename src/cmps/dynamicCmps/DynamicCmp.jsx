import React from 'react';
import { StatusCmp } from './StatusCmp.jsx';
import { PriorityCmp } from './PriorityCmp.jsx';
import { TimelineCmp } from './TimelineCmp.jsx';
import { MembersCmp } from './MembersCmp.jsx';

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
		default:
			return <React.Fragment></React.Fragment>;
	}
}