import {connect} from 'react-redux'


function _BoardList(){

    
    
    return (
        <h1>BoardList</h1>
    )

}





function mapStateToProps(state){
    return {
        // boards: state.workSpaceModule.boards,
    }
}

const mapDispatchToProps ={

}

export const BoardList = connect(mapStateToProps, mapDispatchToProps)(_BoardList)