import React from 'react'
import { useState } from 'react'

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { setFilterBy } from '../../store/board.action';
import { useDispatch } from 'react-redux';

export function PersonMenu({ members }) {

    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const getInitials = (member) => {
        const nameArr = member.fullname.split(' ');
        const fName = nameArr[0].split('');
        const lName = nameArr[1].split('');
        const initials = fName[0] + lName[0];
        return initials
    }

    const onSetFilter = (filterType, filterValueId) => {
        handleClose()
        if (filterType === 'reset') dispatch(setFilterBy(null))
        else dispatch(setFilterBy({ [filterType]: filterValueId }))
    }

    return (
        <React.Fragment>
            <Button
                variant="contained"
                onClick={handleClick}
                className="person-menu-btn"
            >
                <span className="fa user"></span>
                <span className="actions-text">Person</span>
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
                <Typography className="drop-down members-menu">
                    <React.Fragment>
                        {members.map(member => {
                            const { _id, imgUrl, fullname } = member
                            return (
                                <span className="member-details" key={`${_id}details`}
                                    onClick={() => onSetFilter('members', _id)}  >
                                    <span className="member-img" key={`${_id}img`}>
                                        {member.imgUrl ? (
                                            <img src={imgUrl} alt="" />
                                        ) : (
                                            getInitials(member)
                                        )}
                                    </span>
                                    <span>{fullname}</span>
                                </span>
                            )
                        })}
                        <span onClick={() => onSetFilter('reset')}>
                            <span>
                                <span className="fa-solid undo"></span>
                                <span>Reset defualt</span>
                            </span>
                        </span>
                    </React.Fragment>
                </Typography>

            </Popover>
        </React.Fragment>

    )
}



