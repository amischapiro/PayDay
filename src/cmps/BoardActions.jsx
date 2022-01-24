import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { utilService } from '../services/util.service'

import { NewStoryMenu } from './menus/NewStoryMenu'

function _BoardActions({ board, updateBoard }) {

    const [isSearchOpen, setSearchOpen] = useState(false)

    const onAddStory = async () => {
        const newStory = utilService.createStory();
        const newBoard = { ...board };

        if (
            !newBoard.groups[0].stories ||
            !newBoard.groups[0].stories.length
        )
            newBoard.groups[0].stories = [newStory];
        else
            newBoard.groups[0].stories.unshift(newStory)

        await updateBoard(newBoard);
    }

    const onAddGroup = async () => {
        const newGroup = utilService.createEmptyGroup();
        const newBoard = { ...board };

        if (
            !newBoard.groups ||
            !newBoard.groups.length
        )
            newBoard.groups = [newGroup];
        else
            newBoard.groups.unshift(newGroup)

        await updateBoard(newBoard);
    }

    return (
        <div className="board-actions">
            <div className='main-actions'>
                <div className="new-story">
                    <span onClick={onAddStory}>New Story</span>
                    <NewStoryMenu board={board} updateBoard={updateBoard}
                        onAddGroup={onAddGroup} onAddStory={onAddStory} />
                </div>

                <div onClick={() => setSearchOpen(true)}
                    className={isSearchOpen ? 'search-bar open' : 'search-bar'}>
                    <span className="fa-solid search"></span>
                    {!isSearchOpen && <span>Search</span>}
                    {isSearchOpen && (
                        <input type="text" placeholder="Search"
                            onBlur={() => setSearchOpen(false)} autoFocus={true}
                        />
                    )}
                </div>

                <div>
                    <span className="fa user"></span>
                    <span>Person</span>
                </div>
                <div className="filter">
                    <span className="fa-solid filter"></span>
                    <span>Filter</span>
                    <span className="fa-solid chevron-down"></span>
                </div>
            </div>
        </div>
    )

}





function mapStateToProps(state) {
    return {
        // filterBy: state.boardModule.filterBy,
    }
}

const mapDispatchToProps = {

}



export const BoardActions = connect(mapStateToProps, mapDispatchToProps)(_BoardActions)