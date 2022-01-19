import {SideBar} from '../cmps/SideBar'




 function _BoardApp(){






    return(
        <main>
            <SideBar />
        </main>
    )
}


function mapStateToProps(state){
    return {
        // boards: state.workSpaceModule.boards,
        board: state.boardModule.board,
        filterBy: state.boardModule.filterBy,
        users: state.userModule.users,
        loggedInUser: state.userModule.loggedInUser
    }
}

// const mapDispatchToProps ={

// }



export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)