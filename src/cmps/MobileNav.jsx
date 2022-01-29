import { useState } from "react"
import { NavLink } from "react-router-dom"

export function MobileNav({selectedBoard,boards}){
    const [isNavOpen,toggleNav]=useState(null)

    const onToggleNav=()=>{
        if(isNavOpen){
            toggleNav(false)
            return
        }
        if(!isNavOpen){
            toggleNav(true)
            return
        }
    }

    return <nav className={`mobile-nav ${isNavOpen?'nav-active':''}`}>
        <div className="nav-logo">
            <h4>Payday</h4>
        </div>
        <ul className={`nav-links ${isNavOpen?'open':''}`}>
            <li onClick={onToggleNav} key="mnav-1"><NavLink className='mobile-link' exact to={'/board'}>Home</NavLink></li>
            <li onClick={onToggleNav} key="mnav-2"><NavLink className='mobile-link' to={`/board/${selectedBoard._id}/kanban`}>Kanban</NavLink></li>
            <li onClick={onToggleNav} key="mnav-3"><NavLink className='mobile-link' to={`/board/${selectedBoard._id}/dashboard`}>Dashboard</NavLink></li>
            <span>boards:</span>
            {/* <li><NavLink className='mobile-link' to={`/board/${selectedBoard._id}/board`}>Current Board</NavLink></li> */}
            {boards.map((board, idx)=>{
               return  <li onClick={onToggleNav} key={idx}><NavLink className='mobile-link' to={`/board/${board._id}/board`}>{board.title}</NavLink></li>
            })}
        </ul>
        <div className={`burger ${isNavOpen?'toggle':''}`} onClick={onToggleNav}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
        </div>
    </nav>
}