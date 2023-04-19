import { FC } from "react";
import { styles } from "../styles";
import FillOutForm from "../layouts/FillOutForm";
import { Outlet } from "react-router-dom";

const LoginPage: FC = () => {

    return (
        <div className={ styles.login_page }>
            <FillOutForm/>
        </div>
    )
}

export default LoginPage