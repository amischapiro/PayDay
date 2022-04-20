import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { utilService } from '../services/util.service'
import { userService } from '../services/user.service'
import { ModalUpdatePreview } from './ModalUpdatePreview'
import { cloudinaryService } from '../services/cloudinary.service'

import ActivitySvg from '../assets/img/activity-log.svg'
import { loadActivities, fetchLastActivity, toggleBoardActivityModal } from '../store/activity.action'
import { socketService } from '../services/socket.service'
import { boardService } from '../services/board.service'
import { ActivityList } from './ActivityList'


export function ActivityModal({ updateBoard }) {


    const [isActivityShown, setActivityToggle] = useState(null)
    const [comment, setComment] = useState('')
    const [isUpdateFocused, setUpdateFocus] = useState(false)
    const [img, setImg] = useState({
        imgUrl: null,
        height: '40px',
        width: '100%',
        isUploading: false
    })

    const { activities, isOpen, selectedStoryIds, isPerStory } = useSelector(({ activityModule }) => activityModule)
    const { selectedBoard } = useSelector(({ boardModule }) => boardModule)
    const dispatch = useDispatch()

    const { groupId, storyId } = selectedStoryIds

    const { groupIdx } = boardService.getGroupAndIdx(selectedBoard, groupId)
    const { storyIdx, story } = boardService.getStoryAndIdx(selectedBoard, groupIdx, storyId)

    // useEffect(() => {
    //     dispatch({ type: 'RESET_ACTIVITIES' })
    //     dispatch(loadActivities())
    // }, [dispatch, selectedBoard._id, selectedStoryIds.storyId])


    // useEffect(() => {
    //     socketService.on('board has updated', () => {
    //         dispatch(fetchLastActivity())
    //     })
    //     return () => {
    //         socketService.off('board has updated')
    //     }
    // }, [dispatch])

    useEffect(() => {
        if (!isUpdateFocused) setComment('')
    }, [isUpdateFocused])


    const uploadImg = async (ev) => {
        setImg({ ...img, isUploading: true, height: 500, width: 500 })
        const { secure_url, height, width } = await cloudinaryService.uploadImg(ev)
        setImg({ isUploading: false, imgUrl: secure_url, height, width })
    }

    const getInitials = (fullname) => {
        const nameArr = fullname.split(' ');
        const fName = nameArr[0].split('');
        const lName = nameArr[1].split('');
        const initials = fName[0] + lName[0];
        return initials
    }

    const onAddComment = () => {
        setUpdateFocus(false)
        if (!comment && !img.imgUrl) return
        const newComment = {
            id: utilService.makeId(),
            txt: comment,
            imgUrl: img.imgUrl,
            createdAt: Date.now(),
            byMember: userService.getMiniLoggedInUser(),
            groupId,
            storyId
        }
        story.comments.unshift(newComment)
        onUpdateStory(story)
        setComment('')
        setImg({ ...img, imgUrl: null, height: '40px', width: '40px' })
    }


    const onRemoveComment = (commentId) => {
        const commentIdx = story.comments.findIndex(comment => comment.id === commentId)
        story.comments.splice(commentIdx, 1)
        onUpdateStory(story)
    }

    const onUpdateStory = (updatedStory) => {
        const newBoard = { ...selectedBoard }
        newBoard.groups[groupIdx].stories.splice(storyIdx, 1, updatedStory)
        updateBoard(newBoard)
    }

    const handleChange = ({ target }) => {
        const { value } = target
        if (value === ' ' || value === '\n') return
        setComment(value)
    }


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


    return (
        <>
            <div
                className={`darken-screen ${isOpen ? 'open' : ''}`}
                onClick={() => dispatch(toggleBoardActivityModal())}
            >
            </div>
            <div className={`activity-modal ${isOpen ? 'open' : ''}`}>

                <div className="top-section">
                    <button onClick={() => dispatch(toggleBoardActivityModal())} className="btn-close-modal fa-solid times" ></button>

                    {isPerStory && <h3> {story.title}</h3>}

                    <div className="update-activity-container">
                        {isPerStory &&
                            <>
                                <div>
                                    <div onClick={() => setActivityToggle(false)} className='modal-updates'>Updates</div>
                                    <div className={`modal-border-bottom ${!isActivityShown ? 'active' : ''}`} ></div>
                                </div>
                                <div className="horiz-break-line"></div>
                            </>
                        }
                        <div>
                            <div onClick={() => setActivityToggle(true)} className='modal-activity'>Activity Log</div>
                            <div className={`modal-border-bottom ${isActivityShown ? 'active' : ''}`} ></div>
                        </div>
                    </div>
                </div>

                <div className="modal-break-line"></div>

                <div className="bottom-section">
                    {!isActivityShown && isPerStory && (
                        <>
                            <div className="update-input">
                                {!isUpdateFocused ? (
                                    <input type="text" placeholder='Write an update...' onClick={() => setUpdateFocus(true)} />
                                ) : (
                                    <textarea name="update" className={isUpdateFocused ? "open" : ""} value={comment} onChange={handleChange}
                                        autoFocus={true}  >
                                    </textarea>
                                )}
                                {img.imgUrl && <img src={img.imgUrl} alt="" />}

                                <div className='modal-update-btns' >
                                    <div className='file-input-container'>
                                        <span className="fa-solid plus"></span>
                                        <input className='file-input' type="file" accept='img/*' onChange={uploadImg} />
                                        <span>Add file</span>
                                    </div>
                                    <div>
                                        <button className="btn-cancel" onClick={() => setUpdateFocus(false)}>Cancel</button>
                                        <button className="btn-update" onClick={onAddComment} >Update</button>
                                    </div>
                                </div>
                            </div>
                            <div className='updates-list' >
                                {story.comments.map(comment => {
                                    return <ModalUpdatePreview key={comment.id} comment={comment}
                                        onRemoveComment={onRemoveComment} getInitials={getInitials}
                                        imgUrl={comment.byMember.imgUrl} />
                                }
                                )}
                                {!story.comments.length && (
                                    <div className="logo-container">
                                        <img src={ActivitySvg} alt="" />
                                        <span>No updates yet for this item</span>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                    {(!isPerStory || isActivityShown) && (
                        <ActivityList
                            selectedBoard={selectedBoard}
                            activities={activities}
                            selectedStoryIds={selectedStoryIds}
                            getInitials={getInitials}
                            isPerStory={isPerStory}
                        />
                    )}
                </div>
            </div >
        </>
    )
}
