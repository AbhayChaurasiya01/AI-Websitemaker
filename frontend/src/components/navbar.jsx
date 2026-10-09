import React from 'react'
import {navbarStyles as s } from '../assets/dummyStyles';
import {logo} from '../assets/ui';

const Navbar = () => {
    return (
        <nav class ={s.root}>
            <div class={s.container}>
                <logo/>

            </div>

        </nav>
    )
}

export default Navbar