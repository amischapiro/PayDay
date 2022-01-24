import React, { Component } from 'react';

export class GroupSum extends Component {
	DynamicGroupSum = ({ cmp, group, index }) => {
		switch (cmp) {
			case 'member-picker':
				return <div key={'s' + index} className="members-sum"></div>;
			case 'status-picker':
				let sortedStatus = group.stories.map((story) => {
					return story.storyData.status;
				});
				sortedStatus.sort(function (a, b) {
					if (a.id < b.id) return -1;
					else if (a.id > b.id) return 1;
					else return 0;
				});
				return (
					<div key={'s' + index} className="status-sum">
						{sortedStatus.map((status, index) => {
							return (
								<span
									key={'s2' + index}
									className="bat-fragment"
									style={{
										backgroundColor: status.color,
									}}></span>
							);
						})}
					</div>
				);
			case 'priority-picker':
				let sortedPriority = group.stories.map((story) => {
					return story.storyData.priority;
				});
				sortedPriority.sort(function (a, b) {
					if (a.id < b.id) return -1;
					else if (a.id > b.id) return 1;
					else return 0;
				});
				return (
					<div key={'s' + index} className="priority-sum">
						{sortedPriority.map((priority, index) => {
							return (
								<span
									key={'s2' + index}
									className="bat-fragment"
									style={{
										backgroundColor: priority.color,
									}}></span>
							);
						})}
					</div>
				);
			case 'number-picker':
				let sum = 0;
				group.stories.forEach((story) => {
					sum += story.storyData.number ? +story.storyData.number : 0;
				});
				return (
					<div key={'s' + index} className="num-sum">
						<div className="sum-var">${sum}</div>
						<div className="sum-txt">sum</div>
					</div>
				);
			case 'link-picker':
				return <div key={'s' + index} className="link-sum"></div>;
			case 'timeline-picker':
				return <div key={'s' + index} className="timeline-sum"></div>;
			default:
				return;
		}
	};

	// MembersSum = ({ group }) => {
	// 	// let membersSum = group.stories.map((story) => {
	// 	// 	return story.storyData.members;
	// 	// });

	// 	return <div className="members-sum"></div>;
	// };

	// StatusSum = ({ group }) => {
	// 	return (
	// 		<div className="status-sum">
	// 			{group.stories.map((story) => {
	// 				return (
	// 					<span
	// 						className="bat-fragment"
	// 						style={{
	// 							backgroundColor: story.storyData.status.color,
	// 						}}></span>
	// 				);
	// 			})}
	// 		</div>
	// 	);
	// };

	// PrioritySum = ({ group }) => {
	// 	return (
	// 		<div className="priority-sum">
	// 			{group.stories.map((story) => {
	// 				return (
	// 					<span
	// 						className="bat-fragment"
	// 						style={{
	// 							backgroundColor: story.storyData.priority.color,
	// 						}}></span>
	// 				);
	// 			})}
	// 		</div>
	// 	);
	// };

	// NumberSum = ({ group }) => {
	// 	let sum = 0;
	// 	group.stories.forEach((story) => {
	// 		sum += story.storyData.number ? +story.storyData.number : 0;
	// 	});
	// 	return <div className="num-sum">{sum}</div>;
	// };

	render() {
		const { cmpsOrder, group } = this.props;
		return (
			<div className="group-sums">
				<div className="empty-txt-area"></div>
				{cmpsOrder.map((cmp, index) => {
					return (
						<this.DynamicGroupSum
							cmp={cmp}
							group={group}
							key={index}
							index={index}
						/>
					);
				})}
			</div>
		);
	}
}
