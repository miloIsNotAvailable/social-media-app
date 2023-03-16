import { FC } from "react";
import { Link } from "react-router-dom";
import { Loose } from "../../../interfaces/custom";
import { styles } from "./NavRuteStyles";

type MainpageRoutes = "home" | "user" | "communities"
type SectionRoutes = "communities"

interface NavRouteProps {
    mainpage: Loose<MainpageRoutes, string>
    section: Loose<SectionRoutes, string>
    element?: string
}

const NavRoute: FC<NavRouteProps> = ( { 
    element, 
    mainpage, 
    section, 
} ) => {

    return (
        <div className={ styles.wrap_routes }>
            <span>{":// "}</span>
            <Link 
                className={ styles.main } 
                to={ mainpage as string }
            >
                { mainpage + "." }
            </Link>
            <Link 
                className={ styles.sec } 
                to={ section as string }
            >
                { section + (!!element ? "." : "") }
            </Link>
            <Link 
                className={ styles.el } 
                to={ element as string }
            >
                { element }
            </Link>
        </div>
    )
}

export default NavRoute 