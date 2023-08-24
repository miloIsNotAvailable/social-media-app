import { FC, lazy } from "react"
import Lazy from "../scenes/Lazy"
const Icon = lazy( () => import( "@globals/Icon" ) )
import { default as Slash } from "../../../imgs/slash.svg" 
import { default as Communities } from "../../../imgs/compas.svg" 
import { default as NewPost } from "../../../imgs/+.svg" 
import { default as SearchCommunityIcon } from "../../../imgs/search.svg" 
// import { default as Search } from "../../../imgs/search.svg" 
import { styles } from "../styles"

const BottomNavbar: FC  = () => {

    const icon_arr = [ 
        { Component: Slash, link: "/home/for-you" }, 
        { Component: Communities, link: "/communities" }, 
        { Component: NewPost, link: "/home/create-post" },
        { Component: SearchCommunityIcon, link: "/home/search" } 
    ]

    return (
        <nav className={ styles.nav_bottom_wrap }>
            { icon_arr.map( ( { Component, link } ) => (
                <a href={ link }>
                    <Lazy>
                        <Icon src={ Component }/>
                    </Lazy>
                </a>
            ) ) }
        </nav>
    )
}

export default BottomNavbar