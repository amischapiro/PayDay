import React, { useEffect, useState } from 'react'
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import { Input } from '@material-ui/core'
// import SearchIcon from '@material-ui/icons/Search';

export const BoardSearch = ({ filterBy, setFilterBy }) => {

    const [txt, setTxt] = useState(filterBy.name || '')
    const [isSearchOpen, setSearchOpen] = useState(false);

    useEffect(() => {
        if (!txt || txt === '') setFilterBy(null)
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
}
