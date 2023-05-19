import { Default } from "@globals/Input";
import { FC } from "react";
import Divide from "../scenes/Divide";
import { Color as Submit, Outline as OAuth } from "@globals/Button";
import NavRoute from "@globals/NavRoute";
import Header from "../scenes/Header";
import { Form, Outlet, useActionData } from "react-router-dom";
import Section from "./Section";
import Redirect from "../redirects/RedirectToSignUp";
import { styles } from "../styles";
import { useQuery } from "react-query";
import { Auth, AuthResolvers, useUserAuthMutation } from "../../../graphql/codegen/gql/gql";
import { client, fetcher } from "../../../router/graphqlClient";
import { gql } from "graphql-request";

const FillOutForm: FC = () => {

    // const { data } = useQuery( {
    //     queryKey: ['films'], 
    //     queryFn: fetcher<AuthResolvers, Auth>( 
    //         client, 
    //         SIGNIN_QUERY,
    //         { email: "hey", password: "ji" } 
    //     )
    // } )

    // const { data } = useSignInQuery( client, { email: "", password: "hey" } )
    // console.log( data )

    return (
        <Form 
            method="post" 
            action="signin" 
            className={ styles.form_wrap }
        >
            <Section>
                <NavRoute 
                    mainpage={ "user" } 
                    section={ "login" }
                />
                <Header/>
                <OAuth style={ { outlineColor: "var(--light-grey)" } }>
                    Login with Google
                </OAuth>
            </Section>
            <Divide/>
            <Section>
                <Default autoFocus placeholder="email" name="email" required/>
                <Default placeholder="password" name="password" required/>
                <Outlet/>
            </Section>
            <Section>
                <Submit type="submit">Login</Submit>
                <Redirect/>
            </Section>
        </Form>
    )
}

export default FillOutForm