import { FC, lazy } from "react"
import Lazy from "../scenes/Lazy"
const Icon = lazy( () => import( "@globals/Icon" ) )
import { default as Slash } from "../../../imgs/slash.svg" 
import { default as Communities } from "../../../imgs/compas.svg" 
import { default as NewPost } from "../../../imgs/+.svg" 
// import { default as Search } from "../../../imgs/search.svg" 
import { styles } from "../styles"

const BottomNavbar: FC  = () => {

    const icon_arr = [ Slash, Communities, NewPost ]

    return (
        <nav className={ styles.nav_bottom_wrap }>
            { icon_arr.map( ( Component ) => (
                <Lazy>
                    <Icon src={ Component }/>
                </Lazy>
            ) ) }
        </nav>
    )
}

export default BottomNavbar