import NavRoute from "@globals/NavRoute";
import Profile from "@globals/Profile";
import { FC } from "react";
import Flair from "./Flair";
import { styles } from "../styles";
import { Loading } from "@globals/Fallback";
import { Communities, CommunityDetails, useQueryCommunityQuery } from "../../../graphql/codegen/gql/gql";
import { client } from "../../../router/graphqlClient";

interface PostHeaderProps {
    flairs: string[]
    communityId: string
    community: string
}

const PostHeader: FC<Communities & { flairs: string[] }> = ( { community_name: community, community_id, flairs } ) => {

    // const { data, isLoading } = useQueryCommunityQuery( client, {
    //     communityId: (communityId as string)!,
    //     includePosts: false
    // } )

    // if( isLoading ) return (
    //     <nav className={ styles.top_navbar_wrap }>
    //         <Loading width={ "1rem" } height={ "1rem" }/> 
    //         <Loading width={ "5rem" } height={ "1rem" }/> 
    //     </nav>
    // )

    return (
        <div className={ styles.post_header_wrap }>
            <Profile/>
            <div className={ styles.post_community_and_flairs }>
                <NavRoute 
                    link={ "communities/" + community }
                    to={ "communities/" + community_id }
                />
                <div className={ styles.flairs_wrap }>
                    { flairs.map( flair => (
                        <Flair content={ flair }/>
                    ) ) }
                </div>
            </div>
        </div>
    )
}

export default PostHeader