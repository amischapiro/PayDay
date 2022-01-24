import React from "react"
import moment from "moment"
import AccessTimeIcon from '@mui/icons-material/AccessTime';




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
                <span><span><AccessTimeIcon/></span>{moment(comment.createdAt).fromNow()}</span>
                </div>
            </div>
            <span className="fa-solid times" onClick={() => onRemoveComment(comment)}></span>  
            <span className="comment-txt" >{comment.txt}</span>
        </div>
    )
}