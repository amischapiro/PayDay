import { connect } from 'react-redux'

function _BoardHeader({ board }) {

    return (
        <h3>{board.title}</h3>
    )
}

function mapStateToProps(state) {
    return {
        // board: state.boardModule.board,
        // users: state.userModule.users,
        // loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps = {

}


export const BoardHeader = connect(mapStateToProps, mapDispatchToProps)(_BoardHeader)