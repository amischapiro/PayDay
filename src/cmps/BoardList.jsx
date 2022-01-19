import { connect } from 'react-redux'
import React from 'react'
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';





function _BoardList() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <section className='boardlist-container open' >
            <button className='toggle-btn' >^</button>
            <button className='workspace-toggle' aria-describedby={id} type="button" onClick={handleClick}>
                <h2>Main workspace <span className={`fa-solid ${open ?'angleup':'angledown'} `} ></span> </h2>
            </button>
            <Popper id={id} open={open} anchorEl={anchorEl}>
                <Box sx={{ border: 0,borderRadius:2, p: 5, bgcolor: 'white' }}>
                    <h3>My workspaces</h3>
                    <h5>Main workspace</h5>
                </Box>
            </Popper>
            <div className='add-board' ><span className='fa-solid plus'></span><span> Add</span> </div>
            <div className='filter-boards'><span className='fa-solid filter'></span><span> Filter</span></div>
            <div className='break-line' ></div>
            {/* render boards */}

        </section>

    )

}





function mapStateToProps(state) {
    return {
        // boards: state.workSpaceModule.boards,
    }
}

const mapDispatchToProps = {

}

export const BoardList = connect(mapStateToProps, mapDispatchToProps)(_BoardList)