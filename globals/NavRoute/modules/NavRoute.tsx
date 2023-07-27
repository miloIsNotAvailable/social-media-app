import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { Loose } from "../../../interfaces/custom";
import { styles } from "../styles";
import Header from "@globals/Header";

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

    const [ ...links ] = (link || pathname)
    // remove the last /
    .replace( /\/$/, "" )
    // replace / with ./
    .replace( /\/(?<!$)/g, "./" )
    // split./ on / so we get hello./hey./ -> [hello., hey.]
    .split( "/" )

    return (
        <a 
            href={ "/" + (to || link) } 
            className={ styles.wrap_routes }
        >
            <Header 
                whiteSpace="pre-wrap"
                fontWeight={ 500 }
                fontSize={ "var(--title-size)" }
                color={ "var(--dark-grey)" }
            >
                {":// "}
            </Header>
            <Header 
                fontSize={ "var(--title-size)" }
            >
                { links.map( ( val, ind ) => (
                    <span>
                        { val }
                    </span>   
                ) ) }
            </Header>
        </a>
    )
}

export default NavRoute 