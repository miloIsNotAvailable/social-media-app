import { Default } from "@globals/Input";
import { FC } from "react";
import { styles } from "../build/LoginStyles";
import Divide from "../scenes/Divide";
import { Color as Submit } from "@globals/Button";
import NavRoute from "@globals/NavRoute";
import Header from "../scenes/Header";
import { Form } from "react-router-dom";

const FillOutForm: FC = () => {

    return (
        <Form method="post" className={ styles.form_wrap }>
            <NavRoute 
                mainpage={ "user" } 
                section={ "login" }
            />
            <Header/>
            <Divide/>
            <Default placeholder="email" required/>
            <Default placeholder="password" required/>
            <Submit>Login</Submit>
        </Form>
    )
}

export default FillOutForm