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
            <div className='links-container' >
                <Link className='login-link' to={'/signup'} >Sign Up / Sign In </Link>
                <Link className='demo-link' to={'/'}>Demo Mode</Link>
            </div>



        </section>
        </main>
    )
}