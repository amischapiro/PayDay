import React from 'react';
import { StatusCmp } from './StatusCmp.jsx';
import { PriorityCmp } from './PriorityCmp.jsx';
import { TimelineCmp } from './TimelineCmp.jsx';
import { MembersCmp } from './MembersCmp.jsx';

export function DynamicCmp({ cmp, info, onUpdate }) {
	switch (cmp) {
		case 'status-picker':
			return <StatusCmp info={info} onUpdate={onUpdate} />;
		case 'member-picker':
			return <MembersCmp info={info} onUpdate={onUpdate} />;
		case 'priority-picker':
			return <PriorityCmp info={info} onUpdate={onUpdate} />;
		case 'timeline-picker':
			return <TimelineCmp info={info} onUpdate={onUpdate} />;
		default:
			return <React.Fragment></React.Fragment>;
	}
}