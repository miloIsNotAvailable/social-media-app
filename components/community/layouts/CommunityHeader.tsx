import { FC } from "react";
import Profile from "@globals/Profile";
import NavRoute from "@globals/NavRoute";
import { styles } from '../styles'
import { CommunityDetails, useQueryCommunityQuery } from "../../../graphql/codegen/gql/gql";
import { client } from "../../../router/graphqlClient";
import { useLocation, useParams } from "react-router-dom";

const CommunityHeader: FC = () => {

    const { id } = useParams() as { id: string }

    const { data, isLoading } = useQueryCommunityQuery( client, { 
        communityId: id,
        includePosts: false 
    } )

    const { pathname } =  useLocation()

    return (
        <div className={ styles.community_header }>
            <div className={ styles.community_name }>
                <Profile/>
                <NavRoute 
                    // mainpage={ "home" } 
                    // section={ "communities" }
                    // element={ "lorem-ipsum" }
                    link={ isLoading ? "hey" : ("/communities/" + (data?.queryCommunity as CommunityDetails).title) }
                    to={ pathname }
                />
            </div>
            <div className={ styles.community_desc }>
                { isLoading ? "loading..." : (data?.queryCommunity as CommunityDetails).description } 
            </div>
        </div>
    )
}

export default CommunityHeader