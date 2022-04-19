import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";

import GmailLogo from '../assets/img/gmail-icon.png'
import AbodeLogo from '../assets/img/adobe-icon.png'
import { useSelector } from 'react-redux';


export const BoardNav = ({ toggleIsDashboard }) => {

    const [isAnimationOn, setAnimation] = useState(false)
    const [isInegrateHoverOn, setIntegrateHover] = useState(false)
    const { selectedBoard: board } = useSelector(({ boardModule }) => boardModule)

    let timeoutId;
    const onSetAnimation = () => {
        setAnimation(true)
        timeoutId = setTimeout(() => {
            clearInterval(timeoutId)
            setAnimation(false)
        }, 1000)
    }

    useEffect(() => {


        return () => {
            clearInterval(timeoutId)
        }
    }, [timeoutId]);


    return (
        <div className='board-nav'>

            <div className='navs-container'>
                <NavLink activeClassName="my-active" exact to={`/board/${board._id}/board`} onClick={() => toggleIsDashboard(false)}> <span className='fa-solid home'></span> Main Table</NavLink>
                <NavLink activeClassName="my-active" to={`/board/${board._id}/kanban`}> <span className='fa list-alt'></span> Kanban</NavLink>
                <NavLink activeClassName="my-active" to={`/board/${board._id}/dashboard`} onClick={() => toggleIsDashboard(true)}> <span className='fa chart-bar'></span> Dashboard</NavLink>
            </div>

            <div className='actions-container'>
                <div onMouseEnter={() => { setIntegrateHover(true) }}
                    onMouseLeave={() => { setIntegrateHover(false) }}
                    className={isInegrateHoverOn ? 'integrate hover' : 'integrate'}>
                    <span className='fa-solid plug'></span> <span className='txt'>Integrate</span>
                    <img src={GmailLogo} alt="Gmail Logo" />
                    <img src={AbodeLogo} alt="Abobe Logo" />
                </div>
                <div><span className='fa-solid robot'></span> Automate</div>
                <button onMouseEnter={onSetAnimation} className='btn-collapse'>
                    <span className={isAnimationOn ? 'fa-solid chevron-up animation' : 'fa-solid chevron-up'}></span></button>
            </div>
        </div>
    )

}


