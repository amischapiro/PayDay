import { useState } from "react"


export function MobileNav(){
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
            <li><a href="#">Home</a></li>
            <li><a href="#">Kanban</a></li>
            <li><a href="#">dashboard</a></li>
        </ul>
        <div className={`burger ${isNavOpen?'toggle':''}`} onClick={onToggleNav}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
        </div>
    </nav>
}