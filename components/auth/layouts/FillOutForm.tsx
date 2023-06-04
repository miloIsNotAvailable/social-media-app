import { Default } from "@globals/Input";
import { FC, useEffect } from "react";
import Divide from "../scenes/Divide";
import { Color as Submit, Outline as OAuth } from "@globals/Button";
import NavRoute from "@globals/NavRoute";
import Header from "../scenes/Header";
import { Form, Outlet, redirect, useActionData, useNavigate } from "react-router-dom";
import Section from "./Section";
import Redirect from "../redirects/RedirectToSignUp";
import { styles } from "../styles";
import { UserAuthMutationVariables, useUserAuthMutation } from "../../../graphql/codegen/gql/gql";
import { client } from "../../../router/graphqlClient";
import { useAuth } from "../../../contexts/AuthContext";

const FillOutForm: FC = () => {

    const action = useActionData() as UserAuthMutationVariables

    const navigate = useNavigate()
    const token = useAuth()

    const { isLoading, mutate } = useUserAuthMutation( client, {
        onSuccess: () => navigate( "/home/for-you" )
    } )

    useEffect( () => {
        if( !!token ) navigate( "/home/for-you" )
    }, [] )

    useEffect( () => {
        if( !!action ) mutate( action )
    }, [ action ] )

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
                <Submit type="submit">{ isLoading ? "loading..." : "Login" }</Submit>
                <Redirect/>
            </Section>
        </Form>
    )
}

export default FillOutForm