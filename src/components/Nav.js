import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav () {
    return (
        <nav className='nav'>
            <ul>
                <li>
                    <NavLink to='/' exact activeClassName='active'>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/leaderboard' activeClassName='active'>
                        Leader Board
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/add' activeClassName='active'>
                        New Pole
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}


//adding the login verification. authoirization verification
//adding what the user chose when voted to be shown clearly
//404