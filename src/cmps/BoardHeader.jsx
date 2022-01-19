import {connect} from 'react-redux'

function _BoardHeader(){
    return (
        <h1>Header</h1>
    )

}

function mapStateToProps(state){
    return {
        // board: state.boardModule.board,
        // users: state.userModule.users,
        // loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps ={

}


export const BoardHeader = connect(mapStateToProps, mapDispatchToProps)(_BoardHeader)