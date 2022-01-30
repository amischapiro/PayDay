import React from 'react'
import { useState } from 'react'

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


export function FilterMenu({ board, filterBy, setFilterBy }) {


    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const onSetFilter = (filterType, filterValueId) => {
        if (filterType === 'reset') {
            setFilterBy({})
        }
        setFilterBy({ [filterType]: filterValueId })
    }

    const { statuses, priorities } = board
    // console.log(priorities);

    return (
        <React.Fragment>
            <Button
                variant="contained"
                onClick={handleClick}
                className="filter-menu-btn"
            >
                <span className='fa-solid filter' style={{paddingRight: '7px'}}></span>
                <span>Filter</span>
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}>
                <Typography className="drop-down sort-drop-down">
                    <span>
                        {statuses.map(status => {
                            const { id, title, color } = status
                            return <span key={id}
                                onClick={() => { onSetFilter('status', id) }}>
                                <span className="status-color-indicator" style={{ backgroundColor: color }}></span>
                                <span style={{ color }}>{title}</span>

                            </span>
                        })}
                    </span>
                    <span>
                        {priorities.map(priority => {
                            const { id, title, color } = priority
                            return <span key={id}
                                onClick={() => { onSetFilter('priority', id) }}>
                                <span className="priority-color-indicator" style={{ backgroundColor: color }}></span>
                                <span style={{ color }}>{title}</span>

                            </span>
                        })}
                    </span>
                    <span onClick={() => onSetFilter('reset')}>
                        <span className="fa-solid undo"></span>
                        <span>Reset defualt</span>
                    </span>
                </Typography>

            </Popover>
        </React.Fragment>

    )
}



