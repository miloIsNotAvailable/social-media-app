import { FC } from "react";
import { Link } from "react-router-dom";
import { Loose } from "../../../interfaces/custom";
import { styles } from "../styles";

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
            <a 
                className={ styles.main } 
                href={ mainpage as string }
            >
                { mainpage + "." }
            </a>
            <a 
                className={ styles.sec } 
                href={ section as string }
            >
                { section + (!!element ? "." : "") }
            </a>
            <a 
                className={ styles.el } 
                href={ element as string }
            >
                { element }
            </a>
        </div>
    )
}

export default NavRoute 