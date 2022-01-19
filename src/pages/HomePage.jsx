import React from 'react'
import Logo from '../assets/img/PayDayLogo3.png'
import { HomePageHeader } from '../cmps/HomePageHeader'
import { Link } from 'react-router-dom'



export function HomePage(){


    return(
        <main>
            <HomePageHeader />
        <section className='home-container'>
            <div className='home-name' >
                <img src={Logo} alt="" />
                <h1>ayDay</h1>
            </div>
            <div>
                {/* <Link to={'/board/:give specific board Id'}>Demo Mode(Limited access)</Link> */}
                <Link to={'/signup'} >Sign Up / Sign In </Link>
            </div>



        </section>
        </main>
    )
}