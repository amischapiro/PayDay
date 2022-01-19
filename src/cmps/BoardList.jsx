import {connect} from 'react-redux'


function _BoardList(){

    return (
        <section className='boardlist-container open' >
            <button className='toggle-btn' >^</button>
        <h3>Main workspace</h3>
        <div className='add-board' ><button className='fa-solid plus'></button><span >Add</span> </div>
        <div className='filter-boards'><button className='fa-solid filter'> Filter</button></div>
        <div className='break-line' ></div>
        {/* render boards */}

        </section>
        
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