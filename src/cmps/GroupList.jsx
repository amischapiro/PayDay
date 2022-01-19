import { connect } from 'react-redux'
import { StoryList } from '../cmps/StoryList.jsx'


function _GroupList(props) {
    const { board } = props
    const { groups } = board

    return (
        <section>
            <h1>Group List</h1>
            {groups.map(group => {
                return <StoryList key={group.id} board={board}
                    group={group} />
            })}

        </section>
    )
}




function mapStateToProps(state) {
    return {
        // board: state.boardModule.board,
        // filterBy: state.boardModule.filterBy,
        // users: state.userModule.users,
        // loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps = {

}



export const GroupList = connect(mapStateToProps, mapDispatchToProps)(_GroupList)