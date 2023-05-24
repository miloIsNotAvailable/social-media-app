import { FC } from 'react'
import Navbar from '../../Navbar/build/Navbar'
import { Outlet } from 'react-router-dom'
import { styles } from '../styles'

const Home: FC = () => {

    return (
        <div className={ styles.home_wrap }>
            <Navbar/>
            <Outlet/>
        </div>
    )
}

export default Home