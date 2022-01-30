import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

export function KanbanMembers({ story }) {
    const storyMems = story.storyData.members || [];

	return (
		<div className="members-sum">
			{!storyMems.length ? (
				<AccountCircleOutlinedIcon className="no-members" />
			) : storyMems.length > 2 ? (
				<div className="active-member-list">
					{storyMems[0].imgUrl ? (
						<img
							key={storyMems[0]._id}
							src={storyMems[0].imgUrl}
							alt=""
						/>
					) : (
						<span className="members-cmp-initials sum-initials">
							{storyMems[0].fullname
								.split(' ')[0]
								.split('')[0] +
								storyMems[0].fullname
									.split(' ')[1]
									.split('')[0]}
						</span>
					)}{' '}
					<span className="plus-members sum">
						+{storyMems.length - 1}
					</span>{' '}
				</div>
			) : (
				<AvatarGroup max={2}>
					{storyMems.map((member) => {
						const nameArr = member.fullname.split(' ');
						const fName = nameArr[0].split('');
						const lName = nameArr[1].split('');
						const initials = fName[0] + lName[0];

						return member.imgUrl ? (
							<Avatar
								key={member._id}
								alt={initials}
								src={member.imgUrl}
								style={{
									width: '30px',
									height: '30px',
								}}
							/>
						) : (
							<span
								className="members-cmp-initials sum-initials"
								key={member._id}>
								{initials}
							</span>
						);
					})}
				</AvatarGroup>
			)}
		</div>
	);
}
