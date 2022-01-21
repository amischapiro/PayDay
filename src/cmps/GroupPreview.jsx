import { connect } from 'react-redux'

import { StoryList } from './StoryList'



function _GroupPreview(props) {

    const { board } = props
    const { group } = props

    
    return (
        <div className="group-preview">

            <h4>{group.title}</h4>
            <StoryList board={board} group={group} />
        </div>
    )
}

function mapStateToProps({ boardModule }) {
    return {
    }
}

const mapDispatchToProps = {

}



export const GroupPreview = connect(mapStateToProps, mapDispatchToProps)(_GroupPreview)