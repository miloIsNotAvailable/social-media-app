import { FC } from "react";
import { styles } from "../styles";
import { Link } from "react-router-dom";

const Redirect: FC = () => {

    return (
        <div className={ styles.redirect }>
            Don't have an account? <Link to={ "/user/signup" }>Sign up</Link>
        </div>
    )
}

export default Redirect