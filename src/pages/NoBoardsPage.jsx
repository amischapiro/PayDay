import { utilService } from "../services/util.service"
import { socketService } from "../services/socket.service"
import { SideBar } from "../cmps/SideBar"
import { BoardList } from "../cmps/BoardList"
import { ReactComponent as NoBoardIcon } from '../assets/img/no-boards.svg'
import { useHistory, Link } from "react-router-dom"
import Logo from '../assets/img/PayDayLogo3.png';

export const NoBoardsPage = ({ boards, selectedBoard, removeBoard, addBoard, loadBoards }) => {

    const history = useHistory()

    const onAddBoard = async () => {
        const newBoard = await utilService.createEmptyBoard()
        await addBoard(newBoard)
        socketService.emit('update workspace')
    }

    console.log('on no board page');

    return (
        <div className="main-container">
            <SideBar />
            <BoardList
                boards={boards} selectedBoard={selectedBoard} removeBoard={removeBoard}
                addBoard={addBoard} loadBoards={loadBoards}
            />
            <div className="no-boards-page">
                <nav >
                    <Link className='back-home-link' to='/'>
                        <img src={Logo} alt="PD" /><span>ayDay</span>
                    </Link>
                </nav>
                <div className="container">
                    <NoBoardIcon className="svg" />
                    <p>You have no boards yet </p>
                    <button className="btn-add-board" onClick={onAddBoard}>
                        <span className="fa-solid plus"></span>
                        <span>Add Board</span>
                    </button>
                </div>
            </div >
        </div >
    )
}
