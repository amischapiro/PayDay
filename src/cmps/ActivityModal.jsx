import { connect } from 'react-redux'
import { setIsOpen } from '../store/board.action'

export function _ActivityModal(props) {

    return (
        <div className={`activity-modal ${props.isOpen ? 'open' : ''}`}>
            <button onClick={() => { setIsOpen(false) }} className="btn-close-modal fa-solid times" ></button>
            <div className="modal-story-name">
                <h3>Story name</h3>
            </div>
            <div className="update-activity-container">
                <div className="modal-updates">Updates</div>
                <div className="horiz-break-line"></div>
                <div className="modal-activity">Activity Log</div>
            </div>
            <div className="modal-break-line"></div>
            
            <div className="update-input" >
                <input type="text" placeholder="Write an update..." />
            </div>
        </div>
    )
}


function mapStateToProps({ boardModule }) {
    return {
        // boards: boardModule.boards,
        // board: boardModule.selectedBoard,
        isOpen:boardModule.activityModalIsOpen
        // filterBy: state.boardModule.filterBy,
        // users: state.userModule.users,
        // loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps = {
    setIsOpen
    // loadBoards,
    // getById,
}



export const ActivityModal = connect(mapStateToProps, mapDispatchToProps)(_ActivityModal)