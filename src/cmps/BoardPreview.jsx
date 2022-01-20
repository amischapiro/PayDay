import React from 'react'
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { useState, useEffect } from 'react'





export function BoardPreview({ board }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isBoardListOpen, toggleBoardList] = useState(true)


    const onToggleBoardListShown = () => {
        console.log('isBoardListOpen:', isBoardListOpen);

        isBoardListOpen ? toggleBoardList(false) : toggleBoardList(true)
    }

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    // const { boards } = props


    return (
        <div className='board-preview' key={board._id} aria-describedby={id} type="button" onClick={handleClick}>
            <div>

                <span className='fa-solid window'></span>
                <span>&nbsp;{board.title}</span>
                <Popper id={id} open={open} anchorEl={anchorEl}>
                    <Box sx={{ marginTop: '0.5rem', border: 0, borderRadius: 2, p: 5, backgroundColor:'white' }}>
                 
                        <div><span className='fa edit-hollow'></span> Edit</div>
                 
                    </Box>
                </Popper>
            </div>
        </div>
    )
}