import { FC, lazy, Suspense } from "react";
import Fallback from "../../custom/Fallback";
import NavRoute from "../../custom/NavRoute";
const OAuth =  lazy( () => import("../buttons/OAuth") );
const Submit =  lazy( () => import("../buttons/Submit") );
import Email from "../forms/Email";
import Password from "../forms/Password";
import { styles } from "./LoginStyles";

const Login: FC = () => {

    return (
        <form className={ styles.form_wrap }>
            <div className={ styles.section }>
                <NavRoute 
                    mainpage={ "user" }
                    section={ "login" }
                />
                <Suspense fallback={
                    <Fallback
                        width={ "100%" }
                        height={ "calc( var(--font-size) + 2rem )" }
                    />     
                }>
                    <OAuth/>
                </Suspense>
            </div>
                <div className={ styles.divide }>or</div>
            <div className={ styles.section }>
                <Email/>
                <Password/>
            </div>
            <Suspense fallback={
                    <Fallback
                        width={ "100%" }
                        height={ "calc( var(--font-size) + 2rem )" }
                    />     
                }>
                    <Submit/>
            </Suspense>
        </form>
    )
}

export default Login