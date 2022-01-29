import React from "react"
import moment from "moment"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ReplyIcon from '@mui/icons-material/Reply';



export const ModalUpdatePreview = ({comment, onRemoveComment,getInitials,imgUrl })=>{

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
            {imgUrl && <img className="uploaded-img" src={imgUrl} alt='img'></img> }
            <div className="update-like-container" >
                <div className="like-update"><span className="fa-solid thumbs-up"></span><span>Like</span></div>
                <div className="comment-update"><span className="fa-solid reply"></span><span>Reply</span></div>

            </div>
        </div>
    )
}