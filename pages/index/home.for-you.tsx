import { FC } from "react";
import { ForYou } from "../../components/for-you";
import { loader } from "../../components/for-you/loaders/loadPosts";

export { loader }

const Home: FC  = () => {

    // const { data, isError, isLoading } = useHelloQueryQuery( client )
    // const navigate = useNavigate();

    // useEffect( () => {
    //     if( isError ) navigate( "/user/signin" )
    // }, [ isError ] )

    return <ForYou/>
}

export default Home