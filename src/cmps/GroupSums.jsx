import React from 'react';
import { DynamicGroupSum } from './DynamicGroupSum';

export function GroupSum(props) {
	const { cmpsOrder, group } = props;
	return (
		<div className="group-sums">
			<div className="empty-txt-area"></div>
			{cmpsOrder.map((cmp, index) => {
				return (
					<DynamicGroupSum
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