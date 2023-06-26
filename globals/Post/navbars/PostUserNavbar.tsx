import { Loading } from "@globals/Fallback";
import { FC, Suspense, lazy } from "react";
import { styles } from "../styles";
import { CommunityDetails, useQueryCommunityQuery } from "../../../graphql/codegen/gql/gql";
import { client } from "../../../router/graphqlClient";

const Profile = lazy( () => import( "@globals/Profile" ) )
const NavRoute = lazy( () => import( "@globals/NavRoute" ) )

interface PostUserNavbarProps {
    communityId?: string | null
}

const PostUserNavbar: FC<PostUserNavbarProps> = ( { communityId } ) => {

    const { data, isLoading } = useQueryCommunityQuery( client, {
        communityId: (communityId as string)!,
        includePosts: false
    } )

    if( isLoading ) return (
        <nav className={ styles.top_navbar_wrap }>
            <Loading width={ "1rem" } height={ "1rem" }/> 
            <Loading width={ "5rem" } height={ "1rem" }/> 
        </nav>
    )

    return (
        <nav className={ styles.top_navbar_wrap }>
            <Suspense fallback={ 
                <Loading width={ "1rem" } height={ "1rem" }/> 
            }>
                <Profile/>
            </Suspense>
            <Suspense fallback={ 
                <Loading width={ "5rem" } height={ "1rem" }/> 
            }>
                <NavRoute 
                    link={ "/communities/" + (data!.queryCommunity as CommunityDetails).title }    
                />
            </Suspense>
        </nav>
    )
}

export default PostUserNavbar