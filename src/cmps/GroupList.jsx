import {connect} from 'react-redux'
import {StoryList} from '../cmps/StoryList.jsx'


function _GroupList(){
    return(
        <section>
        <h1>Group List</h1>
        <StoryList />
        </section>
        

    )

}




function mapStateToProps(state){
    return {
        // board: state.boardModule.board,
        // filterBy: state.boardModule.filterBy,
        // users: state.userModule.users,
        // loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps ={

}



export const GroupList = connect(mapStateToProps, mapDispatchToProps)(_GroupList)