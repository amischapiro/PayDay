import React, { useEffect, useState } from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import { Input } from '@material-ui/core'
// import SearchIcon from '@material-ui/icons/Search';

export const BoardSearch = ({ board, updateBoard, getById, setFilterBy }) => {

    const newBoard = { ...board }

    const [txt, setTxt] = useState('')
    const [isSearchOpen, setSearchOpen] = useState(false);

    useEffect(() => {
        // props.filterBoard({ txt })
        //  eslint-disable-next-line
        if (!txt || txt === '') setFilterBy({})
        else setFilterBy({ name: txt }) 
        
    }, [txt])

    const handleChange = async ({ target }) => {
        const { value } = target
        setTxt(value)
    }

    // const onClickAway = () => {
    //     props.setIsSearching(false)
    // }

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

    // return (
    //     <form className="board-search fade-in">
    //         <label htmlFor="txt" ></label>
    //         <ClickAwayListener onClickAway={onClickAway}>
    //             <div className="flex align-center">
    //                 <SearchIcon ></SearchIcon>
    //                 <Input
    //                     className="board-search" autoComplete="off" type="text" name="txt" id="txt"
    //                     value={txt} placeholder="Enter here" onChange={handleChange}
    //                     autoFocus />
    //             </div>
    //         </ClickAwayListener>
    //     </form>

    // )
}
