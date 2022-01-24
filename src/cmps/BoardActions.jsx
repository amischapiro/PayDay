import React, { useEffect, useState } from "react"
import { connect } from "react-redux"

function _BoardActions({ board, updateBoard }) {

    const [isSearchOpen, setSearchOpen] = useState(false)

    return (
        <div className="board-actions">
            <div className='main-actions'>

                <div className="new-story">
                    <span>New Story</span>
                    <span className="fa-solid chevron-down"></span>
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