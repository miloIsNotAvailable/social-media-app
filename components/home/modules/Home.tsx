import { FC } from 'react'
import Navbar from '../../Navbar/build/Navbar'
import { Outlet } from 'react-router-dom'
import { styles } from '../styles'
import TopNavbar from '../navbars/TopNavbar'

const Home: FC = () => {

    return (
        <div className={ styles.home_wrap }>
            <TopNavbar/>
            <Outlet/>
        </div>
    )
}

export default Home