import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { Loose } from "../../../interfaces/custom";
import { styles } from "../styles";

type MainpageRoutes = "home" | "user" | "communities"
type SectionRoutes = "communities"

interface NavRouteProps {
    mainpage?: Loose<MainpageRoutes, string>
    section?: Loose<SectionRoutes, string>
    element?: string
    link?: string
    to?: string
}

const NavRoute: FC<NavRouteProps> = ( { 
    element, 
    mainpage, 
    section, 
    link,
    to
} ) => {

    const { pathname } = useLocation()

    const [ l, ...links ] = (link || pathname)
    .replace( /\/$/, "" )
    .replace( /\/(?<!$)/g, "./" )
    .split( "/" )

    return (
        <a href={ "/" + to } className={ styles.wrap_routes }>
            <span>{":// "}</span>
            { links.map( ( val, ind ) => (
                <span className={ styles[("span-" + ind)] }>
                    { val }
                </span>   
            ) ) }
            {/* <a 
                className={ styles.main } 
                href={ "/" + (mainpage || m) as string }
            >
                { (mainpage || m) + "." }
            </a>
            <a 
                className={ styles.sec } 
                href={ "/" + (m + "/" + s) as string }
            >
                { (section || s) + (!!(element || e) ? "." : "") }
            </a>
            <a 
                className={ styles.el } 
                href={ "/" + section + "/" + element as string }
            >
                { (element || e) }
            </a> */}
        </a>
    )
}

export default NavRoute 