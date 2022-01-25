import { connect } from 'react-redux'
import { setStory,updateBoard } from '../store/board.action'
import React, { useState } from 'react'
import moment from 'moment'
import { utilService } from '../services/util.service'
import { storageService } from '../services/async-storage.service'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { ModalUpdatePreview } from './ModalUpdatePreview'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { cloudinaryService } from '../services/cloudinary.service'

export function _ActivityModal(props) {

    const onRemoveStory = async () => {

        const story = {
            boardId: null,
            groupId: null,
            storyId: null
        }
        await props.setStory(story)

    }

    const [img, setImg] = useState({
        imgUrl: null,
        height: '40px',
        width: '100%',
        isUploading: false
    })
    // const dispatch = useDispatch()

    const uploadImg = async (ev) => {  
        setImg({ ...img, isUploading: true, height: 500, width: 500 })
        const { secure_url, height, width } = await cloudinaryService.uploadImg(ev)
        setImg({ isUploading: false, imgUrl: secure_url, height, width })
    }

    // add this to input in render 

    const [isActivityShown, setActivityToggle] = useState(null)
    const [comment, setComment] = useState('')

    const { selectedStoryIds, boards, selectedBoard } = props
    const { boardId, groupId, storyId } = selectedStoryIds

    const getStory = () => {
        if (!boardId) return null
        const boardIdx = boards.findIndex((board) => board._id === boardId)
        const groupIdx = boards[boardIdx].groups.findIndex((group) => group.id === groupId)
        const storyIdx = boards[boardIdx].groups[groupIdx].stories.findIndex((story) => story.id === storyId)
        const story = boards[boardIdx].groups[groupIdx].stories[storyIdx]
        return story

    }

    let story = getStory()

    const getInitials = (fullname) => {
        const nameArr = fullname.split(' ');
        const fName = nameArr[0].split('');
        const lName = nameArr[1].split('');
        const initials = fName[0] + lName[0];
        return initials
    }

    const onAddComment = (ev) => {   
        ev.preventDefault()
        if(!comment&&!img.imgUrl) return
        const newComment = {
            id: utilService.makeId(),
            txt: comment,
            imgUrl: img.imgUrl,
            createdAt: Date.now(),
            //change to logged in user
            byMember: storageService.user(),
            groupId: groupId,
            storyId: story.id
        }
        story.comments.unshift(newComment)
        onUpdateStory(story)
        setComment('')
        setImg({ ...img, imgUrl: null, height: '40px', width: '40px' })
    }

    const getCurrStory = (commentId) => {
        let story
        props.board.groups.forEach(group => {
            group.stories.forEach(currStory => {
                currStory.comments.forEach(comment => {
                    if (comment.id === commentId && comment.storyId === currStory.id) {
                        story = currStory
                    }
                })
            })
        })
        return story
    }

    const onRemoveComment = (comment) => {
        if (!story) {
            story = getCurrStory(comment.id)
        }
        const commentId = comment.id
        const commentIdx = story.comments.findIndex(comment => comment.id === commentId)
        story.comments.splice(commentIdx, 1)
        onUpdateStory(story, comment.groupId)
    }

    const onUpdateStory = (updatedStory, currGroupId = null) => {
        const newBoard = { ...selectedBoard }
        if (!currGroupId) currGroupId = groupId
        
        const groupIdx = newBoard.groups.findIndex(group => group.id === currGroupId)
        
        const group = newBoard.groups.find(group => group.id === currGroupId)
        const storyIdx = group.stories.findIndex(story => story.id === storyId)
        newBoard.groups[groupIdx].stories.splice(storyIdx, 1, updatedStory)
        props.updateBoard(newBoard)
        //  await socketService.emit('comment was added', newBoard._id);
    }

    const handleChange = ({ target }) => {
        const { value } = target
        if(value===' '||value==='\n') return
        setComment(value)
    }

    
    // activites to new cmp
    if(!story) return <React.Fragment></React.Fragment>
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

            {!isActivityShown &&
                <React.Fragment>
                        <div className="update-input" >
                            <textarea name="update" id="" cols="30" rows="2" placeholder='Write an update...' value={comment} onChange={handleChange}></textarea>
                            {img.imgUrl&& <img src={img.imgUrl}  />}
                            <div className='modal-update-btns' ><div className='file-input-container'>
                                <AttachFileIcon className='file-icon' /><input className='file-input' type="file" accept='img/*' onChange={uploadImg} />Add file</div>
                                <button  onClick={(ev)=>onAddComment(ev)}>Update</button>
                            </div>
                        </div>
                    <div className='updates-list' >
                    {story.comments.map(comment => <ModalUpdatePreview key={comment.id} comment={comment} onRemoveComment={onRemoveComment} getInitials={getInitials} imgUrl={comment.imgUrl}/>)}
                    </div>
                </React.Fragment>}
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
    setStory,
    updateBoard
    // loadBoards,
    // getById,
}



export const ActivityModal = connect(mapStateToProps, mapDispatchToProps)(_ActivityModal)