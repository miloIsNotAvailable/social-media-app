import { Loading } from "@globals/Fallback";
import NavRoute from "@globals/NavRoute";
import { FC, Suspense, lazy } from "react";
import { styles } from "../styles";
import { useLocation } from "react-router-dom";

const Profile = lazy( () => import( "@globals/Profile" ) )
const Icon = lazy( () => import( "@globals/Icon" ) )
const CommunitiesNavbar = lazy( () => import( "./ShowCommunitiesNavbar" ) )

const TopNavbar: FC = () => {

    const location = useLocation();
    const loc_arr = location.pathname.split( "/" )

    return (
        <nav className={ styles.navbar_top_wrap }>
            <Suspense fallback={ <Loading width={ "1rem" } height={ "1rem" }/> }>
                <div className={ styles.display_communities_wrap } tabIndex={ 0 }>
                    <Icon>
                        <svg id="lines" width="18" height="7" viewBox="0 0 18 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="Group 36">
                                <g id="line">
                                    <line id="Line-top" y1="0.5" x2="18" y2="0.5" stroke="white"/>
                                    <line id="Line-bottom" y1="6.5" x2="18" y2="6.5" stroke="white"/>
                                </g>
                            </g>
                        </svg>
                    </Icon>
                    <Suspense fallback={ 
                        <Loading 
                            width={ "10vw" } 
                            height={ "calc(100vh - 2 * 1.3 * var(--icon-size) - 2rem - 4px - var(--nav-height) - 1px)" }
                        /> 
                    }>
                        <CommunitiesNavbar/>
                    </Suspense>
                </div>
            </Suspense>

            <NavRoute mainpage={ loc_arr[1] } section={ loc_arr[2] } element={ loc_arr[3] }/>
            <Suspense fallback={ <Loading width={ "1rem" } height={ "1rem" }/> }>
                <Profile/>
            </Suspense>
        </nav>
    )
}

export default TopNavbar