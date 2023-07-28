import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { styles } from '../styles'
import HomeLayout from '../layouts/HomeLayout'

const Home: FC = () => {

    return (
        <HomeLayout>
            <Outlet/>
        </HomeLayout>
    )
}

export default Home