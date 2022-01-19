import {connect} from 'react-redux'


function _BoardActions(){
    return(
        <h1>Board Actions</h1>
    )

}





function mapStateToProps(state){
    return {
        // filterBy: state.boardModule.filterBy,
    }
}

const mapDispatchToProps ={

}



export const BoardActions = connect(mapStateToProps, mapDispatchToProps)(_BoardActions)