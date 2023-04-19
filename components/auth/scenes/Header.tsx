import { FC } from "react";
import { styles } from "../styles";

const Header: FC = () => {

    return (
        <span className={ styles.header }>
            Welcome back! Sign in to your account.
        </span>
    )
}

export default Header