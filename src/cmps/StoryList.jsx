import { connect } from 'react-redux'
import { Story } from '../cmps/Story'

function _StoryList(props) {
    const { board, group } = props
    const { stories } = group

    return (
        <section>
            <h1>Story List</h1>
            {stories.map(story => {
                return <Story key={story.id} story={story} board={board} />
            })}

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