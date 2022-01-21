import { connect } from 'react-redux'
import { NavLink } from "react-router-dom";

// MIU icons

import ViewKanbanOutlinedIcon from '@mui/icons-material/ViewKanbanOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';


function _BoardNav() {



    return (
        <div className='board-nav'>

            <div className='navs-container'>
                <NavLink activeClassName="my-active" exact to="#"> <span className='fa-solid home'></span> Main Table</NavLink>
                <NavLink activeClassName="my-active" to="#"> <span className='fa list-alt'></span> Kanban</NavLink>
                <NavLink activeClassName="my-active" to="#"> <span className='fa chart-bar'></span> Dashboard</NavLink>


            </div>

            <div className='actions-container'>
                <div><span className='fa-solid plug'></span> Integrate</div>
                <div><span className='fa-solid robot'></span> Automate</div>
                <button className='btn-collapse'></button>
            </div>
        </div>
    )

}

//  <ViewKanbanOutlinedIcon className='btn-kanban' />
{/* <AnalyticsOutlinedIcon className='btn-dashboard' />  */ }



function mapStateToProps({ boardModule }) {
    return {
    }
}

const mapDispatchToProps = {

}



export const BoardNav = connect(mapStateToProps, mapDispatchToProps)(_BoardNav)