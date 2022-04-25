import moment from 'moment'

export const ActivityPreview = ({ activity, selectedBoard }) => {

    const { byMember, group, story, createdAt, type } = activity
    const { imgUrl, fullname } = byMember

    const getIconPerActions = (activityType) => {
        const actionType = activityType.substring(activityType.indexOf(' ') + 1, activityType.length)
        switch (actionType) {
            case 'added':
                return 'fa-solid plus'
            case 'deleted':
                return 'fa trash'
            case 'removed':
                return 'fa trash'
            case 'duplicated':
                return 'fa copy'
            case 'color':
                return 'fa-solid color'
            case 'changed':
                return 'fa-solid exchange-alt'
            default:
                break
        }
    }

    const getGroupColor = (groupId) => {
        const group = selectedBoard.groups.find(group => group.id === groupId)
        const color = group?.style?.backgroundColor
        if (!color) return '#676879'
        else return color
    }

    const getInitials = (fullname) => {
        const nameArr = fullname.split(' ');
        const fName = nameArr[0].split('');
        const lName = nameArr[1].split('');
        const initials = fName[0] + lName[0];
        return initials
    }

    return (

        <div key={activity._id} className='activity-preview' >
            <div className='activity-time' >
                <span className="fa clock"></span>
                <span>{moment(createdAt).fromNow()}</span>
            </div>
            <div className='activity-member' >
                <div className='member-img'>
                    {imgUrl ? (
                        <img src={imgUrl} alt="" />
                    ) : (
                        getInitials(fullname)
                    )}
                </div>
                <div className='activity-title'>
                    {story ? story.title : group.title}
                </div>
            </div>
            <div className="activity-type flex align-center">
                <span className={getIconPerActions(type)} style={{ color: getGroupColor(group.id) }}></span>
                <div>{type}</div>
            </div>
        </div>

    )
}