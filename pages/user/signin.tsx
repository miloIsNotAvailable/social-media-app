import { FC } from "react";
import { RouteObject } from "react-router-dom";

export const action: RouteObject["action"] = async( { params, request } ) => {
    
    const data = await request.formData()

    fetch( "/api/graphiql", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( {
            query: `query Signin($email: String, $password: String) {
                signin(email: $email, password: $password) {
                  email
                  password
                }
              }`,
              variables: {
                email: data.get( "email" ),
                password: data.get( "password" )
              }
        } )
    } ).then( res => res.json() ).then( console.log )

    return null
}

const SignIn: FC = () => <></>

export default SignIn