import React, { useEffect, useState } from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import { Input } from '@material-ui/core'
// import SearchIcon from '@material-ui/icons/Search';

export const BoardSearch = ({ board, updateBoard, getById }) => {

    const newBoard = { ...board }

    const [txt, setTxt] = useState('')
    const [isSearchOpen, setSearchOpen] = useState(false);

    useEffect(async () => {
        if (!txt) newBoard.filterBy = {}
        else newBoard.filterBy = { name: txt }
        
        await updateBoard(newBoard)
        // await getById(board._id)
    }, [txt])



    const handleChange = async ({ target }) => {
        const { value } = target
        setTxt(value)
    }


    return (
        <div
            onClick={() => setSearchOpen(true)}
            className={isSearchOpen ? 'search-bar open' : 'search-bar'}>
            <span className="fa-solid search"></span>
            {!isSearchOpen && <span>Search</span>}
            {isSearchOpen && (
                <input
                    type="text"
                    value={txt}
                    onChange={handleChange}
                    placeholder="Search"
                    onBlur={() => setSearchOpen(false)}
                    autoFocus={true}
                />
            )}
        </div>
    )

}
