import {connect} from 'react-redux'

function _Story(){
    // map of stories

    return (
        <section>
        <h1>Story</h1>
        </section>
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



export const Story = connect(mapStateToProps, mapDispatchToProps)(_Story)