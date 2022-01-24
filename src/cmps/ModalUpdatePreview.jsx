import React from "react"
import moment from "moment"



export const ModalUpdatePreview = ({comment, onRemoveComment,getInitials })=>{

    return (
        <div className="update-preview">
            <div className="flex space-between" >
                <div className="member flex justify-center align-center" >
                {/* <span><Avatar alt={comment.byMember.username} src={comment.byMember.imgUrl} style={{ width:'30px', height:'30px', display:'inline-block' }}/></span> */}
                <div className="member-img">{getInitials(comment.byMember.fullname)}</div>
                <span>{comment.byMember.fullname}</span>
                </div>
                <div className="edit">
                <span>{moment(comment.createdAt).fromNow()}</span><span className="fa-solid times" onClick={() => onRemoveComment(comment)}></span>  
                </div>
            </div>
            {comment.txt}
        </div>
    )
}