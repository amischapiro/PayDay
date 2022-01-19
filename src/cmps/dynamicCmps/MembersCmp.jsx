export function MembersCmp({ story, onUpdate, boardMembers }) {
	const { members } = story;

	return (
		<span
			onClick={() => {
				return (
					<div className="board-members-list">
						{boardMembers.map((member) => {
							const nameArr = member.fullname.split(' ');
							const fName = nameArr[0].split('');
							const lName = nameArr[1].split('');
							return (
								<img
									onClick={() =>
										onUpdate('ADD_MEMBER', member._id)
									}
									src={member.imgUrl}
									alt={fName[0] + lName[0]}
								/>
							);
						})}
					</div>
				);
			}}>
			{members.map((member) => {
				const nameArr = member.fullname.split(' ');
				const fName = nameArr[0].split('');
				const lName = nameArr[1].split('');
				return <img src={member.imgUrl} alt={fName[0] + lName[0]} />;
			})}
		</span>
	);
}
