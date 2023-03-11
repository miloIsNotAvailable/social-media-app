import { FC } from "react";
import { styles } from "./LayoutStyles";

interface LayoutProps {
    children: JSX.Element | JSX.Element[] | string
}

const Layout: FC<LayoutProps> = ( { children } ) => {

    return (
        <div className={ styles.page_wrap }>
            { children }
        </div>
    )
}

export default Layout