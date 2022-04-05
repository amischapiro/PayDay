import React, { useEffect, useState } from 'react'
import Logo from '../assets/img/PayDayLogo3.png'
import groupImg from '../assets/img/group.png'
import dashboardImg from '../assets/img/dashboard.png'
import connectionsImg from '../assets/img/connections.jpg'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loginDemoUser, logout } from '../store/user.action'
import { loadBoards } from '../store/board.action'


export function HomePage() {

    const { loggedinUser } = useSelector(({ userModule }) => userModule)
    const { boards } = useSelector(({ boardModule }) => boardModule)
    const dispatch = useDispatch()

    const [isDemoUser, setIsDemoUser] = useState(loggedinUser?._id === '1f23sd1f5w5')

    const history = useHistory()
    const boardId = boards[0]?._id

    const initialLogin = async () => {
        const demoUser = {
            _id: '1f23sd1f5w5',
            fullname: 'Demo User',
            imgUrl: 'https://res.cloudinary.com/diu2bzkko/image/upload/v1643708386/ow4e6tx6ckciayqgvenb.jpg',
            createdAt: 1000204217
        }
        await dispatch(loginDemoUser(demoUser))
    }

    useEffect(() => {
        (async () => {
            await dispatch(loadBoards())
            if (!loggedinUser) {
                await initialLogin()
                setIsDemoUser(true)
            }
        })();
        // eslint-disable-next-line
    }, [loggedinUser])

    const onSignupLogin = () => {
        history.push('/login')
    }


    const onEnterBoard = () => {
        history.push(`/board/${boardId}/board`)
    }

    const onLogout = async () => {
        await dispatch(logout())
        setIsDemoUser(true)
    }


    return (
        <main>
            <section className='home-page'>

                <div className="connections-img-container">
                    <div className="connections-img">
                        <img src={connectionsImg} alt="" />
                    </div>
                    <div className='name-links-container'>
                        <div className='home-name' >
                            <img src={Logo} alt="" />
                            <h1>ayDay</h1>
                        </div>
                        <div className='links-container'>
                            {isDemoUser ? (
                                <>
                                    <div onClick={onSignupLogin}>Sign Up / Sign In</div>
                                    <div onClick={onEnterBoard}>Demo Mode</div>
                                </>
                            ) : (
                                <>
                                    <div onClick={onLogout}>Logout</div>
                                    <div onClick={onEnterBoard}>Enter Boards</div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className='group-img-container'>
                    <div className="group-img"><img src={groupImg} alt="" /></div>
                    <div className="group-txt">Create customized groups and stories to manage your projects</div>
                </div>
                <div className="dashboard-img-container">
                    <div className='dashboard-txt'>
                        Check out statistics on the boards you created
                    </div>
                    <div className='dashboard-img'><img src={dashboardImg} alt="" /> </div>
                </div>



            </section>
        </main>
    )
}