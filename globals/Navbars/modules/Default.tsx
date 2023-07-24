import { FC, lazy } from 'react'
import Lazy from '../scenes/Lazy'
import NavRoute from '@globals/NavRoute'
import { useLocation } from 'react-router-dom'
import { styles } from '../styles'
const Profile = lazy( () => import( "@globals/Profile" ) )
const Menu = lazy( () => import( "../scenes/Menu" ) )

const Navbar: FC = () => {

    const { pathname } = useLocation()
    
    return (
        <nav className={ styles.top_nav_wrap }>
            <Lazy Component={ Menu }/>
            <NavRoute
                // replace only the first /
                link={ pathname.replace( /\//, "" ) }
                to={ pathname.replace( /\//, "" ) }
            />
            <Lazy Component={ Profile }/>
        </nav>
    )
}

export default Navbar