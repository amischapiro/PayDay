import { ClickAwayListener } from "@mui/base"

export const UserProfileModal = ({ isProfileModalOpen, toggleProfileModal, currUser, img, uploadImg }) => {

    return (
        <ClickAwayListener onClickAway={() => toggleProfileModal(false)} >
            <div className={`user-profile-modal ${isProfileModalOpen ? 'open' : ''}`}>
                <span className='fa-solid times' onClick={() => toggleProfileModal(false)}></span>
                <div>Username: {currUser.fullname}</div>
                <hr />
                <span>Add a photo of you:</span>
                <div className='profile-flex-container'>
                    <div><input type="file" accept='img/*' onChange={uploadImg} /></div>
                    <div className='profile-img-container'>
                        {img.imgUrl ? <img src={img.imgUrl} alt="" /> : ''}
                    </div>
                    <button onClick={() => toggleProfileModal(false)}>Done</button>
                </div>
            </div>
        </ClickAwayListener>
    )
}