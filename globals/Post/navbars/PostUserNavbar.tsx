import { Loading } from "@globals/Fallback";
import { FC, Suspense, lazy } from "react";
import { styles } from "../styles";

const Profile = lazy( () => import( "@globals/Profile" ) )
const NavRoute = lazy( () => import( "@globals/NavRoute" ) )

const PostUserNavbar: FC = () => {

    return (
        <nav className={ styles.top_navbar_wrap }>
            <Suspense fallback={ 
                <Loading width={ "1rem" } height={ "1rem" }/> 
            }>
                <Profile/>
            </Suspense>
            <Suspense fallback={ 
                <Loading width={ "5rem" } height={ "1rem" }/> 
            }>
                <NavRoute mainpage={ "community" } section={ "lorem_ipsum" }/>
            </Suspense>
        </nav>
    )
}

export default PostUserNavbar