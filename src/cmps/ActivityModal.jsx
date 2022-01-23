import { connect } from 'react-redux'
import { setStory } from '../store/board.action'
import { useState } from 'react'
import moment from 'moment'
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export function _ActivityModal(props) {

    const onRemoveStory = async () => {
        const story = {
            boardId: null,
            groupId: null,
            storyId: null
        }
        await props.setStory(story)

    }

    const [isActivityShown, setActivityToggle] = useState(null)

    const { selectedStoryIds, boards } = props
    const { boardId, groupId, storyId } = selectedStoryIds

    const getStory = () => {
        if (!boardId) return null
        const boardIdx = boards.findIndex((board) => board._id === boardId)
        const groupIdx = boards[boardIdx].groups.findIndex((group) => group.id === groupId)
        const storyIdx = boards[boardIdx].groups[groupIdx].stories.findIndex((story) => story.id === storyId)
        const story = boards[boardIdx].groups[groupIdx].stories[storyIdx]
        return story

    }
    const getInitials = (fullname) => {
        const nameArr = fullname.split(' ');
        const fName = nameArr[0].split('');
        const lName = nameArr[1].split('');
        const initials = fName[0] + lName[0];
        return initials
    }

    const story = getStory()



    return (
        <div className={`activity-modal ${props.selectedStoryIds.storyId ? 'open' : ''}`}>
            <button onClick={() => { onRemoveStory() }} className="btn-close-modal fa-solid times" ></button>
            <div className="modal-story-name">
                <h3>{story ? story.title : ' '}</h3>
            </div>
            <div className="update-activity-container">
                <div>
                    <div onClick={() => setActivityToggle(false)} className='modal-updates'>Updates</div>
                    <div className={`modal-border-bottom ${!isActivityShown ? 'active' : ''}`} ></div>
                </div>
                <div className="horiz-break-line"></div>
                <div>
                    <div onClick={() => setActivityToggle(true)} className='modal-activity'>Activity Log</div>
                    <div className={`modal-border-bottom ${isActivityShown ? 'active' : ''}`} ></div>
                </div>
            </div>
            <div className="modal-break-line"></div>

            {!isActivityShown && <div className="update-input" >
                <input type="text" placeholder="Write an update..." />
            </div>}
            {isActivityShown && <ul>
                {props.selectedBoard.activities.map((activity) => {

                    return <div key={activity.id} className='activity-preview' >
                        <div className='activity-time' ><AccessTimeIcon className='activity-clock' /><span>{moment(activity.createdAt).fromNow()}</span></div>
                        <div className='activity-member' ><div className='member-img'>{activity.byMember.imgUrl ? <img src={activity.byMember.imgUrl} /> : getInitials(activity.byMember.fullname)}</div>
                        {activity.byMember.fullname}</div> <div>{activity.type}</div></div>
                })}
            </ul>}
        </div>
    )
}


function mapStateToProps({ boardModule }) {
    return {
        boards: boardModule.boards,
        // board: boardModule.selectedBoard,
        selectedBoard: boardModule.selectedBoard,
        selectedStoryIds: boardModule.activityModalStory
        // filterBy: state.boardModule.filterBy,
        // users: state.userModule.users,
        // loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps = {
    setStory
    // loadBoards,
    // getById,
}



export const ActivityModal = connect(mapStateToProps, mapDispatchToProps)(_ActivityModal)