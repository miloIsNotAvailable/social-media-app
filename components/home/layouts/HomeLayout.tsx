import { FC } from 'react'
import { styles } from '../styles'
import { BottomNavbar, DefaultNavbar, SwitchNavbar } from '@globals/Navbars'
import NavRoute from '@globals/NavRoute'

interface HomeLayoutProps {
    children: JSX.Element | JSX.Element[] | string
}

const HomeLayout: FC<HomeLayoutProps> = ( { children } ) => {

    return (
        <div className={ styles.home_layout }>
            <DefaultNavbar/>
            <SwitchNavbar>
                <NavRoute link={ "home/for-you" }/>
                <NavRoute link={ "home/discover" }/>
            </SwitchNavbar>
            { children }
            <BottomNavbar/>
        </div>
    )
}

export default HomeLayout