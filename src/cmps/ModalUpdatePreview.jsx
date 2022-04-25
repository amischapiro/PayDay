import React from "react"
import moment from "moment"


export const ModalUpdatePreview = ({ comment, onRemoveComment, getInitials, imgUrl }) => {


    return (
        <div className="update-preview">
            <div className="main-section " >
                <div className="member flex align-center" >
                    <div className='member-img'>
                        {imgUrl ? <img src={imgUrl} alt="" />
                            : getInitials(comment.byMember.fullname)}
                    </div>
                    <span>{comment.byMember.fullname}</span>
                </div>
                <div className="info-and-actions">
                    <span className="fa clock"></span>
                    <span> {moment(comment.createdAt).fromNow()} </span>
                    <span className="fa-solid times" onClick={() => onRemoveComment(comment.id)}></span>
                </div>
                <p className="comment-txt" >{comment.txt}</p>
            </div>
            <div className="update-like-container" >
                <div className="like-update"><span className="fa-solid thumbs-up"></span><span>Like</span></div>
                <div className="comment-update"><span className="fa-solid reply"></span><span>Reply</span></div>
            </div>
        </div>
    )
}