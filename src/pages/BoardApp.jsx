import {SideBar} from '../cmps/SideBar.jsx'
import {BoardList} from '../cmps/BoardList.jsx'
import {BoardArea} from '../cmps/BoardArea.jsx'
import {connect} from 'react-redux'




 function _BoardApp(){






    return(
        <main className='main-container'>
            <SideBar />
            <BoardList />
            <BoardArea />

        </main>
    )
}


function mapStateToProps(state){
    return {
        // boards: state.workSpaceModule.boards,
        // board: state.boardModule.board,
        // filterBy: state.boardModule.filterBy,
        // users: state.userModule.users,
        // loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps ={

}



export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)