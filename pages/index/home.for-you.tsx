import { FC, useEffect } from "react";
import { useHelloQueryQuery } from "../../graphql/codegen/gql/gql";
import { client } from "../../router/graphqlClient";
import { useNavigate } from "react-router-dom";
import { ForYou } from "../../components/for-you";

const Home: FC  = () => {

    // const { data, isError, isLoading } = useHelloQueryQuery( client )
    // const navigate = useNavigate();

    // useEffect( () => {
    //     if( isError ) navigate( "/user/signin" )
    // }, [ isError ] )

    return <ForYou/>
}

export default Home