import { FC, lazy, Suspense } from "react";
import Fallback from "../../custom/Fallback";
import { styles } from "./NavbarStyles";

const MenuIcon = lazy( () => import( "../menu" ) )
const NavRoutes = lazy( () => import( "../../custom/NavRoute" ) )
const ProfileMenu = lazy( () => import( "../Profile" ) )

const Navbar: FC = () => {

    return (
      <nav className={ styles.navbar_wrap }>
        <Suspense fallback={ 
            <Fallback
                width={ "var(--icon-size)" }               
                height={ "var(--icon-size)" }               
            /> 
        }>
            <MenuIcon/>
        </Suspense>
        <Suspense fallback={ 
            <Fallback
                width={ "calc( 12ch )" }
                height={ "var(--title-size)" }
            /> 
        }>
            <NavRoutes 
                mainpage={ "home" }
                section={ "for-you" }
                element={ "" }
            />
        </Suspense>
        <Suspense fallback={ 
            <Fallback 
                width={ "var(--icon-size)" }
                height={ "var(--icon-size)" }
                borderRadius={ "50%" }
            /> 
        }>
            <ProfileMenu/>
        </Suspense>
      </nav>
    );
}

export default Navbar