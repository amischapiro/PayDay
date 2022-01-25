import React, { useEffect, useState } from 'react'
import { Input } from '@material-ui/core'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import SearchIcon from '@material-ui/icons/Search';

export const BoardSearch = (props) => {

    const [txt, setTxt] = useState('')

    useEffect(() => {
        props.filterBoard({ txt })
        //  eslint-disable-next-line
    }, [txt])

    const handleChange = async (ev) => {
        // const field = ev.target.name
        const value = ev.target.value
        setTxt(value)
        // props.filterBoard({ txt })
    }
    const onClickAway = () => {
        props.setIsSearching(false)
    }
    return (
        <form className="board-search fade-in">
            <label htmlFor="txt" ></label>
            <ClickAwayListener onClickAway={onClickAway}>
                <div className="flex align-center">
                    <SearchIcon ></SearchIcon>
                    <Input
                        className="board-search" autoComplete="off" type="text" name="txt" id="txt"
                        value={txt} placeholder="Enter here" onChange={handleChange}
                        autoFocus />
                </div>
            </ClickAwayListener>
        </form>

    )
}
