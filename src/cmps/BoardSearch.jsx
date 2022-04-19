import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFilterBy } from '../store/board.action';

export const BoardSearch = () => {

    const { filterBy } = useSelector(({ boardModule }) => boardModule)
    const dispatch = useDispatch()

    const [txt, setTxt] = useState(filterBy?.name || '')
    const [isSearchOpen, setSearchOpen] = useState(false);

    useEffect(() => {
        if (!txt || txt === '') dispatch(setFilterBy(null))
        else dispatch(setFilterBy({ name: txt }))
    }, [txt, dispatch])

    const handleChange = async ({ target }) => {
        const { value } = target
        setTxt(value)
    }

    return (
        <div
            onClick={() => setSearchOpen(true)}
            className={isSearchOpen ? 'search-bar open' : 'search-bar'}>
            <span className="fa-solid search"></span>
            {!isSearchOpen && <span className="actions-text">Search</span>}
            {isSearchOpen && (
                <input
                    type="text"
                    value={txt}
                    onChange={handleChange}
                    placeholder="Search"
                    onBlur={() => { setSearchOpen(false) }}
                    autoFocus={true}
                />
            )}
        </div>
    )
}
