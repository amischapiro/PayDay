import React from 'react'
import Logo from '../assets/img/PayDayLogo3.png'
import { HomePageHeader } from '../cmps/HomePageHeader'
import { Link } from 'react-router-dom'
import groupImg from '../assets/img/group.png'
import dashboardImg from '../assets/img/dashboard.png'
import connectionsImg from '../assets/img/connections.jpg'



export function HomePage() {

    const demoBoardId = '61f1f52eb1247c7b90bd613a'

    return (
        <main>
            {/* <HomePageHeader /> */}
            <section className='home-container'>
                
                <div className="connections-img-container">
                    <div className="connections-img"><img src={connectionsImg} alt="" /></div>
                    <div className='name-links-container'>
                <div className='home-name' >
                    <img src={Logo} alt="" />
                    <h1>ayDay</h1>
                </div>
                <div className='links-container' >
                    <Link className='login-link' to={'/signup'} >Sign Up / Sign In </Link>
                    <Link className='demo-link' to={`/board/${demoBoardId}/board`}>Demo Mode</Link>
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