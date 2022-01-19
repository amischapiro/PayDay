import { connect } from 'react-redux'
import { Story } from '../cmps/Story'

function _StoryList() {
    // map of lists

    return (
        <section>
            <h1>Story List</h1>
            <Story />
        </section>
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



export const StoryList = connect(mapStateToProps, mapDispatchToProps)(_StoryList)