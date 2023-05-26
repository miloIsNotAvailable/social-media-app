import { FC, useEffect } from "react";
import { useHelloQueryQuery } from "../../graphql/codegen/gql/gql";
import { client } from "../../router/graphqlClient";
import { useNavigate } from "react-router-dom";

const Home: FC  = () => {

    const { data, isError, isLoading } = useHelloQueryQuery( client )
    const navigate = useNavigate();

    useEffect( () => {
        if( isError ) navigate( "/user/signin" )
    }, [ isError ] )

    return (
        <div>{ isLoading ? "loading..." : "hey" }</div>
    )
}

export default Home